import { game, collision, playGame, pause } from "./Game.js"
import { range } from "./Util.js"

//#region Move Blocks
const accelerate = () => {
    if (!game.moveLock && !collision()) {
        playGame()
        game.moveLock = true
        setTimeout(() => game.moveLock = false, game.gameplayVelocity / 2)
    }
}

const rotate = () => {
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

    const haveBlocksOnRight = x + newFigure[0].length > game.width || newFigure.some((line, indexY) => {
        if (line[line.length - 1].type == "null") {
            return false
        }

        const increment = widthDifference > 0 ? widthDifference : 0

        return line.some((block, indexX) => {
            return game.state[y + indexY]?.[x + newFigure.length + increment - indexX]?.type === "block"
        })
    })

    const haveBlocksOnLeft = x - widthDifference < 0 || newFigure.some((line, indexY) => {
        if (line[0].type === "null") {
            return false
        }

        const decrement = widthDifference > 0 ? widthDifference : 0

        return line.some((block, indexX) => {
            return game.state[y + indexY]?.[x - decrement + indexX]?.type === "block"
        })
    })

    let newX = x

    if (haveBlocksOnRight) {
        console.log(haveBlocksOnLeft);
        if (!haveBlocksOnLeft) {
            newX = x - widthDifference
        } else {
            return
        }
    }

    const haveBlocksOnDown = newFigure.some((line, indexY) => {
        return line.some((block, indexX) => {
            if (block.type === "null") {
                return false
            }

            return game.state[y + indexY + 1][newX + indexX].type === 'block'
        })
    })

    if (!haveBlocksOnDown) {
        game.atualFigure.x = newX
        game.atualFigure.figure = newFigure
    }
}

const downFigure = () => {
    while (!collision()) {
        playGame()
    }
}
//#endregion

const keyDownFunctions = {
    "ArrowLeft": () => game.move("left"),
    "ArrowRight": () => game.move("right"),
    "ArrowDown": accelerate,
    "a": () => game.move("left"),
    "d": () => game.move("right"),
    'r': rotate,
    ' ': downFigure,
    'Escape': async () => await pause()
}

const keyPressFunctions = {
    "s": accelerate
}

const mainKeyPress = event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
    keyPressFunctions[key]?.()
}

const mainKeyDown = event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
    keyDownFunctions[key]?.()
}

export { mainKeyDown, mainKeyPress }