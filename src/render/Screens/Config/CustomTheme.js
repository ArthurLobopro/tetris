import { themes, saveCustomTheme } from "../../Data.js"
import buildFiguresViewer from "./figuresViewer.js"
import { figures } from "../../Figures.js"

const container = document.getElementById('container')

export default async function viewCustomThemeConfig() {
    const colors = {
        background: '',
        lines: '',
        figures: {}
    }

    const resetBackground = () => colors.background = themes.custom.background
    const resetLines = () => colors.lines = themes.custom.lines
    const resetFigure = figureName => colors.figures[figureName] = themes.custom.figures[figureName]

    const copyCustomTheme = () => {
        resetBackground()
        resetLines()
        for(const figureName of figures.getFigureNames()){
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
            setColors(colors)
        },
        lines(event){
            colors.lines = event.target.value
            setColors(colors)
        },
        figure(event){
            const atualFigure = getAtualFigureName()
            colors.figures[atualFigure] = event.target.value
            setColors(colors)
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
        const atualFigure = getAtualFigureName()
        const figureInput = document.getElementById('color-figure')
        figureInput.value = colors.figures[atualFigure]
    }

    const { viewer, setColors, getAtualFigureName } = buildFiguresViewer(colors, onChangeFigure)
    const viewWrapper = customThemeScreen.querySelector(".view-wrapper")
    viewWrapper.appendChild(viewer)
    container.appendChild(customThemeScreen)

    const saveConfig = () => {
        themes.custom = colors
        saveCustomTheme()
    }

    const resetButtons = customThemeScreen.querySelectorAll('.line > div > button')
    resetButtons.forEach( button => {
        button.onclick = () => {
            const functions = {
                background: resetBackground,
                line: resetLines,
                figure: () => resetFigure(getAtualFigureName())
            }
            const type = button.value
            functions?.[type]?.()
            setColors(colors)
            customThemeScreen.querySelector(`[data-name="${type}"]`).value = type === "figure" ? 
                colors.figures[getAtualFigureName()] : colors[type]
        }
    })

    return new Promise( response => {
        const buttons = customThemeScreen.querySelectorAll('.buttons button')
        buttons.forEach( button => {
            button.onclick = event => {
                const target = event.currentTarget
                if (target.value == 1) {
                    saveConfig()
                }
                container.removeChild(customThemeScreen)
                response(true)
            }
        })
    })
}