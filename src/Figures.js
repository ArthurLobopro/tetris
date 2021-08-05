import { randint } from "./Util.js"

const figures = {
    types: [],
    random() {
        const max = this.types.length - 1
        return this.types[randint(0, max)]
    }
}

figures.types.push([
    [
        { type: 'block' },
        { type: 'block' }
    ],
    [
        { type: 'block' },
        { type: 'block' }
    ]
])

figures.types.push([
    [
        { type: 'block' },
        { type: 'block' },
        { type: 'block' },
        { type: 'block' }
    ]
])

figures.types.push([
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

])

figures.types.push([
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

])

figures.types.push([
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
])

figures.types.push([
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
])
export { figures }