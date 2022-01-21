import { screens } from "../ScreenManager.js";
import { Screen } from "./Screnn.js";

export default class AboutScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = function () {
            const aboutScrenn = document.createElement('div')
            aboutScrenn.className = "telas-wrapper"
            aboutScrenn.innerHTML = `
            <fieldset id="about">
                <legend>Sobre</legend>
                <div>
                    <p>Este jogo foi feito com o objetivo de refinar minhas habilidades em programação e se divertir durante o processo.</p>
                    <p>Se você está jogando este jogo eu realmente espero que goste! Não é um jogo inovador (eu jogava tetris desde os 8 anos) mas foi feito com carinho.</p>

                    <div class="center-line">
                        <img src="../assets/github-logo.png" id="github-repo">
                    </div>

                    <dl>
                        <dt>Créditos:</dt>
                        <dd>Autor: Arthur Lobo.</dd>
                        <dd>Licença: MIT.</dd>
                        <dd>Música: <span class="link">https://youtu.be/NmCCQxVBfyM</span> </dd>
                    </dl>

                    <div class="center-line">
                        <button class="focus" id="return">Voltar</button>
                    </div>
                </div>
            </fieldset>`

            const repository_link = "https://github.com/ArthurLobopro/tetris"

            aboutScrenn.querySelector("#github-repo").onclick = () => {
                openExternal(repository_link)
            }

            aboutScrenn.querySelectorAll('.link').forEach(span => {
                span.onclick = () => {
                    openExternal(span.innerText)
                }
            })

            aboutScrenn.querySelector("#return").onclick = () => {
                this.close()
                screens.init.show()
            }

            return aboutScrenn
        }

        this.reset()
    }
}