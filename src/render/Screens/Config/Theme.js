import { saveUserPreferences, userPreferences, themes } from "../../Data.js"
import buildFiguresViewer from "./figuresViewer.js"
import { updateColors } from "../../Colors.js"
import { Screen } from "../Screnn.js"
import { screens } from "../../ScreenManager.js"

export default class ThemeConfigScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            let tempTheme = userPreferences.theme

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

            const getColors = () => themes[tempTheme]

            const { viewer, setColors, getAtualFigureName, renderFigure } = buildFiguresViewer(getColors())
            const viewWrapper = themeScrenn.querySelector(".view-wrapper")
            viewWrapper.appendChild(viewer)

            themeScrenn.querySelector("#open-custom-screnn").onclick = () => screens.configScrenns.customTheme.show()

            this.updateColors = () => {
                setColors(getColors())
                renderFigure(getAtualFigureName())
            }

            const themeRadios = themeScrenn.querySelectorAll('.radio')

            themeRadios.forEach(radio => {
                radio.onclick = () => {
                    const checked = document.querySelector('[data-check="true"]')
                    checked.dataset.check = false
                    radio.dataset.check = true
                    tempTheme = radio.dataset.value
                    setColors(getColors())
                }
            })

            const saveConfig = () => {
                userPreferences.theme = tempTheme
                saveUserPreferences()
            }

            const buttons = themeScrenn.querySelectorAll('.buttons > button')

            buttons.forEach(button => {
                button.onclick = event => {
                    const target = event.currentTarget
                    if (target.value == 1) {
                        saveConfig()
                        updateColors()
                    }
                    this.close()
                }
            })

            return themeScrenn
        }
    }

    show() {
        this.reset()
        super.show()
    }
}