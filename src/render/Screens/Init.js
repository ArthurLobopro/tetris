import { Screen } from "./Screen.js"
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
                    <button id="controls">CONTROLES</button>
                    <button id="about">SOBRE</button>
                    <button id="exit">SAIR</button>
                </div>
            </fieldset>`

            const functions = {
                start() {
                    this.close()
                    newGame()
                },
                config() {
                    screens.config.show(screens.init)
                },
                controls() {
                    screens.controls.show(screens.init)
                },
                about() {
                    screens.about.show()
                },
                exit() {
                    ipcRenderer.send('close')
                }
            }

            const buttons = initScreen.querySelectorAll('button')
            
            buttons.forEach(button => {
                button.onclick = () => {
                    functions?.[button.id]?.call(this)
                }
            })

            return initScreen
        }

        this.reset()
    }
}