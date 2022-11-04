import { game } from "../../Game.js"
import { userPreferences, saveUserPreferences } from "../../Data.js"
import { ConfigScreenBase } from "../Screen.js"
import { screens } from "../../ScreenManager.js"

export class VelocityConfigScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const { velocity } = userPreferences
        const configTemp = { ...userPreferences }

        const saveConfig = () => {
            Object.entries(configTemp).forEach(([key, value]) => {
                userPreferences[key] = value
            })
            game.userPreferences.velocity = userPreferences.velocity
            game.velocity = userPreferences.velocity
            saveUserPreferences()
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

        const checks = velocity_screen.querySelectorAll('.radio')

        checks.forEach(e => {
            e.onclick = event => {
                const target = event.target

                document.querySelectorAll('.radio').forEach(e => {
                    e.dataset.check = "false"
                })

                target.dataset.check = "true"
                configTemp.velocity = target.dataset.value
            }
        })


        const buttons = velocity_screen.querySelectorAll('button')
        buttons.forEach(button => {
            button.onclick = event => {
                const { value } = event.target
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