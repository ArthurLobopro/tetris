const Store = require('electron-store')
const { gameSchema, preferencesSchema, themeSchema } = require('./StoreSchemas')

const dataPath = "gameData"

const gameData = new Store({ cwd: `${dataPath}/data`, schema: gameSchema, name: 'data', clearInvalidConfig: true })

const userPreferences = new Store({ cwd: `${dataPath}/userPreferences`, schema: preferencesSchema, clearInvalidConfig: true })

const themes = new Store({ cwd: `${dataPath}/themes`, schema: themeSchema, name: 'themes', clearInvalidConfig: true })

const store = {
    setUserPreferences(configName, value) { userPreferences.set(configName, value) },
    setGameData(configName, value) { gameData.set(configName, value) },
    setTheme(customTheme){ themes.set('custom', customTheme)},
    getUserPreferences() { return userPreferences.store },
    getGameData() { return gameData.store },
    getThemes(){ return themes.store}
}

module.exports = store