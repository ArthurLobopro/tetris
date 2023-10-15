import { game } from "../Game/Game"
import { screens } from "../ScreenManager"
import { Screen } from "./Screen"

export class PauseScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

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
                game.continueGame()
            },
            "new-game": () => {
                this.close()
                game.newGame()
            },
            controls: () => {
                this.removeNavigation()
                screens.controls.show(screens.pause)
            },
            config: () => {
                this.removeNavigation()
                screens.config.show(this)
            },
            "go-to-init": () => {
                this.close()
                game.status = "inactive"
                screens.init.show()
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