import navigationFunctions from "./navigation.js"

const container = document.getElementById('container')
const get = id => document.getElementById(id)

export default async function viewInit() {
    const init_wrapper = document.createElement('div')
    init_wrapper.className = "telas-wrapper"
    init_wrapper.innerHTML = `
    <fieldset id="init">
        <legend>Início</legend>
        <div class="button-wrapper">
            <button id="start" class="focus">START</button>
            <button id="config">CONFIGURAÇÕES</button>
            <button id="exit">SAIR</button>
        </div>
    </fieldset>`
    container.appendChild(init_wrapper)
    window.onkeydown = event => navigationFunctions[event.key]?.(init_wrapper)
    return new Promise( res => {
        get('start').onclick = () => {
            container.removeChild(init_wrapper)
            res(true)
        }
        get('exit').onclick = () => {
            ipcRenderer.send('close')
        }
    })
}