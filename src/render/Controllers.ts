import { game } from "./Game"
import { screens } from "./ScreenManager"
import { range } from "./Util"

//#region Move Blocks


const rotate = () => {
    const { blocks, x, y } = game.atualFigure
    const newFigure = []

    for (const block of range(0, blocks[0].length)) {
        const newLine = []
        for (const line of range(0, blocks.length)) {
            newLine.unshift(blocks[line][block])
        }
        newFigure.push(newLine)
    }

    const widthDifference = blocks.length - newFigure.length

    const haveBlocksOnRight = x + newFigure[0].length > game.width || newFigure.some((line, indexY) => {
        if (line[line.length - 1].type == "null") {
            return false
        }

        const increment = widthDifference > 0 ? widthDifference : 0

        return line.some((block, indexX) => {
            return game.state.isBlock({
                x: x + newFigure.length + increment - indexX,
                y: y + indexY
            })
        })
    })

    const haveBlocksOnLeft = x - widthDifference < 0 || newFigure.some((line, indexY) => {
        if (line[0].type === "null") {
            return false
        }

        const decrement = widthDifference > 0 ? widthDifference : 0

        return line.some((block, indexX) => {
            return game.state.isBlock({
                x: x - decrement + indexX,
                y: y + indexY
            })
        })
    })

    let newX = x

    if (haveBlocksOnRight) {
        console.log(haveBlocksOnLeft)
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

            return game.state.isBlock({
                x: newX + indexX,
                y: y + indexY + 1
            })
        })
    })

    if (!haveBlocksOnDown) {
        game.atualFigure.x = newX
        game.atualFigure.blocks = newFigure
    }
}

//#endregion

const keyDownFunctions = {
    "ArrowLeft": () => game.move("left"),
    "ArrowRight": () => game.move("right"),
    "ArrowDown": () => game.accelerate(),
    "s": () => game.accelerate(),
    "a": () => game.move("left"),
    "d": () => game.move("right"),
    'r': rotate,
    ' ': () => game.dropFigure(),
    'Escape': () => game.pause(),
}


window.onload = () => {
    screens.game.show(false)
    screens.init.show()
}

export const mainKeyDown = (event: KeyboardEvent) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
    keyDownFunctions[key as keyof typeof keyDownFunctions]?.()
}