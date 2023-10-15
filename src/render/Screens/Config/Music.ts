import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences"
import { game } from "../../Game"
import { screens } from "../../ScreenManager"
import { ConfigScreenBase } from "../Screen"

export class MusicConfigScreen extends ConfigScreenBase {
    build() {
        const configTemp = UserPreferences.get()

        const saveConfig = () => {
            UserPreferences.set(configTemp)
            game.userPreferences = UserPreferences.get()
        }

        const music_screen = document.createElement('div')
        music_screen.className = "telas-wrapper"
        music_screen.innerHTML = `
        <fieldset>
            <legend>Música</legend>
                <div class="line">
                    Música: <div class="check" id="music" data-check="${UserPreferences?.music}"></div>
                </div>
                <div class="line">
                    Volume: <input type="range" id="volume"  min="0" max="100" value="${UserPreferences?.musicVolume * 100}">
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

        const music_input = music_screen.querySelector('#music') as HTMLDivElement

        music_input.onclick = (event) => {
            const target = event.target as HTMLDivElement
            const value = target.dataset.check === "true"
            target.dataset.check = (!value).toString()
            configTemp.music = !value
        }

        const volume_input = music_screen.querySelector('#volume') as HTMLInputElement

        volume_input.onchange = event => {
            const { valueAsNumber: value } = event.target as HTMLInputElement
            configTemp.musicVolume = value / 100
        }

        const buttons = music_screen.querySelectorAll('button')
        buttons.forEach(button => {
            button.onclick = event => {
                const { value } = event.target as HTMLButtonElement
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