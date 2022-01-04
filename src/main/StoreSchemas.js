const gameSchema = {
    lastPontuation: {
        type: 'number',
        minimum: 0,
        default: 0
    },
    records: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        default: [
            { points: 0 }, { points: 0 }, { points: 0 }
        ]
    }
}

const preferencesSchema = {
    music: {
        type: 'boolean',
        default: true
    },
    musicVolume: {
        type: 'number',
        minimum: 0,
        maximum: 1,
        default: 1
    },
    gameplayVelocity: {
        type: 'number',
        default: 300,
        minimum: 150,
        maximum: 500
    },
    theme: {
        type: "string",
        enum: ["retro", "tetris", "custom"],
        default: "tetris"
    }
}

const tetrisTheme = {
    type: "object",
    default: {
        figures: {
            square: "#D0BE00",
            stick: "#00CAE0",
            z: "#DA0000",
            "reverse-z": "#00C733",
            "reverse-L": "#007CC6",
            L: "#D08A00",
            T: " #C500EA"
        },
        background: "#0e0d0d",
        lines: "#2a2929"
    }
}

const themeSchema = {
    retro: {
        type: "object",
        default: {
            figures: {
                square: "#ddd",
                stick: "#ddd",
                z: "#ddd",
                "reverse-z": "#ddd",
                "reverse-L": "#ddd",
                L: "#ddd",
                T: "#ddd"
            },
            background: "#1E1E1E",
            lines: "#AAA"
        }
    },
    tetris: tetrisTheme,
    custom: tetrisTheme
}

module.exports = { gameSchema, preferencesSchema, themeSchema }