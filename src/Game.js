import { range } from "./Util.js"

const canvas = document.getElementById('game')

const game = {
    height: 30,
    width: 15,
    squareWidth: 16,
    state: [],
    atualFigure: {
        figure: [[]],
        x: 0,
        y: 0,
        color: '#fff'
    },
    moveLock: false,
    move(direction) {
        if (this.moveLock) return

        if (direction === "right") {
            if (this.atualFigure.x + this.atualFigure.figure[0].length <= 14)
                this.atualFigure.x++
        }

        if (direction === "left") {
            if (this.atualFigure.x > 0)
                this.atualFigure.x--
        }

        this.moveLock = true

        setTimeout(() => this.moveLock = false, 100);
    }

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


const keyFunctions = {
    "ArrowLeft": () => game.move("left"),
    "ArrowDown": () => game.move("down"),
    "ArrowRight": () => game.move("right"),

    "a": () => game.move("left"),
    "s": () => game.move("down"),
    "d": () => game.move("right")
}

window.onkeydown = event => {
    keyFunctions[event.key]?.()
}

export { game }