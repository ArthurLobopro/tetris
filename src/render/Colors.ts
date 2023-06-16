import { themes, userPreferences } from "./Data"

class Colors {
    get figures() {
        return themes[userPreferences.theme].figures
    }

    get background() {
        return themes[userPreferences.theme].background
    }

    get lines() {
        return themes[userPreferences.theme].lines
    }
}

export const colors = new Colors()