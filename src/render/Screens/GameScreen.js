import { Screen } from "./Screen.js"

export class GameScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            const gameScreen = document.createElement('div')
            gameScreen.id = "tela"
            gameScreen.innerHTML = `
            <canvas id="game"></canvas>
            <div id="data">
                <div id="next-wrapper">
                    <div>Próximo</div>
                    <canvas id="next" width="0" height="0"></canvas>
                </div>
                <div>
                    <div>Pontos: <span id="pontos">0000</span></div>
                    <br>
                    <div>Ultima Pontuação: <div id="last-pontuation">0000</div></div>
                    <br>
                    <div>
                        Recordes:
                        <div id="recordes"></div>
                    </div>
                </div>
            </div>`

            return gameScreen
        }

        this.reset()
    }

    getComponents() {
        const gameScreen = this.screen
        const gameCanvas = gameScreen.querySelector('canvas#game')
        const gameCtx = gameCanvas.getContext('2d')
        const nextCanvas = gameScreen.querySelector('canvas#next')
        const nextCtx = nextCanvas.getContext('2d')
        const points_span = gameScreen.querySelector('#pontos')
        const last_points_span = gameScreen.querySelector('#last-pontuation')

        return { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx, points_span, last_points_span }
    }
}