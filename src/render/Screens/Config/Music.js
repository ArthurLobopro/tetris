import { saveUserPreferences, userPreferences } from "../../Data.js"
import { game } from "../../Game.js"
import { screens } from "../../ScreenManager.js"
import { ConfigScreenBase } from "../Screen.js"

export class MusicConfigScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const configTemp = { ...userPreferences }

        const saveConfig = () => {
            Object.entries(configTemp).forEach(([key, value]) => {
                userPreferences[key] = value
            })
            game.userPreferences = { ...userPreferences }
            saveUserPreferences()
        }

        const music_screen = document.createElement('div')
        music_screen.className = "telas-wrapper"
        music_screen.innerHTML = `
        <fieldset>
            <legend>Música</legend>
                <div class="line">
                    Música: <div class="check" id="music" data-check="${userPreferences?.music}"></div>
                </div>
                <div class="line">
                    Volume: <input type="range" id="volume"  min="0" max="100" value="${userPreferences?.musicVolume * 100}">
                </div>
                <div class="buttons">
                    <button value="1">
                        OK
                    </button>
                    <button class="cancel" value="0">
                        Cancelar
                    </button>
                </div>
        </fieldset>`

        music_screen.querySelector('#music').onclick = event => {
            const value = event.target.dataset.check === "true"
            event.target.dataset.check = !value
            configTemp.music = !value
        }

        music_screen.querySelector('#volume').onchange = event => {
            const { value } = event.target
            configTemp.musicVolume = value / 100
        }

        const buttons = music_screen.querySelectorAll('button')
        buttons.forEach(button => {
            button.onclick = event => {
                const { value } = event.target
                if (value == "1") {
                    saveConfig()
                    game.reloadConfig()
                }
                this.close()
                screens.config.addNavigation()
            }
        })

        return music_screen
    }
}