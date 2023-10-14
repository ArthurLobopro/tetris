import { NullBlock } from "./Figures"
import { Game } from "./Game"

type coords = { x: number, y: number }

export class GameState {
    declare private _state: { figureType?: string, type: "null" | "block" }[][]
    #game: Game

    constructor(game: Game) {
        this.#game = game
    }

    get state() {
        return this._state
    }

    private makeNullBlock(): NullBlock {
        return { type: "null" }
    }

    private makeALine() {
        return Array.from({ length: this.#game.width }, this.makeNullBlock)
    }

    isBlock({ x, y }: coords) {
        // y < 0 means the figure is spawning
        return y > 0 && this._state[y][x].type === "block"
    }

    resetState() {
        this._state = Array.from({ length: this.#game.height }, () => this.makeALine())
    }

    addFigureToState() {
        const { x, y, blocks, figureType } = this.#game.figures.atualFigure

        blocks.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                this._state[y + indexY] = this._state[y + indexY]?.map((stateBlock, stateX) => {
                    if ((x + indexX) == stateX && block.type === 'block') {
                        return { ...block, figureType }
                    }
                    return stateBlock
                })
            })
        })

        this.removeLines()
    }

    removeLines() {
        const voidLine = this.makeALine()

        this._state = this._state.filter(line => {

            return line.some(block => {
                return block.type === 'null'
            })

        })

        while (this._state.length < this.#game.height) {
            this.addLinePoints()
            this._state.unshift(voidLine)
        }
    }

    addLinePoints() {
        this.#game.addPoints(this.#game.pointsPerBlock * this.#game.width * 2)
    }
}