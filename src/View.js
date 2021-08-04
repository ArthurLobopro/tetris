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

//Temp
const controlSquares = () => {
    const { squareWidth } = game
    //Quadrados nos cantos
    ctx.fillStyle = '#f55c47'
    ctx.fillRect(0,0,squareWidth,squareWidth)
    ctx.fillRect(canvas.width - squareWidth, 0, squareWidth, squareWidth)
    ctx.fillRect(0,canvas.height - squareWidth,squareWidth,squareWidth)
    ctx.fillRect(canvas.width - squareWidth, canvas.height - squareWidth, squareWidth, squareWidth)
}

const drawSquares = () => {
    const { state, squareWidth } = game
    state.forEach( (line, indexY) => {
        line.forEach( (block, indexX) => {
            const color = block.type === "null" ? "#1e1e1e" : block.color

            ctx.fillStyle = color
            console.log(`Index Y: ${indexY}\nIndex X: ${indexX}`);
            ctx.fillRect(indexX * squareWidth + (1 * indexX), indexY * squareWidth + (1 * indexY), squareWidth, squareWidth)
            
        })

    })
}

const renderAll = () => {
    drawBackground()
    drawLines()
    drawSquares()
    controlSquares()
}

export { renderAll }