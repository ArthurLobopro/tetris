import { ipcRenderer } from "electron"
import { game } from "../Game"
import { screens } from "../ScreenManager"
import { Screen } from "./Screen"

export class InitScreen extends Screen {
    constructor() {
        super()
        this.reset()
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
                game.newGame()
            },

            config: () => screens.config.show(this),
            controls: () => screens.controls.show(screens.init),
            about: () => screens.about.show(),
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