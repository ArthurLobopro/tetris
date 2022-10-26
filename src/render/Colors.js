import { themes, userPreferences } from "./Data.js"

class Colors {
    figures = {
        square: "",
        stick: "",
        z: "",
        "reverse-z": "",
        "reverse-L": "",
        L: "",
        T: ""
    }
    background = ""
    lines = ""

    update() {
        const theme = themes[userPreferences.theme]
        for (const key in theme) {
            this[key] = theme[key]
        }
    }
}

export const colors = new Colors()

window.addEventListener('load', colors.update.bind(colors))