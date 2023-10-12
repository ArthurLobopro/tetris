import { Figures } from "./Figures"
import { Game } from "./Game"

type figure = ReturnType<typeof Figures.random>
type spawnedFigure = figure & { x: number, y: number }


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

        let figureBlocks = 0

        blocks.forEach(line => {
            line.forEach(block => {
                if (block.type === 'block') {
                    figureBlocks++
                }
            })
        })

        this.#game.addPoints(figureBlocks * this.#game.pointsPerBlock)
    }

    spawnFigure() {
        this.atualFigure = {
            y: 0,
            x: 0,
            ...(this.nextFigure ? this.nextFigure : Figures.random())
        }
        this.atualFigure.y = -this.atualFigure.blocks.length + 1
        this.centerFigure()
        this.spawnNextFigure()
    }

    centerFigure() {
        this.atualFigure.x = Math.trunc(this.#game.width / 2 - this.atualFigure.blocks[0].length / 2)
    }

    spawnNextFigure() {
        this.nextFigure = {
            ...Figures.random()
        }
    }
}