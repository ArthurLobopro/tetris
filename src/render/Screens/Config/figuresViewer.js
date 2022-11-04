import { game } from "../../Game.js"
import { range } from "../../Util.js"
import { figures } from "../../Figures.js"

export class FiguresViewer {
    constructor(colors, changeFigureCallback) {
        this.colors = colors
        this.changeFigureCallback = changeFigureCallback ?? function () { }
        this.build()

        this.atualFigure = "square"
        this.renderFigure(this.atualFigure)

        this.figuresNames = figures.getFigureNames()
    }

    build() {
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

        const keyBoardFunctions = {
            "ArrowLeft": () => this.previousFigure(),
            "ArrowRight": () => this.nextFigure()
        }

        window.onkeydown = event => keyBoardFunctions[event.key]?.()

        const rightButton = viewer.querySelector("#right")
        const leftButton = viewer.querySelector("#left")

        rightButton.onclick = keyBoardFunctions.ArrowRight
        leftButton.onclick = keyBoardFunctions.ArrowLeft

        this.ctx = viewerCanvas.getContext('2d')
        this.viewer = viewer
        this.viewerCanvas = viewerCanvas
    }

    renderBasic() {
        const [width, height] = [8, 8]
        const { squareWidth } = game

        //Background
        this.ctx.fillStyle = this.colors.background
        this.ctx.fillRect(0, 0, this.viewerCanvas.width, this.viewerCanvas.height)

        //Lines
        this.ctx.fillStyle = this.colors.lines

        for (let i of range(1, width)) {
            this.ctx.fillRect(i * squareWidth + (i - 1), 0, 1, this.viewerCanvas.height)
        }

        for (let i of range(1, height)) {
            this.ctx.fillRect(0, i * squareWidth + (i - 1), this.viewerCanvas.width, 1)
        }
    }

    renderFigure(figureName) {
        const [width, height] = [8, 8]

        this.renderBasic()

        const blocks = figures.getByName(figureName)

        const x = Math.trunc(width / 2 - blocks[0].length / 2)
        const y = Math.trunc(height / 2 - blocks.length / 2)

        const color = this.colors.figures[figureName]

        blocks.forEach((line, indexY) => {
            line.forEach((block, indexX) => {
                if (block.type === 'block') {
                    this.ctx.fillStyle = color
                    this.ctx.fillRect(
                        (x + indexX) * game.squareWidth + (1 * x + indexX),
                        (y + indexY) * game.squareWidth + (1 * y + indexY),
                        game.squareWidth, game.squareWidth
                    )
                }
            })
        })
    }

    nextFigure() {
        const figureIndex = this.figuresNames.indexOf(this.atualFigure)
        this.atualFigure = this.figuresNames[figureIndex + 1 === this.figuresNames.length ? 0 : figureIndex + 1]
        this.renderFigure(this.atualFigure)

        this.changeFigureCallback()
    }

    previousFigure() {
        const figureIndex = this.figuresNames.indexOf(this.atualFigure)
        this.atualFigure = this.figuresNames[figureIndex === 0 ? this.figuresNames.length - 1 : figureIndex - 1]
        this.renderFigure(this.atualFigure)
        this.changeFigureCallback()
    }

    setColors(newColors) {
        this.colors = newColors
        this.renderFigure(this.atualFigure)
    }

    getAtualFigureName() {
        return this.atualFigure
    }
}