import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences"
import { DynamicGameBasedScreen } from "../Screen"

export class VelocityConfigScreen extends DynamicGameBasedScreen {
    build() {
        const { velocity } = UserPreferences
        const configTemp = UserPreferences.get()

        const saveConfig = () => {
            UserPreferences.set(configTemp)
            this.game.userPreferences.velocity = UserPreferences.velocity
            this.game.velocity = UserPreferences.velocity
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
                <button data-action="save">
                    OK
                </button>
                <button data-action="cancel">
                    Cancelar
                </button>
            </div>
        </fieldset>`

        const checks = velocity_screen.querySelectorAll<HTMLDivElement>('.radio')

        checks.forEach(check => {
            check.onclick = () => {
                checks.forEach(e => e.dataset.check = "false")

                check.dataset.check = "true"
                configTemp.velocity = check.dataset.value as "slow" | "normal" | "fast"
            }
        })

        const buttons = velocity_screen.querySelectorAll<HTMLButtonElement>('button')

        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset

                action === "save" && saveConfig()

                this.close()
                this.game.screenManager.screens.config.focus()
            }
        })

        return velocity_screen
    }
}