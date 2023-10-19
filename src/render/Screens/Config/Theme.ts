import { ThemesController as Themes } from "../../../storage/controllers/Themes"
import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences"
import { ScreenManager } from "../../ScreenManager"
import { DynamicGameBasedScreen } from "../Screen"
import { FiguresViewer } from "./figuresViewer"

type themeNames = typeof UserPreferences.theme

export class ThemeConfigScreen extends DynamicGameBasedScreen {
    updateColors(theme: themeNames) {
        this.figuresViewer.setColors(Themes[theme])
        this.figuresViewer.renderFigure(this.figuresViewer.getAtualFigureName())
    }

    declare figuresViewer: FiguresViewer

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
                    style="display:${UserPreferences.theme === "custom" ? "" : "none"}"
                    >
                        <button id="open-custom-screen">
                            Customizar
                        </button>
                    </div>

                    <div class="line-buttons">
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

        const getColors = () => Themes[tempTheme]

        this.figuresViewer = new FiguresViewer({
            colors: getColors(),
            game: this.game
        })

        const viewWrapper = themeScreen.querySelector(".view-wrapper") as HTMLDivElement
        viewWrapper.appendChild(this.figuresViewer.viewer)

        const open_custom_button = themeScreen.querySelector("#open-custom-screen") as HTMLButtonElement
        open_custom_button.onclick = () => {
            this.close()
            ScreenManager.screens.configScreens.customTheme.show()
        }

        const themeRadios = themeScreen.querySelectorAll('.radio') as NodeListOf<HTMLDivElement>
        themeRadios.forEach(radio => {
            radio.onclick = () => {
                const checked = document.querySelector('[data-check="true"]') as HTMLDivElement

                if (checked === radio) return

                checked.dataset.check = "false"
                radio.dataset.check = "true"
                tempTheme = radio.dataset.value as themeNames

                const custom_wrapper = themeScreen.querySelector("#custom-wrapper") as HTMLDivElement

                custom_wrapper.style.display = tempTheme === "custom" ? "" : "none"
                this.figuresViewer.setColors(getColors())
            }
        })

        const saveConfig = () => {
            UserPreferences.theme = tempTheme
        }

        const buttons = themeScreen.querySelectorAll<HTMLButtonElement>('.line-buttons > button')
        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset

                action === "save" && saveConfig()

                this.close()
                this.game.screenManager.screens.config.show()
            }
        })

        return themeScreen
    }
}