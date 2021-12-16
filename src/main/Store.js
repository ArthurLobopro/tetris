const Store = require('electron-store')
const { gameSchema, preferencesSchema, themeSchema } = require('./StoreSchemas')

const dataPath = "gameData"

const gameData = new Store({ cwd: `${dataPath}/data`, schema: gameSchema, name: 'data' })

const userPreferences = new Store({ cwd: `${dataPath}/userPreferences`, schema: preferencesSchema })

const themes = new Store({ cwd: `${dataPath}/themes`, schema: themeSchema, name: 'themes' })

const store = {
    setUserPreferences(configName, value) { userPreferences.set(configName, value) },
    setGameData(configName, value) { gameData.set(configName, value) },
    getUserPreferences() { return userPreferences.store },
    getGameData() { return gameData.store },
    themes: themes.store
}


module.exports = store