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
    }
}

module.exports = { gameSchema, preferencesSchema }