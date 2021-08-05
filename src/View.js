import { game } from './Game.js'
import { range } from './Util.js'

const gameCanvas = document.querySelector('canvas#game')
const gameCtx = gameCanvas.getContext('2d')

const nextCanvas = document.getElementById('next')
const nextCtx = nextCanvas.getContext('2d')


const drawNextFigure = () => {
    const { squareWidth } = game
    const { width, height } = game.nextCanvasSize
    const { figure, color } = game.nextFigure

    const x = Math.trunc(width / 2 - figure[0].length / 2)
    const y = Math.trunc(height / 2 - figure.length / 2)

    figure.forEach((line, indexY) => {
        line.forEach((block, indexX) => {
            if (block.type === 'block') {
                nextCtx.fillStyle = color
                nextCtx.fillRect(
                    (x + indexX) * squareWidth + (1 * x + indexX),
                    (y + indexY) * squareWidth + (1 * y + indexY),
                    squareWidth, squareWidth
                )
            }
        })
    })
}

const drawNextLines = () => {
    const { squareWidth } = game
    const { width, height } = game.nextCanvasSize

    nextCtx.fillStyle = '#aaa'

    for (let i of range(1, width)) {
        nextCtx.fillRect(i * squareWidth + (i - 1), 0, 1, nextCanvas.height)
    }

    for (let i of range(1, height)) {
        nextCtx.fillRect(0, i * squareWidth + (i - 1), nextCanvas.width, 1)
    }
}

const drawNextBackground = () => {
    nextCtx.fillStyle = '#1E1E1E'
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height)
}

const drawBackground = () => {
    gameCtx.fillStyle = '#1E1E1E'
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
}

const drawLines = () => {
    const { width, height, squareWidth } = game

    gameCtx.fillStyle = '#aaa'

    for (let i of range(1, width)) {
        gameCtx.fillRect(i * squareWidth + (i - 1), 0, 1, gameCanvas.height)
    }

    for (let i of range(1, height)) {
        gameCtx.fillRect(0, i * squareWidth + (i - 1), gameCanvas.width, 1)
    }
}

const drawSquares = () => {
    const { state, squareWidth } = game
    state.forEach((line, indexY) => {
        line.forEach((block, indexX) => {
            const color = block.type === "null" ? "#1e1e1e" : block.color

            gameCtx.fillStyle = color
            gameCtx.fillRect(indexX * squareWidth + (1 * indexX), indexY * squareWidth + (1 * indexY), squareWidth, squareWidth)

        })

    })
}

const drawAtualFigure = () => {
    const { squareWidth } = game
    const { x, y, figure, color } = game.atualFigure

    figure.forEach((line, indexY) => {
        line.forEach((block, indexX) => {
            if (block.type === 'block') {
                gameCtx.fillStyle = color
                gameCtx.fillRect(
                    (x + indexX) * squareWidth + (1 * x + indexX),
                    (y + indexY) * squareWidth + (1 * y + indexY),
                    squareWidth, squareWidth
                )
            }
        })
    })
}

const renderAll = () => {
    // Main game
    drawBackground()
    drawLines()
    drawSquares()
    drawAtualFigure()

    //Next figure
    drawNextBackground()
    drawNextLines()
    drawNextFigure()
}

export { renderAll }