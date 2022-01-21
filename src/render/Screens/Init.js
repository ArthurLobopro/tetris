import { Screen } from "./Screnn.js"
import { newGame } from "../Game.js"
import { screens } from "../ScreenManager.js"

export default class InitScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            const initScreen = document.createElement('div')
            initScreen.className = "telas-wrapper"
            initScreen.innerHTML = `
            <fieldset id="init">
                <legend>Início</legend>
                <div class="button-wrapper">
                    <button id="start" class="focus">START</button>
                    <button id="config">CONFIGURAÇÕES</button>
                    <button id="about">SOBRE</button>
                    <button id="exit">SAIR</button>
                </div>
            </fieldset>`

            const buttons = initScreen.querySelectorAll('button')
            buttons.forEach(button => {
                button.onclick = () => {
                    switch (button.id) {
                        case "start":
                            this.close()
                            newGame()
                            break
                        case "config":
                            screens.config.show(screens.init)
                            break
                        case "about":
                            screens.about.show()
                            break
                        case "exit":
                            ipcRenderer.send('close')
                            break
                    }
                }
            })

            return initScreen
        }

        this.reset()
    }
}