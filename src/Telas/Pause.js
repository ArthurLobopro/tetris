const get = id => document.getElementById(id)
const tela = get('tela')
const container = document.getElementById('container')

export default async function viewPause({play, newGame}) {
    const pause_wrapper = document.createElement('div')
    pause_wrapper.id = "pause-wrapper"
    pause_wrapper.innerHTML = `
    <fieldset id="pause">
        <legend>Pause</legend>
        <div class="button-wrapper">
            <button id="continue" class="focus">CONTINUE</button>
            <button id="config">OPÇÕES</button>
            <button id="new-game">NEW GAME</button>
        </div>
    </fieldset>`

    container.appendChild(pause_wrapper)
    get('continue').onclick = () => {
        container.removeChild(pause_wrapper)
        setTimeout( play, 150)
    }
    get('new-game').onclick = () => {
        container.removeChild(pause_wrapper)
        setTimeout( newGame, 150)
    }
    get('config').onclick = async () => {
        await config()
        window.onkeydown = event => functions[event.key]?.(pause_wrapper)
    }
    window.onkeydown = event => functions[event.key]?.(pause_wrapper)
}