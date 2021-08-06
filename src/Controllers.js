import { game, collision, addToState, spawnNewFigure, playGame } from "./Game.js"
import { range } from "./Util.js"

const acelerate = () => {
    if (!game.moveLock && !collision()) {
        game.atualFigure.y++
        if (collision()) {
            addFigurePoints()
            addToState()
            spawnNewFigure()
        }
        game.moveLock = true
        setTimeout(() => game.moveLock = false, 100)
    }
}

const rotate = () => {
    const { figure } = game.atualFigure
    const newFigure = []

    for (const block of range(0, figure[0].length)) {
        const newLine = []
        for (const line of range(0, figure.length)) {
            newLine.unshift(figure[line][block])
        }
        newFigure.push(newLine)
    }

    game.atualFigure.figure = newFigure
}

const downFigure = () => {
    while (!collision()) {
        playGame()
    }
}

const keyDownFunctions = {
    "ArrowLeft": () => game.move("left"),
    "ArrowRight": () => game.move("right"),
    "a": () => game.move("left"),
    "d": () => game.move("right"),
    'r': rotate,
    ' ': downFigure
}

const keyPressFunctions = {
    "ArrowDown": acelerate,
    "s": acelerate
}

window.onkeypress = event => {
    keyPressFunctions[event.key]?.()
}

window.onkeydown = event => {
    keyDownFunctions[event.key]?.()
}

onload = () => console.log(game.state);