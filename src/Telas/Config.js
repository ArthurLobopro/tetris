// import functions from "./navegacao.js"
// import velocidade from "./configs/velocidade.js"
// import cores from "./configs/cores.js"
import { game, reloadGameConfig } from "../Game.js"
import viewMusic from "./Config/Music.js"
import viewVelocity from "./Config/Velocity.js"
import navigation from "./navigation.js"

const container = document.getElementById('container')
const get = id => document.getElementById(id)

const configs = {
    music: viewMusic,
    velocity: viewVelocity
}

export default async function viewConfig() {
    const config_screen = document.createElement('div')
    config_screen.className = "telas-wrapper"
    config_screen.innerHTML = `
    <fieldset>
        <legend>CONFIGURAÇÃO</legend>
        <div class="button-wrapper">
            <button data-type="music" class="focus">Musica</button>
            <button data-type="velocity">Velocidade</button>
            <button data-type="voltar">Voltar</button>
        </div>
    </fieldset>`

    container.appendChild(config_screen)
    const buttons = config_screen.querySelectorAll('button')
    window.onkeydown = event => navigation[event.key]?.(config_screen)
    configs.voltar = () => container.removeChild(config_screen)
    return new Promise( resolve => {
        buttons.forEach( button => {
            button.onclick = async event => {
                const { type } = event.target.dataset
                await configs[type]?.(game)
                if(type === "voltar"){
                    reloadGameConfig()
                    resolve(true)
                }
            }
        })
    })
}