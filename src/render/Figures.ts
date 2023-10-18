import { colors } from "./Colors"
import { randint, range } from "./Util"

type Block = {
    type: 'block'
}

export type NullBlock = {
    type: 'null'
}

const null_block: NullBlock = { type: 'null' }
const block: Block = { type: 'block' }

export type figureName = "square" | "stick" | "z" | "reverse-z" | "reverse-L" | "L" | "T"

export type blocks = (Block | NullBlock)[][]

type figure = {
    name: figureName,
    blocks: blocks
}

const FIGURES_TYPES: figure[] = [
    {
        name: "square",
        blocks: [
            [block, block],
            [block, block]
        ]
    },
    {
        name: "stick",
        blocks: [
            [block, block, block, block]
        ]
    },
    {
        name: "z",
        blocks: [
            [block, block, null_block],
            [null_block, block, block]
        ]
    },
    {
        name: "reverse-z",
        blocks: [
            [null_block, block, block],
            [block, block, null_block]
        ]
    },
    {
        name: "reverse-L",
        blocks: [
            [block, null_block, null_block],
            [block, block, block]
        ]
    },
    {
        name: "L",
        blocks: [
            [null_block, null_block, block],
            [block, block, block]
        ]
    },
    {
        name: "T",
        blocks: [
            [null_block, block, null_block],
            [block, block, block]
        ]
    }
]

export class Figures {
    static get types() {
        return FIGURES_TYPES
    }

    static random() {
        const max = this.types.length - 1

        const { blocks, name } = this.types[randint(0, max)]
        const color = colors.figures[name]
        return { blocks, color, figureType: name }
    }

    static getByName(name: figureName) {
        return (this.types.find((figure) => figure.name === name) as figure).blocks
    }

    static getFigureNames() {
        return this.types.map(figure => figure.name)
    }

    static getRotated(blocks: figure["blocks"]) {
        const newFigure = []

        for (const block of range(0, blocks[0].length)) {
            const newLine = []
            for (const line of range(0, blocks.length)) {
                newLine.unshift(blocks[line][block])
            }
            newFigure.push(newLine)
        }

        return newFigure
    }
}

export interface coords {
    x: number
    y: number
}

export class Figure {
    declare x: number
    declare y: number
    declare figure: ReturnType<typeof Figures.random>

    constructor() {
        this.x = 0
        this.y = 0
        this.figure = Figures.random()
    }

    get width() {
        return this.figure.blocks[0].length
    }

    get height() {
        return this.figure.blocks.length
    }

    get blocks() {
        return this.figure.blocks
    }

    getRotated() {
        const blocks = []

        for (const block of range(0, this.width)) {
            const newLine = []
            for (const line of range(0, this.height)) {
                newLine.unshift(this.figure.blocks[line][block])
            }
            blocks.push(newLine)
        }

        return new Figure().turnInto({
            ...this.figure,
            blocks
        })
    }

    turnInto(figure: ReturnType<typeof Figures.random>) {
        this.figure = figure

        return this
    }

    turnIntoRandom() {
        return this.turnInto(Figures.random())
    }

    setCoords({ x, y }: Partial<coords>) {
        this.x = x ?? this.x
        this.y = y ?? this.y

        return this
    }

    resetCoords() {
        this.setCoords({ x: 0, y: 0 })

        return this
    }
}