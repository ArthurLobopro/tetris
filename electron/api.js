const Store = require('electron-store')

const dataPath = "gameData"

const userSchema = {
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
const userData = new Store({ cwd: `${dataPath}/user`, schema: userSchema })

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

function setUserPreferences(configName, value) {
    userPreferences.set(configName, value)
}
const getUserPreferences = () => userPreferences.store

module.exports = { setUserPreferences, getUserPreferences }