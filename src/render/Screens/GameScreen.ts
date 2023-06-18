import { Screen } from "./Screen"

export class GameScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    buildFunction() {
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

    get gameScreen() {
        return this.screen
    }

    get gameCanvas() {
        return this.screen.querySelector('canvas#game') as HTMLCanvasElement
    }

    get gameCtx() {
        return this.gameCanvas.getContext('2d') as CanvasRenderingContext2D
    }

    get nextCanvas() {
        return this.screen.querySelector('canvas#next') as HTMLCanvasElement
    }

    get nextCtx() {
        return this.nextCanvas.getContext('2d') as CanvasRenderingContext2D
    }

    get points_span() {
        return this.screen.querySelector('#pontos') as HTMLSpanElement
    }

    get last_points_span() {
        return this.screen.querySelector('#last-pontuation') as HTMLDivElement
    }
}