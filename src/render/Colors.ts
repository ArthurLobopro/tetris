import { ThemesController as Themes } from "../storage/controllers/Themes"
import { UserPreferencesController as UserPreferences } from "../storage/controllers/UserPreferences"

class Colors {
    get figures() {
        return Themes[UserPreferences.theme].figures
    }

    get background() {
        return Themes[UserPreferences.theme].background
    }

    get lines() {
        return Themes[UserPreferences.theme].lines
    }
}

export const colors = new Colors()