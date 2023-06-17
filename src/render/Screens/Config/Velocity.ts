import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences"
import { game } from "../../Game"
import { screens } from "../../ScreenManager"
import { ConfigScreenBase } from "../Screen"

export class VelocityConfigScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const { velocity } = UserPreferences
        const configTemp = UserPreferences.get()

        const saveConfig = () => {
            Object.entries(configTemp).forEach(([key, value]) => {
                // @ts-ignore
                UserPreferences[key as key] = value
            })

            game.userPreferences.velocity = UserPreferences.velocity
            game.velocity = UserPreferences.velocity
        }

        const velocity_screen = document.createElement('div')
        velocity_screen.className = 'telas-wrapper'
        velocity_screen.innerHTML = `
        <fieldset>
            <legend class="title">Velocidade</legend>        
            <div class="text">
                <div class="line">
                    <div>Lento</div>
                    <div class="radio" data-check="${velocity === "slow"}" data-value="slow"></div>
                </div>
                <div class="line">
                    <div>Médio</div>
                    <div class="radio" data-check="${velocity === "normal"}" data-value="normal"></div>
                </div>
                <div class="line">
                    <div>Rápido</div>
                    <div class="radio" data-check="${velocity === "fast"}" data-value="fast"></div>
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
        </fieldset>`

        const checks = velocity_screen.querySelectorAll('.radio') as NodeListOf<HTMLDivElement>

        checks.forEach(e => {
            e.onclick = event => {
                const target = event.target as HTMLDivElement

                checks.forEach(e => {
                    e.dataset.check = "false"
                })

                target.dataset.check = "true"
                configTemp.velocity = target.dataset.value as "slow" | "normal" | "fast"
            }
        })


        const buttons = velocity_screen.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

        buttons.forEach(button => {
            button.onclick = event => {
                const { value } = event.target as HTMLButtonElement
                if (value == "1") {
                    saveConfig()
                }
                this.close()
                screens.config.addNavigation()
            }
        })

        return velocity_screen
    }
}