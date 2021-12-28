import { saveUserPreferences, userPreferences, themes } from "../../Data.js"
import buildFiguresViewer from "./figuresViewer.js"
import { updateColors } from "../../Colors.js"
import viewCustomThemeConfig from "./CustomTheme.js"

const container = document.getElementById('container')

let tempTheme = ''

export default async function viewThemeConfig() {
    const themeScrenn = document.createElement('div')
    themeScrenn.className = "telas-wrapper"
    themeScrenn.innerHTML = `
    <fieldset id="theme">
        <legend>Tema</legend>
        <div class="divided">
            <div class="view-wrapper"></div>

            <div class="view-wrapper">
                <div class="line">
                    Retro
                    <div 
                        class="radio" name="theme" 
                        data-check="${userPreferences.theme === "retro"}" data-value="retro"
                    ></div>
                </div>
                <div class="line">
                    Tetris
                    <div 
                        class="radio" name="theme" 
                        data-check="${userPreferences.theme === "tetris"}" data-value="tetris"
                    ></div>
                </div>
                <div class="line">
                    Customizável
                    <div 
                        class="radio" name="theme" 
                        data-check="${userPreferences.theme === "custom"}" data-value="custom"
                    ></div>
                </div>
                <div class="flex-center">
                    <button id="open-custom-screnn">
                        Customizar
                    </button>
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

    tempTheme = userPreferences.theme
    const getColors = () => themes[tempTheme]

    let colors = getColors()
    const { viewer, setColors, getAtualFigureName, renderFigure } = buildFiguresViewer(colors)
    const viewWrapper = themeScrenn.querySelector(".view-wrapper")
    viewWrapper.appendChild(viewer)
    container.appendChild(themeScrenn)

    themeScrenn.querySelector("#open-custom-screnn").onclick = async () => {
        await viewCustomThemeConfig()
        setColors(getColors())
        renderFigure(getAtualFigureName())
    }

    const themeRadios = document.getElementsByName('theme')

    themeRadios.forEach(radio => {
        radio.onclick = event => {
            const clickedButton = event.currentTarget
            const checked = document.querySelector('[data-check="true"]')
            checked.dataset.check = false
            clickedButton.dataset.check = true
            tempTheme = clickedButton.dataset.value
            colors = getColors()
            setColors(colors)
        }
    })

    const saveConfig = () => {
        userPreferences.theme = tempTheme
        saveUserPreferences()
    }

    const buttons = themeScrenn.querySelectorAll('.buttons > button')

    return new Promise(response => {
        buttons.forEach(button => {
            button.onclick = event => {
                const target = event.currentTarget
                if (target.value == 1) {
                    saveConfig()
                    updateColors()
                }
                container.removeChild(themeScrenn)
                response(true)
            }
        })
    })


}