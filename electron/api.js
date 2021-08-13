const Store = require('electron-store')

const dataPath = "gameData"

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

const gameData = new Store({ cwd: `${dataPath}/data`, schema: gameSchema })

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
    }
}

const userPreferences = new Store({ cwd: `${dataPath}/userPreferences`, schema: preferencesSchema })

const setUserPreferences = (configName, value) => userPreferences.set(configName, value)
const setGameData = (configName, value) => gameData.set(configName, value)

const getUserPreferences = () => userPreferences.store
const getGameData = () => gameData.store

module.exports = { setUserPreferences, getUserPreferences, getGameData, setGameData }