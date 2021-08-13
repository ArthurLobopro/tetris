import { saveUserPreferences, userPreferences } from "../../Data.js"
const container = document.getElementById('container')

const get = id => document.getElementById(id)

let configTemp = {}

const saveConfig = () => {
    Object.entries(configTemp).forEach(([key,value]) => {
        userPreferences[key]= value
    })
    saveUserPreferences()
}

export default function viewMusic() {
    configTemp = { ...userPreferences }
    console.log(configTemp);
    const music_screen = document.createElement('div')
    music_screen.className = "telas-wrapper"
    music_screen.innerHTML = `
    <fieldset>
        <legend>Música</legend>
            <div class="line">
                Música: <div class="check" id="music" data-value="${userPreferences.music}"></div>
            </div>
            <div class="line">
                Volume: <input type="range" id="volume"  min="0" max="100" value="${userPreferences.musicVolume * 100}">
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
    container.appendChild(music_screen)

    get('music').onclick = event => {
        const value = event.target.dataset.value === "true"
        event.target.dataset.value = !value
        configTemp.music = !value
    }

    get('volume').onchange = event => {
        const { value } = event.target
        configTemp.musicVolume = value/100
    }

    const buttons = music_screen.querySelectorAll('button')
    buttons.forEach( button => {
        button.onclick = event => {
            const { value } = event.target
            if(value == "1"){
                saveConfig()
            }
            container.removeChild(music_screen)
        }
    })
}