import { game, reloadGameConfig } from "../Game.js"
import viewMusic from "./Config/Music.js"
import viewVelocity from "./Config/Velocity.js"
import viewThemeConfig from "./Config/Theme.js"
import navigation from "./navigation.js"

const container = document.getElementById('container')
const get = id => document.getElementById(id)

const configs = {
    music: viewMusic,
    velocity: viewVelocity,
    theme: viewThemeConfig
}

export default async function viewConfig() {
    const config_screen = document.createElement('div')
    config_screen.className = "telas-wrapper"
    config_screen.innerHTML = `
    <fieldset>
        <legend>CONFIGURAÇÕES</legend>
        <div class="button-wrapper">
            <button data-type="music" class="focus">Musica</button>
            <button data-type="velocity">Velocidade</button>
            <button data-type="theme">Tema</button>
            <button data-type="voltar">Voltar</button>
        </div>
    </fieldset>`

    container.appendChild(config_screen)
    const buttons = config_screen.querySelectorAll('button')
    window.onkeydown = event => navigation[event.key]?.(config_screen)
    configs.voltar = () => container.removeChild(config_screen)
    return new Promise(resolve => {
        buttons.forEach(button => {
            button.onclick = async event => {
                const { type } = event.target.dataset
                if (type === "voltar") {
                    reloadGameConfig()
                    container.removeChild(config_screen)
                    resolve(true)
                } else {
                    await configs[type]?.(game)
                    window.onkeydown = event => navigation[event.key]?.(config_screen)
                }
            }
        })
    })
}