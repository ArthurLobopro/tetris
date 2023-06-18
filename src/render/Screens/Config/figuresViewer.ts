import { ThemeSchema } from "../../../storage/StoreSchemas"
import { Figures, figureName } from "../../Figures"
import { game } from "../../Game"
import { range } from "../../Util"

export class FiguresViewer {
    declare colors: ThemeSchema
    declare changeFigureCallback: () => void
    declare atualFigure: figureName
    declare figuresNames: figureName[]

    declare viewer: HTMLDivElement
    declare viewerCanvas: HTMLCanvasElement
    declare ctx: CanvasRenderingContext2D

    constructor(colors: ThemeSchema, changeFigureCallback?: () => void) {
        this.colors = colors
        this.changeFigureCallback = changeFigureCallback ?? function () { }
        this.build()

        this.atualFigure = "square"
        this.renderFigure(this.atualFigure)

        this.figuresNames = Figures.getFigureNames()
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

        type key = keyof typeof keyBoardFunctions

        window.onkeydown = (event) => keyBoardFunctions[event.key as key]?.()

        const rightButton = viewer.querySelector("#right") as HTMLImageElement
        const leftButton = viewer.querySelector("#left") as HTMLImageElement

        rightButton.onclick = keyBoardFunctions.ArrowRight
        leftButton.onclick = keyBoardFunctions.ArrowLeft

        this.ctx = viewerCanvas.getContext('2d') as CanvasRenderingContext2D
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

    renderFigure(figureName: figureName) {
        const [width, height] = [8, 8]

        this.renderBasic()

        const blocks = Figures.getByName(figureName)

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
        this.atualFigure = this.figuresNames[
            figureIndex + 1 >= this.figuresNames.length ?
                0 : figureIndex + 1
        ]

        this.renderFigure(this.atualFigure)
        this?.changeFigureCallback()
    }

    previousFigure() {
        const figureIndex = this.figuresNames.indexOf(this.atualFigure)
        this.atualFigure = this.figuresNames[
            figureIndex === 0 ? this.figuresNames.length - 1 : figureIndex - 1]

        this.renderFigure(this.atualFigure)
        this.changeFigureCallback()
    }

    setColors(newColors: ThemeSchema) {
        this.colors = newColors
        this.renderFigure(this.atualFigure)
    }

    getAtualFigureName() {
        return this.atualFigure
    }
}