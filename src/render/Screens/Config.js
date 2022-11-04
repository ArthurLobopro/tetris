import { game } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"

const configs = {
    music: () => screens.configScreens.music.show(false),
    velocity: () => screens.configScreens.velocity.show(false),
    theme: () => screens.configScreens.theme.show(false)
}

export class ConfigScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    buildFunction() {
        const configScreen = document.createElement('div')
        configScreen.className = "telas-wrapper"
        configScreen.innerHTML = `
            <fieldset>
                <legend>CONFIGURAÇÕES</legend>
                <div class="button-wrapper">
                    <button data-type="music" class="focus">Musica</button>
                    <button data-type="velocity">Velocidade</button>
                    <button data-type="theme">Tema</button>
                    <button data-type="voltar">Voltar</button>
                </div>
            </fieldset>`

        const buttons = configScreen.querySelectorAll('button')

        buttons.forEach(button => {
            button.onclick = async event => {
                const { type } = event.target.dataset
                if (type === "voltar") {
                    game.reloadConfig()
                    this.close()
                } else {
                    this.removeNavigation()
                    configs[type]?.(game)
                }
            }
        })

        return configScreen
    }

    close() {
        this.afterScreen.show()
        super.close()
    }

    show(afterScreen) {
        super.show()
        this.afterScreen = afterScreen
    }
}