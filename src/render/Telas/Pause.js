import { playGame, newGame, game } from "../Game.js"
import { mainKeyDown } from "../Controllers.js"
import viewConfig from "./Config.js"
import viewInit from "./Init.js"
import navigation from "./navigation.js"

const get = id => document.getElementById(id)
const tela = get('tela')
const container = document.getElementById('container')

export default async function viewPause() {
    const pause_wrapper = document.createElement('div')
    pause_wrapper.id = "pause-wrapper"
    pause_wrapper.innerHTML = `
    <fieldset id="pause">
        <legend>Pause</legend>
        <div class="button-wrapper">
            <button id="continue" class="focus">CONTINUAR</button>
            <button id="config">CONFIGURAÇÕES</button>
            <button id="new-game">NOVO JOGO</button>
            <button id="go-to-init">IR PARA O INICIO</button>
        </div>
    </fieldset>`

    container.appendChild(pause_wrapper)
    window.onkeydown = event => navigation[event.key]?.(pause_wrapper)
    return new Promise( resolve => {
        get('continue').onclick = () => {
            container.removeChild(pause_wrapper)
            window.onkeydown = mainKeyDown
            resolve(true)
        }
        get('new-game').onclick = () => {
            container.removeChild(pause_wrapper)
            window.onkeydown = mainKeyDown
            resolve(false)
            newGame()
        }
        get('config').onclick = async () => {
            await viewConfig()
            window.onkeydown = event => navigation[event.key]?.(pause_wrapper)
        }
        get('go-to-init').onclick = async () => {
            container.removeChild(pause_wrapper)
            game.status = "inactive"
            if(await viewInit()){
                newGame()
                window.onkeydown = mainKeyDown
            }
        }
    })   
}