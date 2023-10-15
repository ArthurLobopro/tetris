import { ThemesController as Themes } from "../../../storage/controllers/Themes"
import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences"
import { screens } from "../../ScreenManager"
import { ConfigScreenBase } from "../Screen"
import { FiguresViewer } from "./figuresViewer"

export class ThemeConfigScreen extends ConfigScreenBase {
    declare updateColors: () => void

    build() {
        let tempTheme = UserPreferences.theme

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
                            data-check="${UserPreferences.theme === "retro"}" data-value="retro"
                        ></div>
                    </div>
                    <div class="line">
                        Tetris
                        <div 
                            class="radio" name="theme" 
                            data-check="${UserPreferences.theme === "tetris"}" data-value="tetris"
                        ></div>
                    </div>
                    <div class="line">
                        Customizável
                        <div 
                            class="radio" name="theme" 
                            data-check="${UserPreferences.theme === "custom"}" data-value="custom"
                        ></div>
                    </div>
                    <div 
                    id="custom-wrapper" class="flex-center" 
                    style="display: ${UserPreferences.theme === "custom" ? "" : "none"};"
                    >
                        <button id="open-custom-screnn">
                            Customizar
                        </button>
                    </div>

                    <div class="line-buttons">
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

        const getColors = () => Themes[tempTheme]

        const figuresViewer = new FiguresViewer(getColors())
        const viewWrapper = themeScreen.querySelector(".view-wrapper") as HTMLDivElement

        viewWrapper.appendChild(figuresViewer.viewer)

        const open_custom_button = themeScreen.querySelector("#open-custom-screnn") as HTMLButtonElement

        open_custom_button.onclick = () => screens.configScreens.customTheme.show()

        this.updateColors = () => {
            figuresViewer.setColors(getColors())
            figuresViewer.renderFigure(figuresViewer.getAtualFigureName())
        }

        const themeRadios = themeScreen.querySelectorAll('.radio') as NodeListOf<HTMLDivElement>

        themeRadios.forEach(radio => {
            radio.onclick = () => {
                const checked = document.querySelector('[data-check="true"]') as HTMLDivElement
                checked.dataset.check = "false"
                radio.dataset.check = "true"
                tempTheme = radio.dataset.value as "retro" | "tetris" | "custom"

                const custom_wrapper = themeScreen.querySelector("#custom-wrapper") as HTMLDivElement

                custom_wrapper.style.display = tempTheme === "custom" ? "" : "none"
                figuresViewer.setColors(getColors())
            }
        })

        const saveConfig = () => {
            UserPreferences.theme = tempTheme
        }

        const buttons = themeScreen.querySelectorAll('.line-buttons > button') as NodeListOf<HTMLButtonElement>

        buttons.forEach(button => {
            button.onclick = () => {
                if (button.value === "1") {
                    saveConfig()
                }
                this.close()
                screens.config.addNavigation()
            }
        })

        return themeScreen
    }
}