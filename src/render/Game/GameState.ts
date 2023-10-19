import { NullBlock, coords, figureName } from "../Figures"
import { Game } from "./Game"

export class GameState {
    declare private _state: { figureType?: figureName, type: "null" | "block" }[][]
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
        if (y < 0) return false

        // x lower than 0 is not alowed
        // x equal or upper than game width is not alowed
        if (x < 0 || x >= this.#game.width) return true

        return y > 0 && this._state[y][x].type === "block"
    }

    resetState() {
        this._state = Array.from({ length: this.#game.height }, () => this.makeALine())
    }

    addFigureToState() {
        const { x, y, figure: { blocks, figureType } } = this.#game.figures.atualFigure

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
            return line.some(block => block.type === 'null')
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