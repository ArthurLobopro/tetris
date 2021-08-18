const Store = require('electron-store')
const { gameSchema, preferencesSchema } = require('./StoreSchemas')

const dataPath = "gameData"

const gameData = new Store({ cwd: `${dataPath}/data`, schema: gameSchema, name: 'data' })

const userPreferences = new Store({ cwd: `${dataPath}/userPreferences`, schema: preferencesSchema })

const setUserPreferences = (configName, value) => userPreferences.set(configName, value)
const setGameData = (configName, value) => gameData.set(configName, value)

const getUserPreferences = () => userPreferences.store
const getGameData = () => gameData.store

module.exports = { setUserPreferences, getUserPreferences, getGameData, setGameData }