import { range } from "./Util.js"
import { figures } from "./Figures.js"
import "./Controllers.js"

const gameCanvas = document.getElementById('game')
const nextCanvas = document.getElementById('next')
const pontosSpan = document.getElementById('pontos')

const game = {
    height: 30,
    width: 15,
    squareWidth: 16,
    state: [],
    interval: null,
    pontos: 0,
    nextFigure: {
        figure: figures.random(),
        color: '#ddd'
    },
    nextCanvasSize: {
        height: 6,
        width: 6
    },
    atualFigure: {
        figure: [[]],
        x: 0,
        y: 0,
        color: '#ddd'
    },
    moveLock: false,
    move(direction) {
        if (this.moveLock) return

        const { y, x } = this.atualFigure

        const haveBlocksOnLeft = this.atualFigure.figure.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            if (this.state[y + indexY]?.[x - 1]?.type === "block") {
                return true
            }

            return false
        })


        const haveBlocksOnRight = this.atualFigure.figure.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            if (this.state[y + indexY]?.[x + line.length]?.type === "block") {
                return true
            }

            return false
        })


        if (direction === "right" && !haveBlocksOnRight) {
            if (this.atualFigure.x + this.atualFigure.figure[0].length <= 14)
                this.atualFigure.x++
        }

        if (direction === "left" && !haveBlocksOnLeft) {
            if (this.atualFigure.x > 0)
                this.atualFigure.x--
        }

        this.moveLock = true

        setTimeout(() => this.moveLock = false, 100);
    }

}

const getNewGameState = () => {
    const nullBlock = { type: "null" }

    const line = []

    for (let i in range(0, game.width)) {
        line.push(nullBlock)
    }

    const table = []

    for (let i in range(0, game.height)) {
        table.push(line)
    }

    return table
}

const spawnNewFigure = () => {
    game.atualFigure.y = 0
    game.atualFigure.figure = game.nextFigure.figure
    game.nextFigure.figure = figures.random()
    game.atualFigure.x = Math.trunc(game.width / 2 - game.atualFigure.figure[0].length / 2)
}

const removeCompleteLines = () => {
    const nullBlock = { type: "null" }

    const voidLine = []

    for (let i in range(0, game.width)) {
        voidLine.push(nullBlock)
    }

    game.state = game.state.filter(line => {

        return line.some(block => {
            return block.type === 'null'
        })

    })

    while (game.state.length < game.height) {
        game.state.unshift(voidLine)
    }
}

const addToState = () => {
    const { x, y, figure, color } = game.atualFigure

    console.table({ x, y });

    figure.forEach((line, indexY) => {

        line.forEach((block, indexX) => {

            game.state[y + indexY] = game.state[y + indexY].map((stateBlock, stateX) => {
                if ([x + indexX] == stateX) {
                    if (block.type === 'block') {
                        return { ...block, color }
                    }
                    return stateBlock
                }

                return stateBlock
            })
        })
    })

    removeCompleteLines()
}

const collision = () => {
    const { x, y, figure } = game.atualFigure

    const bottomY = y + figure.length

    if (bottomY === game.height) {
        return true
    }

    const colidBlock = figure.some((line, indexY) => {
        return line.some((block, indexX) => {
            if (block.type === "null") {
                return false
            }

            if (game.state[y + indexY + 1][x + indexX].type === 'block') {
                return true
            }

            return false
        })
    })

    return colidBlock
}

const playGame = () => {
    if (!collision()) {
        game.atualFigure.y++
        return
    }

    addToState()
    spawnNewFigure()
}

game.state = getNewGameState()
spawnNewFigure()

gameCanvas.width = (game.width * game.squareWidth) + game.width - 1
gameCanvas.height = (game.height * game.squareWidth) + game.height - 1

nextCanvas.width = (game.squareWidth * game.nextCanvasSize.width) + game.nextCanvasSize.width - 1
nextCanvas.height = (game.squareWidth * game.nextCanvasSize.height) + game.nextCanvasSize.height - 1

game.interval = setInterval(playGame, 500);

export { game, playGame, collision, addToState, spawnNewFigure }