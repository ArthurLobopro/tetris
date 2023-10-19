import { ipcRenderer, shell } from "electron"
import { ScreenManager } from "../ScreenManager"
import { DynamicNavigableScreen } from "./Screen"

export class AboutScreen extends DynamicNavigableScreen {
    build() {
        const aboutScreen = document.createElement('div')
        aboutScreen.className = "telas-wrapper"
        aboutScreen.innerHTML = `
            <fieldset id="about">
                <legend>Sobre</legend>
                <div>
                    <p>Este jogo foi feito com o objetivo de refinar minhas habilidades em programação e se divertir durante o processo.</p>
                    <p>Se você está jogando este jogo eu realmente espero que goste! Não é um jogo inovador, mas foi feito com carinho.</p>

                    <div class="center-line">
                        <img src="../assets/github-logo.png" id="github-repo">
                    </div>

                    <dl>
                        <dt>Créditos:</dt>
                        <dd>Versão: ${ipcRenderer.sendSync('app-version')}</dd>
                        <dd>Autor: Arthur Lobo.</dd>
                        <dd>Licença: MIT.</dd>
                        <dd>Música: <span class="link">https://youtu.be/NmCCQxVBfyM</span> </dd>
                    </dl>

                    <div class="center-line">
                        <button class="focus" id="return">Voltar</button>
                    </div>
                </div>
            </fieldset>`

        const repository_link = "https://github.com/ArthurLobopro/tetris.js"

        const repo_button = aboutScreen.querySelector("#github-repo") as HTMLButtonElement
        repo_button.onclick = () => {
            shell.openExternal(repository_link)
        }

        const links = aboutScreen.querySelectorAll<HTMLSpanElement>('.link')
        links.forEach(span => {
            span.onclick = () => shell.openExternal(span.innerText)
        })

        const return_button = aboutScreen.querySelector("#return") as HTMLButtonElement
        return_button.onclick = () => {
            this.close()
            ScreenManager.instance._lastScreen.show()
        }

        return aboutScreen
    }
}