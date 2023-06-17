import { UserPreferencesController as UserPreferences } from "../storage/controllers/UserPreferences"
import { themes } from "./Data"

class Colors {
    get figures() {
        return themes[UserPreferences.theme].figures
    }

    get background() {
        return themes[UserPreferences.theme].background
    }

    get lines() {
        return themes[UserPreferences.theme].lines
    }
}

export const colors = new Colors()