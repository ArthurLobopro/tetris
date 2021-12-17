import { randint } from "./Util.js"
import { colors } from "./Colors.js"

const figures = {
    types: [],
    random() {
        const max = this.types.length - 1
         
        const { blocks, name } = this.types[randint(0, max)]
        const color = colors.figures[name]
        return { blocks, color }
    }
}

figures.types.push({
    name: "square",
    blocks: [
        [
            { type: 'block' },
            { type: 'block' }
        ],
        [
            { type: 'block' },
            { type: 'block' }
        ]
    ]
})

figures.types.push({
    name: "stick",
    blocks: [
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'block' },
            { type: 'block' }
        ]
    ]
})

figures.types.push({
    name: "z",
    blocks: [
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'null' }
        ],
        [
            { type: 'null' },
            { type: 'block' },
            { type: 'block' }
        ]
    
    ]
})

figures.types.push({
    name: "reverse-z",
    blocks: [
        [
            { type: 'null' },
            { type: 'block' },
            { type: 'block' }
        ],
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'null' }
        ]
    
    ]
})

figures.types.push({
    name: "reverse-L",
    blocks: [
        [
            { type: 'block' },
            { type: 'null' },
            { type: 'null' }
        ],
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'block' }
        ]
    ]
})

figures.types.push({
    name: "L",
    blocks: [
        [
            { type: 'null' },
            { type: 'null' },
            { type: 'block' }
        ],
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'block' }
        ]
    ]
})

figures.types.push({
    name: "T",
    blocks: [
        [
            { type: 'null' },
            { type: 'block' },
            { type: 'null' }
        ],
        [
            { type: 'block' },
            { type: 'block' },
            { type: 'block' }
        ]
    ]
})

export { figures }