import { Figure, Figures } from "../Figures"
import { Game } from "./Game"

export type figure = ReturnType<typeof Figures.random>

export class GameFigures {
    #game: Game
    declare atualFigure: Figure
    declare nextFigure: Figure

    constructor(game: Game) {
        this.#game = game
        this.nextFigure = new Figure()
        this.atualFigure = new Figure()
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
        const { blocks } = this.atualFigure.figure

        const figureBlocks = blocks.flat().filter(block => block.type === 'block').length

        this.#game.addPoints(figureBlocks * this.#game.pointsPerBlock)
    }

    spawnFigure() {
        this.#game.controller.preventMove(new Promise(res => {
            this.atualFigure
                .turnInto(this.nextFigure.figure)
                .setCoords({
                    x: Math.trunc(this.#game.width / 2 - this.atualFigure.width / 2),
                    y: -this.atualFigure.height + 1
                })

            this.spawnNextFigure()

            res(true)
        }))
    }

    private spawnNextFigure() {
        this.nextFigure.turnIntoRandom()
    }
}