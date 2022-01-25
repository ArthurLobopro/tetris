import { newGame, game, continueGame } from "../Game.js"
import { screens } from "../ScreenManager.js"
import { Screen } from "./Screen.js"

export default class PauseScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            const pauseScreen = document.createElement('div')
            pauseScreen.id = "pause-wrapper"
            pauseScreen.innerHTML = `
            <fieldset id="pause">
                <legend>Pause</legend>
                <div class="button-wrapper">
                    <button data-type="continue" class="focus">CONTINUAR</button>
                    <button data-type="config">CONFIGURAÇÕES</button>
                    <button data-type="new-game">NOVO JOGO</button>
                    <button data-type="go-to-init">IR PARA O INICIO</button>
                </div>
            </fieldset>`

            const functions = {}

            functions.continue = () => {
                this.close()
                continueGame()
            }

            functions["new-game"] = () => {
                this.close()
                newGame()
            }

            functions.config = () => {
                screens.config.show(screens.pause)
            }

            functions["go-to-init"] = () => {
                this.close()
                game.status = "inactive"
                screens.init.show()
            }

            const buttons = pauseScreen.querySelectorAll('button')
            buttons.forEach(button => {
                button.onclick = () => {
                    const { type } = button.dataset
                    functions[type]()
                }
            })

            return pauseScreen
        }

        this.reset()
    }
}