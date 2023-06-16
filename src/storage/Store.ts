
import Store from "zod-electron-store"
import { themeMigrations, userPreferencesMigrations } from "./Migrations"

import {
    GameSchema,
    PreferencesSchema,
    ThemesSchema,
    gameSchema,
    preferencesSchema,
    themesSchema
} from "./StoreSchemas"

const dataPath = "gameData"

const gameData = new Store<GameSchema>({
    cwd: `${dataPath}/data`,
    schema: gameSchema,
    name: "data",
    clearInvalidConfig: true
})

const userPreferences = new Store<PreferencesSchema>({
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
    setUserPreferences(configName: string, value: string) { userPreferences.set(configName, value) },
    setGameData(configName: string, value: any) { gameData.set(configName, value) },
    setTheme(customTheme: ThemesSchema) { themes.set("custom", customTheme) },
    getUserPreferences() { return userPreferences.store },
    getGameData() { return gameData.store },
    getThemes() { return themes.store }
}

export default store