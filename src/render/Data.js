import { game } from "./Game"
import Store from "../storage/Store"

export let userPreferences = Store.getUserPreferences()
export let gameData = Store.getGameData()
export let themes = Store.getThemes()

export const saveUserPreferences = () => Store.setUserPreferences(userPreferences)
export const saveLastPontuation = () => Store.setGameData('lastPontuation', game.points)
export const saveRecords = () => Store.setGameData('records', game.records)
export const saveCustomTheme = () => Store.setTheme(themes.custom)