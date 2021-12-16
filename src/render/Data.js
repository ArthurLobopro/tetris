import { game } from "./Game.js"
let userPreferences, gameData, themes

window.addEventListener('load', () => {
    userPreferences = Store.getUserPreferences()
    gameData = Store.getGameData()
    themes = Store.themes
})


const saveUserPreferences = () => Store.setUserPreferences(userPreferences)

const saveLastPontuation = () => Store.setGameData('lastPontuation', game.pontos)

const saveRecords = () => Store.setGameData('records', game.records)

export { userPreferences, saveUserPreferences, gameData, saveLastPontuation, saveRecords, themes }