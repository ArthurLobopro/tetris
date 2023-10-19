import { ThemesController as Themes } from "../../../storage/controllers/Themes"
import { Figures, figureName } from "../../Figures"
import { ScreenManager } from "../../ScreenManager"
import { DynamicGameBasedScreen } from "../Screen"
import { FiguresViewer } from "./figuresViewer"

export class CustomThemeConfigScreen extends DynamicGameBasedScreen {
    build() {
        const colors = Themes.custom

        const saveConfig = () => Themes.custom = colors

        const resetBackground = () => colors.background = Themes.custom.background
        const resetLines = () => colors.lines = Themes.custom.lines
        const resetFigure = (figureName: figureName) => {
            colors.figures[figureName] = Themes.custom.figures[figureName]
        }

        const copyCustomTheme = () => {
            resetBackground()
            resetLines()
            Figures.getFigureNames().forEach(resetFigure)
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
                        <button data-action="save">
                            OK
                        </button>
                        <button data-action="cancel">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>`

        const inputActions = {
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
                const atualFigure = figuresViewer.atualFigureName
                colors.figures[atualFigure] = target.value
                figuresViewer.setColors(colors)
            }
        }

        type inputActionsKey = keyof typeof inputActions

        const colorInputs = customThemeScreen.querySelectorAll<HTMLInputElement>('input[type="color"]')
        colorInputs.forEach(input => {
            input.oninput = (event) => {
                const { name } = input.dataset

                inputActions[name as inputActionsKey](event)
            }
        })

        const onChangeFigure = () => {
            const atualFigure = figuresViewer.atualFigureName
            const figureInput = document.getElementById('color-figure') as HTMLInputElement
            figureInput.value = colors.figures[atualFigure]
        }

        const figuresViewer = new FiguresViewer({
            colors,
            onChangeFigure,
            game: this.game
        })

        const viewWrapper = customThemeScreen.querySelector(".view-wrapper") as HTMLDivElement
        viewWrapper.appendChild(figuresViewer.viewer)

        const resetButtons = customThemeScreen.querySelectorAll<HTMLButtonElement>('.line > div > button')

        resetButtons.forEach(button => {
            button.onclick = () => {
                const functions = {
                    background: resetBackground,
                    lines: resetLines,
                    figure: () => resetFigure(figuresViewer.atualFigureName)
                }

                type key = keyof typeof functions

                const type = button.value
                functions?.[type as key]?.()
                figuresViewer.setColors(colors)
                const color_input = customThemeScreen.querySelector(`[data-name="${type}"]`) as HTMLInputElement

                type colorskey = "background" | "lines"

                color_input.value = type === "figure" ?
                    colors.figures[figuresViewer.atualFigureName] : colors[type as colorskey]
            }
        })

        const buttons = customThemeScreen.querySelectorAll<HTMLButtonElement>('.buttons button')
        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset

                action === "save" && saveConfig()

                this.close()
                ScreenManager.instance._lastScreen.show()
            }
        })

        return customThemeScreen
    }
}