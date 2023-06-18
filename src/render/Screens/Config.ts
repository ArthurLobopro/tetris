import { game } from "../Game"
import { screens } from "../ScreenManager"
import { Screen } from "./Screen"

const configs = {
    music: () => screens.configScreens.music.show(),
    velocity: () => screens.configScreens.velocity.show(),
    theme: () => screens.configScreens.theme.show()
}

export class ConfigScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    declare afterScreen: Screen

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
                const target = event.target as HTMLButtonElement
                const { type } = target.dataset
                if (type === "voltar") {
                    game.reloadConfig()
                    this.close()
                } else {
                    this.removeNavigation()
                    type key = keyof typeof configs

                    configs[type as key]?.()
                }
            }
        })

        return configScreen
    }

    close() {
        this.afterScreen.show()
        super.close()
    }

    //@ts-ignore
    show(afterScreen: Screen) {
        super.show()
        this.afterScreen = afterScreen
    }
}