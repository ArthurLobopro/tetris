import { game, reloadGameConfig } from "../Game.js"
import viewMusic from "./Config/Music.js"
import viewVelocity from "./Config/Velocity.js"
import viewThemeConfig from "./Config/Theme.js"
import navigation from "./navigation.js"

import { Screen } from "./Screnn.js"

const container = document.getElementById('container')
const get = id => document.getElementById(id)

const configs = {
    music: viewMusic,
    velocity: viewVelocity,
    theme: viewThemeConfig
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
                        await configs[type]?.(game)
                        this.addNavigation()
                    }
                }
            })

            return configScreen
        }

        this.reset()
    }
}