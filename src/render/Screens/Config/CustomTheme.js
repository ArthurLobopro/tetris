import { themes, saveCustomTheme } from "../../Data.js"
import FiguresViewer from "./figuresViewer.js"
import { figures } from "../../Figures.js"
import { ConfigScreenBase } from "../Screen.js"
import { screens } from "../../ScreenManager.js"

export default class CustomThemeConfigScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const colors = { ...themes.custom, figures: { ...themes.custom.figures } }
        console.log(colors)

        const resetBackground = () => colors.background = themes.custom.background
        const resetLines = () => colors.lines = themes.custom.lines
        const resetFigure = figureName => {
            console.log(figureName)
            console.log(themes)
            colors.figures[figureName] = themes.custom.figures[figureName]
        }

        const copyCustomTheme = () => {
            resetBackground()
            resetLines()
            for (const figureName of figures.getFigureNames()) {
                resetFigure(figureName)
            }
        }

        copyCustomTheme()

        const customThemeScreen = document.createElement('div')
        customThemeScreen.className = "telas-wrapper"
        customThemeScreen.innerHTML = `
        <fieldset id="customTheme">
            <legend>Customizar Tema</legend>
            <div class="divided">
                <div class="view-wrapper"></div>
    
                <div class="view-wrapper">
    
                    <div class="line">
                        Fundo
                        <div>
                            <input type="color" value="${colors.background}" data-name="background" id="color-background">
                            <button value="background">Zerar</button>
                        </div>
                    </div>
                    <div class="line">
                        Linhas
                        <div>
                            <input type="color" value="${colors.lines}" data-name="lines" id="color-lines">
                            <button value="lines">Zerar</button>
                        </div>
                    </div>
                    <div class="line">
                        Figura atual
                        <div>
                            <input type="color" value="${colors.figures['square']}" data-name="figure" id="color-figure">
                            <button value="figure">Zerar</button>
                        </div>
                    </div>
    
                <div class="buttons">
                    <button value="1">
                        OK
                    </button>
                    <button class="cancel" value="0">
                        Cancelar
                    </button>
                </div>
                </div>
            </div>
        </fieldset>`

        const colorInputFuctions = {
            background(event) {
                colors.background = event.target.value
                figuresViewer.setColors(colors)
            },
            lines(event) {
                colors.lines = event.target.value
                figuresViewer.setColors(colors)
            },
            figure(event) {
                const atualFigure = figuresViewer.getAtualFigureName()
                colors.figures[atualFigure] = event.target.value
                figuresViewer.setColors(colors)
            }
        }

        const colorInputs = customThemeScreen.querySelectorAll('input[type="color"')
        colorInputs.forEach(input => {
            input.oninput = event => {
                const target = event.currentTarget
                const inputName = String(target.id).replace("color-", "")
                colorInputFuctions[inputName](event)
            }
        })

        const onChangeFigure = () => {
            const atualFigure = figuresViewer.getAtualFigureName()
            console.log(colors.figures["T"])
            const figureInput = document.getElementById('color-figure')
            figureInput.value = colors.figures[atualFigure]
        }

        const figuresViewer = new FiguresViewer(colors, onChangeFigure)
        const viewWrapper = customThemeScreen.querySelector(".view-wrapper")
        viewWrapper.appendChild(figuresViewer.viewer)

        const saveConfig = () => {
            themes.custom = colors
            saveCustomTheme()
        }

        const resetButtons = customThemeScreen.querySelectorAll('.line > div > button')
        resetButtons.forEach(button => {
            button.onclick = () => {
                const functions = {
                    background: resetBackground,
                    lines: resetLines,
                    figure: () => resetFigure(figuresViewer.getAtualFigureName())
                }
                const type = button.value
                functions?.[type]?.()
                figuresViewer.setColors(colors)
                customThemeScreen.querySelector(`[data-name="${type}"]`).value = type === "figure" ?
                    colors.figures[figuresViewer.getAtualFigureName()] : colors[type]
            }
        })

        const buttons = customThemeScreen.querySelectorAll('.buttons button')
        buttons.forEach(button => {
            button.onclick = event => {
                const target = event.currentTarget
                if (target.value === "1") {
                    saveConfig()
                }
                this.close()
                screens.configScreens.theme.updateColors()
            }
        })

        return customThemeScreen
    }
}