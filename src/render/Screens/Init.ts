import { ipcRenderer } from "electron"
import { Game } from "../Game/Game"
import { ScreenManager } from "../ScreenManager"
import { Screen } from "./Screen"

export class InitScreen extends Screen {
    #game: Game

    constructor(game: Game) {
        super()
        this.reset()
        this.#game = game
    }

    build() {
        const initScreen = document.createElement('div')
        initScreen.className = "telas-wrapper"
        initScreen.innerHTML = `
        <fieldset id="init">
            <legend>Início</legend>
            <div class="button-wrapper">
                <button id="start" class="focus">START</button>
                <button id="config">CONFIGURAÇÕES</button>
                <button id="controls">CONTROLES</button>
                <button id="about">SOBRE</button>
                <button id="exit">SAIR</button>
            </div>
        </fieldset>`

        const functions = {
            start: () => {
                this.close()
                ScreenManager.screens.game.show()
                this.#game.newGame()
            },

            config: () => ScreenManager.screens.config.show(this),
            controls: () => ScreenManager.screens.controls.show(this),
            about: () => ScreenManager.screens.about.show(),
            exit: () => ipcRenderer.send('close')
        }

        const buttons = initScreen.querySelectorAll('button')

        type key = keyof typeof functions

        buttons.forEach(button => {
            button.onclick = () => {
                functions?.[button.id as key]?.()
            }
        })

        return initScreen
    }
}