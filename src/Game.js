import { range } from "./Util.js"

const canvas = document.getElementById('game')

const game = {
    height: 30,
    width: 15,
    squareWidth: 16,
    state: []
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

game.state = getNewGameState()

canvas.width = (game.width * game.squareWidth) + game.width - 1
canvas.height = (game.height * game.squareWidth) + game.height - 1

export { game }