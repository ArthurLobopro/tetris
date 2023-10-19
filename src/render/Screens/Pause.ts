import { ScreenManager } from "../ScreenManager"
import { DynamicGameBasedNavigableScreen } from "./Screen"

export class PauseScreen extends DynamicGameBasedNavigableScreen {
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
                ScreenManager.screens.game.focus()
                this.game.continueGame()
            },
            "new-game": () => {
                ScreenManager.screens.game.focus()
                this.game.newGame()
            },
            controls: () => {
                ScreenManager.screens.controls.show(this)
            },
            config: () => {
                ScreenManager.screens.config.show(this)
            },
            "go-to-init": () => {
                this.game.screen.close()
                this.game.status = "inactive"
                ScreenManager.screens.init.show()
            }
        }

        const buttons = pauseScreen.querySelectorAll('button')

        type key = keyof typeof actions

        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset
                this.close()
                actions[action as key]()
            }
        })

        return pauseScreen
    }
}