import { Figures } from "./Figures"
import { Game } from "./Game"

export type figure = ReturnType<typeof Figures.random>
export type spawnedFigure = figure & { x: number, y: number }


export class GameFigures {
    #game: Game
    declare atualFigure: spawnedFigure
    declare nextFigure: figure

    constructor(game: Game) {
        this.#game = game
    }

    moveRight() {
        this.atualFigure.x++
    }

    moveLeft() {
        this.atualFigure.x--
    }

    down() {
        this.atualFigure.y++
    }

    addFigurePoints() {
        const { blocks } = this.atualFigure

        const figureBlocks = blocks.flat().filter(block => block.type === 'block').length

        this.#game.addPoints(figureBlocks * this.#game.pointsPerBlock)
    }

    spawnFigure() {
        this.#game.controller.preventMove(new Promise(res => {
            this.atualFigure = {
                y: 0,
                x: 0,
                ...(this.nextFigure ? this.nextFigure : Figures.random())
            }

            this.atualFigure.y = -this.atualFigure.blocks.length + 1
            this.centerFigure()
            this.spawnNextFigure()

            res(true)
        }))
    }

    private centerFigure() {
        this.atualFigure.x = Math.trunc(this.#game.width / 2 - this.atualFigure.blocks[0].length / 2)
    }

    private spawnNextFigure() {
        this.nextFigure = {
            ...Figures.random()
        }
    }
}