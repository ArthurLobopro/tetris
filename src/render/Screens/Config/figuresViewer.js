import { game } from "../../Game.js"
import { range } from "../../Util.js"
import { figures } from "../../Figures.js"

export default function buildFiguresViewer(colors, changeFigureCallback) {
    const [width, height] = [8, 8]

    const viewerCanvas = document.createElement("canvas")
    viewerCanvas.width = game.squareWidth * 8 + 7
    viewerCanvas.height = game.squareWidth * 8 + 7

    const viewer = document.createElement('div')
    viewer.id = "theme-viewer"
    viewer.innerHTML = `
        <div id="arrows">
            <img src="../assets/arrow.png" width="20px" id="left">
            <img src="../assets/arrow.png" width="20px" style="transform: rotate(180deg)" id="right">
        </div>
    `

    viewer.insertBefore(viewerCanvas, viewer.querySelector('div'))


    const ctx = viewerCanvas.getContext('2d')

    function renderBasic() {
        const { squareWidth } = game

        //Background
        ctx.fillStyle = colors.background
        ctx.fillRect(0, 0, viewerCanvas.width, viewerCanvas.height)

        //Lines
        ctx.fillStyle = colors.lines

        for (let i of range(1, width)) {
            ctx.fillRect(i * squareWidth + (i - 1), 0, 1, viewerCanvas.height)
        }

        for (let i of range(1, height)) {
            ctx.fillRect(0, i * squareWidth + (i - 1), viewerCanvas.width, 1)
        }
    }

    function renderFigure(figureName) {
        renderBasic()

        const blocks = figures.getByName(figureName)

        const x = Math.trunc(width / 2 - blocks[0].length / 2)
        const y = Math.trunc(height / 2 - blocks.length / 2)

        const color = colors.figures[figureName]

        blocks.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                if (block.type === 'block') {
                    ctx.fillStyle = color
                    ctx.fillRect(
                        (x + indexX) * game.squareWidth + (1 * x + indexX),
                        (y + indexY) * game.squareWidth + (1 * y + indexY),
                        game.squareWidth, game.squareWidth
                    )
                }
            })
        })
    }

    let atualFigure = "square"
    renderFigure(atualFigure, colors)

    const rightButton = viewer.querySelector("#right")
    const leftButton = viewer.querySelector("#left")

    const figuresNames = figures.getFigureNames()

    function nextFigure() {
        const figureIndex = figuresNames.indexOf(atualFigure)
        atualFigure = figuresNames[figureIndex + 1 === figuresNames.length ? 0 : figureIndex + 1]
        renderFigure(atualFigure, colors)
        if(typeof changeFigureCallback == 'function'){
            changeFigureCallback()
        }
    }

    function previousFigure() {
        const figureIndex = figuresNames.indexOf(atualFigure)
        atualFigure = figuresNames[figureIndex === 0 ? figuresNames.length - 1 : figureIndex - 1]
        renderFigure(atualFigure, colors)
        if(typeof changeFigureCallback == 'function'){
            changeFigureCallback()
        }
    }

    rightButton.onclick = nextFigure
    leftButton.onclick = previousFigure

    const keyBoardFunctions = {
        "ArrowLeft": previousFigure,
        "ArrowRight": nextFigure
    }

    window.onkeydown = event => keyBoardFunctions[event.key]?.()

    function setColors(newColors) {
        colors = newColors
        renderFigure(atualFigure)
    }

    function getAtualFigureName(){
        return atualFigure
    }

    return { viewer, setColors, getAtualFigureName, renderFigure }
}