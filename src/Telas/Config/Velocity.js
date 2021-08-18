import { game } from "../../Game.js"
import { userPreferences, saveUserPreferences } from "../../Data.js"

const container = document.getElementById('container')

let configTemp = {}

const saveConfig = () => {
    Object.entries(configTemp).forEach(([key,value]) => {
        userPreferences[key]= value
    })
    saveUserPreferences()
}

export default function viewVelocity(){
    const { gameplayVelocity: velocidade } = game.userPreferences
    configTemp = {...userPreferences}
    const velocity_screen = document.createElement('div')
    velocity_screen.className = 'telas-wrapper'
    velocity_screen.innerHTML = `
    <fieldset>
        <legend class="title">Velocidade</legend>        
        <div class="text">
            <div class="line">
                <div>Lento</div>
                <div class="radio" data-check="${velocidade === 500}" data-value="500"></div>
            </div>
            <div class="line">
                <div>Médio</div>
                <div class="radio" data-check="${velocidade === 300}" data-value="300"></div>
            </div>
            <div class="line">
                <div>Rápido</div>
                <div class="radio" data-check="${velocidade === 150}" data-value="150"></div>
            </div>
        </div>
        <div class="buttons">
            <button value="1">
                OK
            </button>
            <button class="cancel" value="0">
                Cancelar
            </button>
        </div>
    </fieldset>`
    const fieldset = velocity_screen.querySelector('fieldset')
    const checks = fieldset.querySelectorAll('.radio')
    checks.forEach( e => {
        e.onclick = event => {
            const target = event.target
           
            document.querySelectorAll('.radio').forEach( e => {
                e.dataset.check = "false"
            })
           
            target.dataset.check = "true"
        }
    })
    container.appendChild(velocity_screen)

    const buttons = velocity_screen.querySelectorAll('button')
    buttons.forEach( button => {
        button.onclick = event => {
            const { value } = event.target
            if(value == "1"){
                saveConfig()
            }
            container.removeChild(velocity_screen)
        }
    })
}