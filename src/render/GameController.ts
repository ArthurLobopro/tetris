import { Figures } from "./Figures"
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

        if (direction === "right" && !this.simulateHasBlocksOnRight(atualFigure)) {
            this.#game.figures.moveRight()
            this.preventMove(delay(100))
        }

        if (direction === "left" && !this.simulateHasBlocksOnLeft(atualFigure)) {
            this.#game.figures.moveLeft()
            this.preventMove(delay(100))
        }
    }

    rotate() {
        const { blocks, x, y } = this.#game.figures.atualFigure

        const rotatedFigure = Figures.getRotated(blocks)
        const widthDifference = blocks.length - rotatedFigure.length

        const hasCollision = (
            x + rotatedFigure[0].length >= this.#game.width
            || this.simulateAnyCollision({
                x,
                y,
                blocks: rotatedFigure
            })
        )

        const newX = hasCollision ? x - widthDifference : x

        const stillHasCollision = this.simulateAnyCollision({
            x: newX,
            y,
            blocks: rotatedFigure
        })

        if (!stillHasCollision) {
            this.#game.figures.atualFigure.x = newX
            this.#game.figures.atualFigure.blocks = rotatedFigure
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
        this.preventMove(new Promise(res => {
            while (!this.collision()) {
                this.#game.tick()
            }

            res(true)
        }))
    }

    collision() {
        const { x, y, blocks } = this.#game.figures.atualFigure

        const bottomY = y + blocks.length

        if (bottomY === this.#game.height) {
            return true
        }

        return this.simulateHasBlocksOnBottom({ x, y, blocks })
    }

    private simulateHasBlocksOnRight({ x, y, blocks }: blocksWithCoords) {
        if (x + this.#game.figures.atualFigure.blocks[0].length >= this.#game.width) {
            return true
        }

        return this.simulateAnyCollision({
            x: x + 1,
            y,
            blocks
        })
    }

    private simulateHasBlocksOnLeft({ x, y, blocks }: blocksWithCoords) {
        return x === 0 || this.simulateAnyCollision({
            x: x - 1,
            y,
            blocks
        })
    }

    private simulateHasBlocksOnBottom({ x, y, blocks }: blocksWithCoords) {
        return this.simulateAnyCollision({
            blocks,
            x,
            y: y + 1
        })
    }

    private simulateAnyCollision({ x, y, blocks }: blocksWithCoords) {
        return blocks.some((line, indexY) => {
            return line.some((block, indexX) => {
                return block.type === "block" && this.#game.state.isBlock({
                    x: x + indexX,
                    y: y + indexY,
                })
            })
        })
    }
}