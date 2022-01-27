import { saveUserPreferences, userPreferences, themes } from "../../Data.js"
import FiguresViewer from "./figuresViewer.js"
import { updateColors } from "../../Colors.js"
import { ConfigScreenBase } from "../Screen.js"
import { screens } from "../../ScreenManager.js"

export default class ThemeConfigScreen extends ConfigScreenBase {
    constructor() {
        super()

        this.buildFunction = function () {
            let tempTheme = userPreferences.theme

            const themeScreen = document.createElement('div')
            themeScreen.className = "telas-wrapper"
            themeScreen.innerHTML = `
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

            const figuresViewer = new FiguresViewer(getColors())
            const viewWrapper = themeScreen.querySelector(".view-wrapper")
            viewWrapper.appendChild(figuresViewer.viewer)

            themeScreen.querySelector("#open-custom-screnn").onclick = () => screens.configScreens.customTheme.show()

            this.updateColors = () => {
                figuresViewer.setColors(getColors())
                figuresViewer.renderFigure(figuresViewer.getAtualFigureName())
            }

            const themeRadios = themeScreen.querySelectorAll('.radio')

            themeRadios.forEach(radio => {
                radio.onclick = () => {
                    const checked = document.querySelector('[data-check="true"]')
                    checked.dataset.check = false
                    radio.dataset.check = true
                    tempTheme = radio.dataset.value
                    figuresViewer.setColors(getColors())
                }
            })

            const saveConfig = () => {
                userPreferences.theme = tempTheme
                saveUserPreferences()
            }

            const buttons = themeScreen.querySelectorAll('.buttons > button')

            buttons.forEach(button => {
                button.onclick = () => {
                    if (button.value == 1) {
                        saveConfig()
                        updateColors()
                    }
                    this.close()
                    screens.config.show()
                }
            })

            return themeScreen
        }
    }
}