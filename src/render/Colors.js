import { themes, userPreferences } from "./Data.js"

const colors = {
    figures: {
        square: "",
        stick: "",
        z: "",
        "reverse-z": "",
        "reverse-L": "",
        L: "",
        T: ""
    },
    background: "",
    lines: ""
}

const updateColors = () => {
    const theme = themes[userPreferences.theme]
    colors.background = theme.background
    colors.lines = theme.lines

    for (const figure in theme.figures) {
        colors.figures[figure] = theme.figures[figure]
    }
}

window.addEventListener('load', () => {
    updateColors()
})

export { colors }