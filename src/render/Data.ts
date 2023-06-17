import Store from "../storage/Store"
import { ThemesSchema } from "../storage/StoreSchemas"
import { game } from "./Game"

export let userPreferences = Store.getUserPreferences()
export let gameData = Store.getGameData()
export let themes = Store.getThemes() as ThemesSchema

export const saveUserPreferences = () => Store.setUserPreferences(userPreferences)
export const saveLastPontuation = () => Store.setGameData('lastPontuation', game.points)
export const saveRecords = () => Store.setGameData('records', game.records)
export const saveCustomTheme = () => Store.setTheme(themes.custom as ThemesSchema['custom'])