
import Store from "zod-electron-store"
import { themeMigrations, userPreferencesMigrations } from "./Migrations"

import {
    GameSchema,
    PreferencesSchema,
    ThemeSchema,
    ThemesSchema,
    gameSchema,
    preferencesSchema,
    themesSchema
} from "./StoreSchemas"

const dataPath = "gameData"

export const gameData = new Store<GameSchema>({
    cwd: `${dataPath}/data`,
    schema: gameSchema,
    name: "data",
    clearInvalidConfig: true
})

export const userPreferences = new Store<PreferencesSchema>({
    cwd: `${dataPath}/userPreferences`,
    schema: preferencesSchema,
    //@ts-ignore
    migrations: userPreferencesMigrations
})

const themes = new Store<ThemesSchema>({
    cwd: `${dataPath}/themes`,
    schema: themesSchema,
    name: "themes",
    clearInvalidConfig: true,
    // @ts-ignore
    migrations: themeMigrations
})

const store = {
    setUserPreferences(preferences: PreferencesSchema) { userPreferences.set(preferences) },
    setGameData(configName: string, value: any) { gameData.set(configName, value) },
    setTheme(customTheme: ThemeSchema) { themes.set("custom", customTheme) },
    getUserPreferences() { return userPreferences.store },
    getGameData() { return gameData.store },
    getThemes() { return themes.store }
}

export default store