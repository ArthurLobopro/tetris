import { ThemesController as Themes } from "../../../storage/controllers/Themes"
import { Figures, figureName } from "../../Figures"
import { screens } from "../../ScreenManager"
import { ConfigScreenBase } from "../Screen"
import { FiguresViewer } from "./figuresViewer"

export class CustomThemeConfigScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const colors = Themes.custom

        const resetBackground = () => colors.background = Themes.custom.background

        const resetLines = () => colors.lines = Themes.custom.lines

        const resetFigure = (figureName: figureName) => {
            colors.figures[figureName] = Themes.custom.figures[figureName]
        }

        const copyCustomTheme = () => {
            resetBackground()
            resetLines()
            for (const figureName of Figures.getFigureNames()) {
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
            background(event: Event) {
                const target = event.target as HTMLInputElement
                colors.background = target.value
                figuresViewer.setColors(colors)
            },
            lines(event: Event) {
                const target = event.target as HTMLInputElement
                colors.lines = target.value
                figuresViewer.setColors(colors)
            },
            figure(event: Event) {
                const target = event.target as HTMLInputElement
                const atualFigure = figuresViewer.getAtualFigureName()
                colors.figures[atualFigure] = target.value
                figuresViewer.setColors(colors)
            }
        }

        const colorInputs = customThemeScreen.querySelectorAll('input[type="color"]') as NodeListOf<HTMLInputElement>

        colorInputs.forEach(input => {
            input.oninput = (event) => {
                const target = event.currentTarget as HTMLInputElement
                const inputName = String(target.id).replace("color-", "")

                type key = keyof typeof colorInputFuctions

                colorInputFuctions[inputName as key](event)
            }
        })

        const onChangeFigure = () => {
            const atualFigure = figuresViewer.getAtualFigureName()
            console.log(colors.figures["T"])
            const figureInput = document.getElementById('color-figure') as HTMLInputElement
            figureInput.value = colors.figures[atualFigure]
        }

        const figuresViewer = new FiguresViewer(colors, onChangeFigure)
        const viewWrapper = customThemeScreen.querySelector(".view-wrapper") as HTMLDivElement
        viewWrapper.appendChild(figuresViewer.viewer)

        const saveConfig = () => {
            Themes.custom = colors
        }

        const resetButtons = customThemeScreen.querySelectorAll('.line > div > button') as NodeListOf<HTMLButtonElement>

        resetButtons.forEach(button => {
            button.onclick = () => {
                const functions = {
                    background: resetBackground,
                    lines: resetLines,
                    figure: () => resetFigure(figuresViewer.getAtualFigureName())
                }

                type key = keyof typeof functions

                const type = button.value
                functions?.[type as key]?.()
                figuresViewer.setColors(colors)
                const color_input = customThemeScreen.querySelector(`[data-name="${type}"]`) as HTMLInputElement

                type colorskey = "background" | "lines"

                color_input.value = type === "figure" ?
                    colors.figures[figuresViewer.getAtualFigureName()] : colors[type as colorskey]
            }
        })

        const buttons = customThemeScreen.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>


        buttons.forEach(button => {
            button.onclick = event => {
                const target = event.currentTarget as HTMLButtonElement
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