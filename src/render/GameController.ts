import { Game } from "./Game"
import { figure } from "./GameFigures"
import { delay } from "./Util"

type blocksWithCoords = {
    blocks: figure["blocks"]
    x: number
    y: number
}

export class GameController {
    #game: Game
    declare private moveLock: boolean

    constructor(game: Game) {
        this.#game = game
    }

    reset() {
        this.moveLock = false
    }

    async preventMove(time: Promise<any>) {
        this.moveLock = true
        await time
        this.moveLock = false
    }

    move(direction: "right" | "left") {
        if (this.moveLock) return

        const { atualFigure } = this.#game.figures

        if (direction === "right" && !this.haveBlocksOnRight) {
            this.#game.figures.moveRight()
            this.preventMove(delay(100))
        }

        if (
            direction === "left"
            && !this.simulateHaveBlocksOnLeft(atualFigure)
        ) {
            this.#game.figures.moveLeft()
            this.preventMove(delay(100))
        }
    }

    accelerate() {
        if (
            !this.moveLock && !this.collision()
            && this.#game.status === "active"
        ) {
            this.#game.tick()
            this.preventMove(delay(1000 / this.#game.velocities[this.#game.velocity]))
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

    private get haveBlocksOnRight() {
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

    private simulateHaveBlocksOnLeft({ x, y, blocks }: blocksWithCoords) {
        return x === 0 || blocks.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            // return this.#game.state.isBlock({
            //     x: x - 1,
            //     y: y + indexY
            // })

            return line.some((block, indexX) => {
                const coords = {
                    x: x - 1 + indexX,
                    y: y + indexY
                }

                const is = this.#game.state.isBlock(coords)
                console.log({ ...coords, is })

                return is
            })
        })
    }
}