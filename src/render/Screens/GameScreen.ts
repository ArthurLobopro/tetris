import { Game } from "../Game/Game"
import { formatPoints } from "../Util"
import { Screen } from "./Screen"

export class GameScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    build() {
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

    updateRecords(records: { points: number }[]) {
        const medals = [
            "../assets/medals/1.png",
            "../assets/medals/2.png",
            "../assets/medals/3.png"
        ]

        const lines: string[] = []

        records.forEach(({ points }, index) => {
            const line =
                `<div class="line">
                    <img src=" ${medals[index]}" width="16px">
                    <div>${formatPoints(points)}</div>
                </div>`
            lines.push(line)
        })

        this.records_wrapper.innerHTML = lines.join('')
    }

    updateDimensions(game: Game) {
        this.gameCanvas.width = (game.width * game.squareWidth) + game.width - 1
        this.gameCanvas.height = (game.height * game.squareWidth) + game.height - 1

        this.nextCanvas.width = (game.squareWidth * game.nextCanvasSize.width) + game.nextCanvasSize.width - 1
        this.nextCanvas.height = (game.squareWidth * game.nextCanvasSize.height) + game.nextCanvasSize.height - 1
    }

    private get records_wrapper() {
        return this.screen.querySelector("#recordes") as HTMLDivElement
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