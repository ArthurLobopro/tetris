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
                <button data-action="continue" class="focus">CONTINUAR</button>
                <button data-action="config">CONFIGURAÇÕES</button>
                <button data-action="controls">CONTROLES</button>
                <button data-action="new-game">NOVO JOGO</button>
                <button data-action="go-to-init">IR PARA O INICIO</button>
            </div>
        </fieldset>`

        const actions = {
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

        type key = keyof typeof actions

        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset
                actions[action as key]()
            }
        })

        return pauseScreen
    }
}