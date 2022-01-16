import { game } from "./Game.js"
let userPreferences, gameData, themes

window.addEventListener('load', () => {
    userPreferences = Store.getUserPreferences()
    gameData = Store.getGameData()
    themes = Store.getThemes()
})


const saveUserPreferences = () => Store.setUserPreferences(userPreferences)

const saveLastPontuation = () => Store.setGameData('lastPontuation', game.points)

const saveRecords = () => Store.setGameData('records', game.records)

const saveCustomTheme = ()=> Store.setTheme(themes.custom)

export { userPreferences, saveUserPreferences, gameData, saveLastPontuation, saveRecords, saveCustomTheme, themes }