import { game, newGame } from '../Game.js'
import { Screen } from './Screnn.js'

export default class GameOverScrenn extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            const canvasGame = document.getElementById('game')
            const image = canvasGame.toDataURL('image/png')

            const gameOverScrenn = document.createElement('div')
            gameOverScrenn.className = 'telas-wrapper'
            gameOverScrenn.innerHTML = `
            <fieldset id="game-over">
                <legend>GAME OVER</legend>
                <div class="line">
                    <div>Pontuação:</div>
                    <div>${game.pontos}</div>
                </div>
                <img src="${image}" style="border: 1px solid #aaa;max-height:73%" id="game-over-print">
                <button class="focus" style="align-self: center;margin-bottom: 10px;">NEW GAME</button>
            </fieldset>`


            const button = gameOverScrenn.querySelector('button')

            button.onclick = () => {
                this.close()
                newGame()
            }

            return gameOverScrenn
        }
    }
}