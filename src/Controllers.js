import { game, collision, playGame } from "./Game.js"
import { range } from "./Util.js"

const acelerate = () => {
    if (!game.moveLock && !collision()) {
        playGame()
        game.moveLock = true
        setTimeout(() => game.moveLock = false, 100)
    }
}

const rotate = () => {
    // if(game.moveLock) return
    const { figure, x, y } = game.atualFigure
    const newFigure = []

    for (const block of range(0, figure[0].length)) {
        const newLine = []
        for (const line of range(0, figure.length)) {
            newLine.unshift(figure[line][block])
        }
        newFigure.push(newLine)
    }

    const widthDifference = figure.length - newFigure.length
    
    const haveBlocksOnRight = x + newFigure[0].length > game.width || newFigure.some( (line, indexY) => {
        if(line[line.length - 1].type == "null"){
            return false
        }

        const increment = widthDifference > 0 ? widthDifference : 0

        return line.some( (block, indexX) => {
            return game.state[y + indexY]?.[x + newFigure.length +  increment - indexX]?.type === "block"
        })
    })

    const haveBlocksOnLeft = x - widthDifference < 0 || newFigure.some( (line, indexY) => {
        if (line[0].type === "null") {
            return false
        }

        const decrement = widthDifference > 0 ? widthDifference : 0

        return line.some( (block, indexX) => {
            return game.state[y + indexY]?.[x - decrement + indexX]?.type === "block"
        })
    })

    if (haveBlocksOnRight) {
        console.log(haveBlocksOnLeft);
        if(!haveBlocksOnLeft){
            game.atualFigure.x -= widthDifference
        }else{
            return
        }
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