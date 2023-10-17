import { ScreenManager } from "../ScreenManager"
import { DynamicGameBasedScreen } from "./Screen"

export class PauseScreen extends DynamicGameBasedScreen {
    build() {
        const pauseScreen = document.createElement('div')
        pauseScreen.id = "pause-wrapper"
        pauseScreen.innerHTML = `
        <fieldset id="pause">
            <legend>Pause</legend>
            <div class="button-wrapper">
                <button data-type="continue" class="focus">CONTINUAR</button>
                <button data-type="config">CONFIGURAÇÕES</button>
                <button data-type="controls">CONTROLES</button>
                <button data-type="new-game">NOVO JOGO</button>
                <button data-type="go-to-init">IR PARA O INICIO</button>
            </div>
        </fieldset>`

        const functions = {
            continue: () => {
                this.close()
                this.game.continueGame()
            },
            "new-game": () => {
                this.close()
                this.game.newGame()
            },
            controls: () => {
                this.close()
                ScreenManager.screens.controls.show(this)
            },
            config: () => {
                this.close()
                ScreenManager.screens.config.show(this)
            },
            "go-to-init": () => {
                this.close()
                this.game.status = "inactive"
                ScreenManager.screens.init.show()
            }
        }

        const buttons = pauseScreen.querySelectorAll('button')

        type key = keyof typeof functions

        buttons.forEach(button => {
            button.onclick = () => {
                const { type } = button.dataset
                functions[type as key]()
            }
        })

        return pauseScreen
    }
}