import { delay } from "../Util"
import { Game } from "./Game"
import { figure } from "./GameFigures"

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
        if (!this.moveLock) {
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
    }

    rotate() {
        const { atualFigure, atualFigure: { x, y } } = this.#game.figures

        const rotatedFigure = atualFigure.getRotated()
        const widthDifference = atualFigure.width - rotatedFigure.width

        const hasCollision = (
            x + rotatedFigure.width >= this.#game.width
            || this.simulateAnyCollision({
                x,
                y,
                blocks: rotatedFigure.figure.blocks
            })
        )

        console.log(widthDifference)


        const newX = hasCollision ?
            x - (widthDifference > 0 ? widthDifference : -widthDifference)
            : x

        const stillHasCollision = this.simulateAnyCollision({
            x: newX,
            y,
            blocks: rotatedFigure.figure.blocks
        })

        if (!stillHasCollision) {
            this.#game.figures.atualFigure
                .turnInto(rotatedFigure.figure)
                .setCoords({ x: newX })
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
        return this.simulateHasBlocksOnBottom(this.#game.figures.atualFigure)
    }

    private simulateHasBlocksOnRight({ x, y, blocks }: blocksWithCoords) {
        return x + blocks[0].length >= this.#game.width || this.simulateAnyCollision({
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
        const bottomY = y + blocks.length

        return bottomY === this.#game.height || this.simulateAnyCollision({
            x,
            y: y + 1,
            blocks
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