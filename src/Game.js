import { range } from "./Util.js"

const canvas = document.getElementById('game')

const game = {
    height: 30,
    width: 15,
    squareWidth: 16,
    state: []
    atualFigure: {
        figure: [[]],
        x: 0,
        y: 0,
        color: '#fff'
    },
}

const getNewGameState = () => {
    const nullBlock = { type: "null"}
    
    const line = []

    for(let i in range(0,game.width)){
        line.push(nullBlock)
    }

    const table = []

    for(let i in range(0,game.height)){
        table.push(line)
    }

    return table
}

const spawnNewFigure = () => {
    game.atualFigure.y = 0
    game.atualFigure.figure = figures.random()
    game.atualFigure.x = Math.trunc(game.width / 2 - game.atualFigure.figure[0].length / 2)
}
game.state = getNewGameState()
spawnNewFigure()

canvas.width = (game.width * game.squareWidth) + game.width - 1
canvas.height = (game.height * game.squareWidth) + game.height - 1

export { game }