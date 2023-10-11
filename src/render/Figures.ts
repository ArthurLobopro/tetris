import { colors } from "./Colors"
import { randint } from "./Util"

type Block = {
    type: 'block'
}

type NullBlock = {
    type: 'null'
}

const null_block: NullBlock = { type: 'null' }
const block: Block = { type: 'block' }

export type figureName = "square" | "stick" | "z" | "reverse-z" | "reverse-L" | "L" | "T"

type figure = {
    name: figureName,
    blocks: (Block | NullBlock)[][]
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
}