import { themes } from "../Store"
import { ThemeSchema } from "../StoreSchemas"

export class ThemesController {
    static get custom() {
        return themes.get("custom")
    }

    static set custom(theme: ThemeSchema) {
        themes.set("custom", theme)
    }

    static get tetris() {
        return themes.get("tetris")
    }

    static get retro() {
        return themes.get("retro")
    }
}