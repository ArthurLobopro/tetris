import { game } from "./Game.js"
let userPreferences, gameData

window.addEventListener('load', () => {
    userPreferences = api.getUserPreferences()
    gameData = api.getGameData()
})

const saveUserPreferences = () => api.setUserPreferences(userPreferences)

const saveLastPontuation = () => api.setGameData('lastPontuation', game.pontos)

const saveRecords = () => api.setGameData('records', game.records)


export { userPreferences, saveUserPreferences, gameData, saveLastPontuation, saveRecords }