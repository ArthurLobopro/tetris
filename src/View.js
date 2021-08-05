import { game } from './Game.js'
import { range } from './Util.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const drawBackground = () => {
    ctx.fillStyle = '#1E1E1E'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

const drawLines = () => {
    const { width, height, squareWidth } = game

    ctx.fillStyle = '#bbb'
    
    for(let i of range(1, width)){
        ctx.fillRect(i * squareWidth + (i - 1), 0, 1, canvas.height)
    }

    for(let i of range(1, height)){
        ctx.fillRect(0, i * squareWidth + (i - 1), canvas.width, 1)
    }
}

const drawSquares = () => {
    const { state, squareWidth } = game
    state.forEach( (line, indexY) => {
        line.forEach( (block, indexX) => {
            const color = block.type === "null" ? "#1e1e1e" : block.color

            ctx.fillStyle = color
            ctx.fillRect(indexX * squareWidth + (1 * indexX), indexY * squareWidth + (1 * indexY), squareWidth, squareWidth)
            
        })

    })
}

const drawAtualFigure = () => {
    const { squareWidth } = game
    const { x, y , figure, color } = game.atualFigure

    ctx.fillStyle = color
    
    figure.forEach( ( line, indexY ) => {
        line.forEach( (block, indexX) => {
            ctx.fillRect(
                ( x + indexX) * squareWidth + (1 * x + indexX),
                ( y + indexY ) * squareWidth + (1 * y + indexY),
                squareWidth, squareWidth
            )
        })
    })
}

const renderAll = () => {
    drawBackground()
    drawLines()
    drawSquares()
    drawAtualFigure()
}

export { renderAll }