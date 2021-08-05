import { game, playGame, collision, addToState, spawnNewFigure } from "./Game.js"

const acelerate = () => {
    if(!game.moveLock && !collision()){
        game.atualFigure.y++
        if(collision()){
            addToState()
            spawnNewFigure()
        }
        game.moveLock = true
        setTimeout(() => game.moveLock = false, 100);
    }
}

const returnNormalVel = () => {
    
}



const keyDownFunctions = {
    "ArrowLeft": () => game.move("left"),
    "ArrowRight": () => game.move("right"),
    "a": () => game.move("left"),
    "d": () => game.move("right")
}

const keyPressFunctions = {
    "ArrowDown": acelerate,
    "s": acelerate
}

const keyUpFunctions = {
    "ArrowDown": returnNormalVel,
    "s": returnNormalVel
}

window.onkeypress = event => {
    keyPressFunctions[event.key]?.()
}

window.onkeyup = event => {
    keyUpFunctions[event.key]?.()
}

window.onkeydown = event => {
    keyDownFunctions[event.key]?.()
}

onload = () => console.log(game.state);