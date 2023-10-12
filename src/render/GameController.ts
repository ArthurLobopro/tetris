import { Game } from "./Game"

export class GameController {
    #game: Game
    declare moveLock: boolean

    constructor(game: Game) {
        this.#game = game
    }

    get haveBlocksOnRight() {
        const { y, x, blocks } = this.#game.figures.atualFigure

        if (x + this.#game.figures.atualFigure.blocks[0].length >= this.#game.width) {
            return true
        }

        return blocks.some((line, indexY) => {
            if (line[line.length - 1].type === "null") {
                return false
            }

            return this.#game.state.isBlock({
                x: x + line.length,
                y: y + indexY
            })
        })
    }

    get haveBlocksOnLeft() {
        const { y, x, blocks } = this.#game.figures.atualFigure

        return blocks.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            return this.#game.state.isBlock({
                x: x - 1,
                y: y + indexY
            })
        })
    }

    reset() {
        this.moveLock = false
    }

    move(direction: "right" | "left") {
        if (this.moveLock) return

        const { x } = this.#game.figures.atualFigure

        if (
            direction === "right" && !this.haveBlocksOnRight
        ) {
            this.#game.figures.moveRight()
        }

        if (direction === "left" && !this.haveBlocksOnLeft && x > 0) {
            this.#game.figures.moveLeft()
        }

        this.moveLock = true

        setTimeout(() => this.moveLock = false, 100)
    }

    accelerate() {
        if (
            !this.moveLock && !this.collision()
            && this.#game.status === "active"
        ) {
            this.#game.tick()
            this.moveLock = true
            setTimeout(() => this.moveLock = false, 1000 / this.#game.velocities[this.#game.velocity])
        }
    }

    dropFigure() {
        while (!this.collision()) {
            this.#game.tick()
        }
    }

    collision() {
        const { x, y, blocks } = this.#game.figures.atualFigure

        const bottomY = y + blocks.length

        if (bottomY === this.#game.height) {
            return true
        }

        const colidBlock = blocks.some((line, indexY) => {
            return line.some((block, indexX) => {
                if (block.type === "null") {
                    return false
                }

                return this.#game.state.isBlock({
                    y: y + indexY + 1,
                    x: x + indexX
                })
            })
        })

        return colidBlock
    }
}