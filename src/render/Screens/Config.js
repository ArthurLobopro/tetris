import { game, reloadGameConfig } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"

const configs = {
    music: () => screens.configScreens.music.show(false),
    velocity: () => screens.configScreens.velocity.show(false),
    theme: () => screens.configScreens.theme.show(false)
}

export default class ConfigScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
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
                        reloadGameConfig()
                        this.close()
                    } else {
                        this.removeNavigation()
                        await configs[type]?.(game)
                        this.addNavigation()
                    }
                }
            })

            return configScreen
        }

        this.reset()
    }

    close(){
        super.close()
        this.afterScreen.addNavigation()
    }

    show(afterScreen){
        super.show()
        this.afterScreen = afterScreen
    }
}