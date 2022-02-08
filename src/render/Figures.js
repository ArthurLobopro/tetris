import { randint } from "./Util.js"
import { colors } from "./Colors.js"

const figures = {
    types: [],
    random() {
        const max = this.types.length - 1

        const { blocks, name } = this.types[randint(0, max)]
        const color = colors.figures[name]
        return { blocks, color, figureType: name }
    },
    getByName(name) {
        return this.types.find((figure) => figure.name == name).blocks
    },
    getFigureNames() {
        return this.types.map(figure => figure.name)
    }
}

const null_block = { type: 'null' }
const block = { type: 'block' }

figures.types.push({
    name: "square",
    blocks: [
        [block, block],
        [block, block]
    ]
})

figures.types.push({
    name: "stick",
    blocks: [
        [block, block, block, block]
    ]
})

figures.types.push({
    name: "z",
    blocks: [
        [block, block, null_block],
        [null_block, block, block]
    ]
})

figures.types.push({
    name: "reverse-z",
    blocks: [
        [null_block, block, block],
        [block, block, null_block]

    ]
})

figures.types.push({
    name: "reverse-L",
    blocks: [
        [block, null_block, null_block],
        [block, block, block]
    ]
})

figures.types.push({
    name: "L",
    blocks: [
        [null_block, null_block, block],
        [block, block, block]
    ]
})

figures.types.push({
    name: "T",
    blocks: [
        [null_block, block, null_block],
        [block, block, block]
    ]
})

export { figures }