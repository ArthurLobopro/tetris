import { game } from '../Game.js'

const canvasGame = document.getElementById('game')
const tela = document.getElementById('tela')
const container = document.getElementById('container')

export default async function viewGameOver() {
    const image = canvasGame.toDataURL('image/png')
    const telaGameOver = document.createElement('div')
    telaGameOver.className = 'telas-wrapper'
    telaGameOver.innerHTML = `
    <fieldset style="height: 90%">
        <legend>GAME OVER</legend>
        <div class="table">
            <div class="line">
                <div>Pontuação:</div>
                <div>${game.pontos}</div>
            </div>
        </div>
        <img src="${image}" style="border: 1px solid #aaa;max-height:73%" id="game-over-print">
        <button class="focus">NEW GAME</button>
    </fieldset>`
    container.appendChild(telaGameOver)
    tela.style.display='none'
    const button = telaGameOver.getElementsByTagName('button')[0]
    // window.onkeydown = event => functions[event.key]?.(telaGameOver)
    return new Promise( resolve => {
        button.onclick = () => {
            container.removeChild(telaGameOver)
            tela.style.display=''
            resolve(true)
        }
    })
}