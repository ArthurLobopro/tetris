import { game } from '../Game.js'
import { Screen } from './Screen.js'

export default class GameOverScreen extends Screen {
    constructor() {
        super()
    }

    buildFunction() {
        const canvasGame = document.getElementById('game')
        const image = canvasGame.toDataURL('image/png')

        const gameOverScreen = document.createElement('div')
        gameOverScreen.className = 'telas-wrapper'
        gameOverScreen.innerHTML = `
        <fieldset id="game-over">
            <legend>GAME OVER</legend>
            <div class="line">
                <div>Pontuação:</div>
                <div>${game.points}</div>
            </div>
            <img src="${image}" style="border: 1px solid #aaa;max-height:73%" id="game-over-print">
            <button class="focus" style="align-self: center;margin-bottom: 10px;">NEW GAME</button>
        </fieldset>`

        const button = gameOverScreen.querySelector('button')

        button.onclick = () => {
            this.close()
            game.newGame()
        }

        return gameOverScreen
    }
}