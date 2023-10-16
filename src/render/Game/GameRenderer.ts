import { colors } from "../Colors"
import { figureName } from "../Figures"
import { range } from "../Util"
import { Game } from "./Game"

export class GameRenderer {
    private nextFigure: NextFigureDrawner
    private mainFigure: MainDrawner

    constructor(game: Game) {
        this.nextFigure = new NextFigureDrawner(game)
        this.mainFigure = new MainDrawner(game)
    }

    render() {
        this.nextFigure.renderNextFigure()
        this.mainFigure.renderMainFigure()
    }
}

class MainDrawner {
    #game: Game

    constructor(game: Game) {
        this.#game = game
    }

    renderMainFigure() {
        this.drawBackground()
        this.drawLines()
        this.drawSquares()
        this.drawAtualFigure()
    }

    private drawBackground() {
        const { gameCanvas: { width, height }, gameCtx } = this.#game.screen
        gameCtx.fillStyle = colors.background
        gameCtx.fillRect(0, 0, width, height)
    }

    private drawLines() {
        const {
            width, height, squareWidth,
            screen: { gameCanvas, gameCtx }
        } = this.#game

        gameCtx.fillStyle = colors.lines

        for (let i of range(1, width)) {
            gameCtx.fillRect(i * squareWidth + (i - 1), 0, 1, gameCanvas.height)
        }

        for (let i of range(1, height)) {
            gameCtx.fillRect(0, i * squareWidth + (i - 1), gameCanvas.width, 1)
        }
    }

    private drawSquares() {
        const {
            squareWidth,
            state: { state },
            screen: { gameCtx }
        } = this.#game

        state.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                const color = block.type === "null" ? colors.background : colors.figures[block.figureType as figureName]

                gameCtx.fillStyle = color
                gameCtx.fillRect(indexX * squareWidth + (1 * indexX), indexY * squareWidth + (1 * indexY), squareWidth, squareWidth)

            })

        })
    }

    private drawAtualFigure() {
        const {
            squareWidth,
            figures: {
                atualFigure: {
                    x, y,
                    figure: { blocks, figureType }
                }
            },
            screen: { gameCtx }
        } = this.#game

        blocks.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                if (block.type === 'block') {
                    gameCtx.fillStyle = colors.figures[figureType]
                    gameCtx.fillRect(
                        (x + indexX) * squareWidth + (1 * x + indexX),
                        (y + indexY) * squareWidth + (1 * y + indexY),
                        squareWidth, squareWidth
                    )
                }
            })
        })
    }
}

class NextFigureDrawner {
    #game: Game

    constructor(game: Game) {
        this.#game = game
    }

    renderNextFigure() {
        this.drawNextBackground()
        this.drawNextLines()
        this.drawNextFigure()
    }

    private drawNextBackground() {
        const { nextCanvas: { width, height }, nextCtx } = this.#game.screen
        nextCtx.fillStyle = colors.background
        nextCtx.fillRect(0, 0, width, height)
    }

    private drawNextLines() {
        const {
            squareWidth,
            screen: { nextCtx, nextCanvas },
            nextCanvasSize: { width, height }
        } = this.#game

        nextCtx.fillStyle = colors.lines

        for (let i of range(1, width)) {
            nextCtx.fillRect(i * squareWidth + (i - 1), 0, 1, nextCanvas.height)
        }

        for (let i of range(1, height)) {
            nextCtx.fillRect(0, i * squareWidth + (i - 1), nextCanvas.width, 1)
        }
    }

    private drawNextFigure() {
        const {
            squareWidth,
            screen: { nextCtx },
            figures: { nextFigure: { figure: { blocks, figureType } } },
            nextCanvasSize: { width, height }
        } = this.#game

        const x = Math.trunc(width / 2 - blocks[0].length / 2)
        const y = Math.trunc(height / 2 - blocks.length / 2)

        blocks.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                if (block.type === 'block') {
                    nextCtx.fillStyle = colors.figures[figureType]
                    nextCtx.fillRect(
                        (x + indexX) * squareWidth + (1 * x + indexX),
                        (y + indexY) * squareWidth + (1 * y + indexY),
                        squareWidth, squareWidth
                    )
                }
            })
        })
    }
}