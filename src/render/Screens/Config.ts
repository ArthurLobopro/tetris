import { ScreenManager } from "../ScreenManager"
import { DynamicGameBasedScreen, Screen } from "./Screen"
import { CreateNavigation } from "./navigation"

const configs = {
    music: () => ScreenManager.screens.configScreens.music.show(),
    velocity: () => ScreenManager.screens.configScreens.velocity.show(),
    theme: () => ScreenManager.screens.configScreens.theme.show()
}

export class ConfigScreen extends DynamicGameBasedScreen {
    declare afterScreen: Screen

    build() {
        const configScreen = document.createElement('div')
        configScreen.className = "telas-wrapper"
        configScreen.innerHTML = `
            <fieldset>
                <legend>CONFIGURAÇÕES</legend>
                <div class="button-wrapper">
                    <button data-action="music" class="focus">Musica</button>
                    <button data-action="velocity">Velocidade</button>
                    <button data-action="theme">Tema</button>
                    <button data-action="voltar">Voltar</button>
                </div>
            </fieldset>`

        const buttons = configScreen.querySelectorAll('button')

        buttons.forEach(button => {
            button.onclick = () => {
                const { action } = button.dataset

                if (action === "voltar") {
                    this.game.reloadConfig()
                    this.close()
                } else {
                    type key = keyof typeof configs

                    configs[action as key]?.()
                }
            }
        })

        return configScreen
    }

    close() {
        super.close()
        ScreenManager.instance._lastScreen.show()
    }

    onKeyDown(event: KeyboardEvent): void {
        CreateNavigation(this.screen)(event)
    }
}