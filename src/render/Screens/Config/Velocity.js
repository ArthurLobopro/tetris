import { game } from "../../Game.js"
import { userPreferences, saveUserPreferences } from "../../Data.js"
import { Screen } from "../Screnn.js"
import { screens } from "../../ScreenManager.js"
export default class VelocityConfigScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function(){
            const { gameplayVelocity: velocity } = userPreferences
            const configTemp = { ...userPreferences }

            const saveConfig = () => {
                Object.entries(configTemp).forEach(([key, value]) => {
                    userPreferences[key] = value
                })
                game.userPreferences = { ...userPreferences }
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
                        <div class="radio" data-check="${velocity === 500}" data-value="500"></div>
                    </div>
                    <div class="line">
                        <div>Médio</div>
                        <div class="radio" data-check="${velocity === 300}" data-value="300"></div>
                    </div>
                    <div class="line">
                        <div>Rápido</div>
                        <div class="radio" data-check="${velocity === 150}" data-value="150"></div>
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
                    configTemp.gameplayVelocity = Number(target.dataset.value)
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
                    screens.config.show()
                }
            })

            return velocity_screen
        }
    }

    show(){
        this.reset()
        super.show()
    }
}