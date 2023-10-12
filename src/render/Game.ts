import { PreferencesSchema } from "../storage/StoreSchemas"
import { GameDataController as GameData } from "../storage/controllers/GameData"
import { UserPreferencesController as UserPreferences } from "../storage/controllers/UserPreferences"
import { Audios } from "./Audio"
import "./Controllers"
import { mainKeyDown } from "./Controllers"
import { Figures } from "./Figures"
import { GameState } from "./GameState"
import { Interval } from "./Interval"
import { screens } from "./ScreenManager"
import { formatPoints } from "./Util"
import { renderAll } from "./View"

type spawnedFigure = { x: number, y: number } & ReturnType<typeof Figures.random>

export class Game {
    height = 30
    width = 15
    squareWidth = 16
    pointsPerBlock = 10

    lastPontuation = 0
    points = 0
    records: { points: number }[] = []

    velocities = {
        slow: 2, //500ms
        normal: 3.5, //300ms
        fast: 6.5 //150ms
    }

    nextCanvasSize = {
        height: 6,
        width: 6
    }

    declare userPreferences: PreferencesSchema
    declare status: "active" | "paused" | "inactive"
    declare moveLock: boolean
    declare isMusicOn: boolean
    declare _velocity: keyof typeof this.velocities
    declare atualFigure: spawnedFigure
    declare nextFigure: ReturnType<typeof Figures.random>
    declare renderInterval: Interval
    declare fallInterval: Interval
    declare screen: typeof screens["game"]
    declare state: GameState

    get velocity() {
        return this._velocity
    }

    set velocity(value: keyof typeof this.velocities) {
        this._velocity = value
        this.fallInterval && (this.fallInterval.rate = this.velocities[value])
    }

    //#region Contructor methods
    constructor() {
        this.state = new GameState(this)
        this.reset()
        this.loadUserPreferences()
        this.screen = screens.game

        this.screen.gameCanvas.width = (this.width * this.squareWidth) + this.width - 1
        this.screen.gameCanvas.height = (this.height * this.squareWidth) + this.height - 1

        this.screen.nextCanvas.width = (this.squareWidth * this.nextCanvasSize.width) + this.nextCanvasSize.width - 1
        this.screen.nextCanvas.height = (this.squareWidth * this.nextCanvasSize.height) + this.nextCanvasSize.height - 1
    }

    loadUserPreferences() {
        this.records = GameData.records
        this.userPreferences = UserPreferences.get()
        this.lastPontuation = GameData.lastPontuation
    }

    reloadConfig() {
        if (this.isMusicOn !== UserPreferences.music) {
            this.isMusicOn = UserPreferences.music
            Audios.theme.currentTime = 0
            Audios.theme.loop = true
        }
        Audios.theme.volume = UserPreferences.musicVolume
    }

    reset() {
        this.status = "inactive"
        this.moveLock = false
        this.isMusicOn = false
        this.state.resetState()
        this.velocity = UserPreferences.velocity
        this.lastPontuation = GameData.lastPontuation
        this.spawnFirstFigure()
        this.spawnNextFigure()
    }
    //#endregion

    //#region Figure methods

    centerFigure() {
        this.atualFigure.x = Math.trunc(this.width / 2 - this.atualFigure.blocks[0].length / 2)
    }

    spawnFirstFigure() {
        this.atualFigure = {
            y: 0,
            x: 0,
            ...Figures.random()
        }
        this.centerFigure()
    }

    spawnNextFigure() {
        this.nextFigure = {
            ...Figures.random()
        }
    }

    spawnFigure() {
        const nextFigure = this.nextFigure
        this.atualFigure = {
            y: 0,
            x: 0,
            ...nextFigure
        }
        this.atualFigure.y = -this.atualFigure.blocks.length + 1
        this.centerFigure()
        this.spawnNextFigure()
    }
    //#endregion

    //#region Game State
    addFigurePoints() {
        const { blocks } = this.atualFigure

        let figureBlocks = 0

        blocks.forEach(line => {
            line.forEach(block => {
                if (block.type === 'block') {
                    figureBlocks++
                }
            })
        })

        this.points += figureBlocks * this.pointsPerBlock
    }

    addPoints(points: number) {
        this.points += points
    }

    //#endregion

    //#region Collision
    collision() {
        const { x, y, blocks } = this.atualFigure

        const bottomY = y + blocks.length

        if (bottomY === this.height) {
            return true
        }

        const colidBlock = blocks.some((line, indexY) => {
            return line.some((block, indexX) => {
                if (block.type === "null") {
                    return false
                }

                return this.state.isBlock({
                    y: y + indexY + 1,
                    x: x + indexX
                })
            })
        })

        return colidBlock
    }

    dropFigure() {
        while (!this.collision()) {
            this.tick()
        }
    }

    accelerate() {
        if (
            !this.moveLock && !this.collision()
            && this.status === "active"
        ) {
            this.tick()
            this.moveLock = true
            setTimeout(() => this.moveLock = false, 1000 / this.velocities[this.velocity])
        }
    }

    get haveBlocksOnRight() {
        const { y, x, blocks } = this.atualFigure

        return blocks.some((line, indexY) => {
            if (line[line.length - 1].type === "null") {
                return false
            }

            return this.state.isBlock({
                x: x + line.length,
                y: y + indexY
            })
        })
    }

    get haveBlocksOnLeft() {
        const { y, x, blocks } = this.atualFigure

        return blocks.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            return this.state.isBlock({
                x: x - 1,
                y: y + indexY
            })
        })
    }

    move(direction: "right" | "left") {
        if (this.moveLock) return

        const { x } = this.atualFigure

        if (
            direction === "right" && !this.haveBlocksOnRight && x + this.atualFigure.blocks[0].length <= 14
        ) {
            this.atualFigure.x++
        }

        if (direction === "left" && !this.haveBlocksOnLeft && x > 0) {
            this.atualFigure.x--
        }

        this.moveLock = true

        setTimeout(() => this.moveLock = false, 100)
    }

    //#endregion

    //#region Game methods
    newGame() {
        this.lastPontuation = this.points
        this.points = 0
        this.screen.points_span.innerText = formatPoints(this.points)
        this.screen.last_points_span.innerText = formatPoints(this.lastPontuation)

        this.reset()
        this.status = "active"

        renderAll()

        window.onkeydown = mainKeyDown

        this.fallInterval = new Interval({
            callback: this.tick.bind(this),
            rate: this.velocities[this.velocity]
        })

        this.renderInterval = new Interval({
            callback: renderAll,
            rate: 60
        })

        if (UserPreferences.music) {
            this.isMusicOn = true
            Audios.theme.currentTime = 0
            Audios.theme.volume = UserPreferences.musicVolume
            Audios.theme.play()
            Audios.theme.loop = true
        }
    }

    pause() {
        window.onkeydown = mainKeyDown
        this.fallInterval.stop()
        this.status = "paused"
        screens.pause.show()
        if (this.isMusicOn) {
            Audios.theme.pause()
        }
    }

    continueGame() {
        this.status = "active"
        this.fallInterval.start()
        window.onkeydown = mainKeyDown
        if (this.isMusicOn) {
            Audios.theme.play()
        }
    }

    gameOver() {
        this.fallInterval.stop()
        this.renderInterval.stop()
        this.verifyRecords()
        GameData.lastPontuation = this.points
        screens.gameOver.reset()
        screens.gameOver.show()
    }

    tick() {
        if (!this.collision() && this.status == "active") {
            this.atualFigure.y++
        } else if (this.atualFigure.y <= 0) {
            this.gameOver()
        } else {
            this.addFigurePoints()
            this.state.addFigureToState()
            this.spawnFigure()
        }
        this.screen.points_span.innerText = formatPoints(this.points)
    }

    verifyRecords() {
        const { points, records } = this
        const atualPointsIsNewRecord = records.some(record => record.points < points)
        if (atualPointsIsNewRecord) {
            this.records.pop()
            const newRecordIndex = records.findIndex(record => record.points < points)
            this.records.splice(newRecordIndex, 0, { points })
            GameData.records = this.records
        }
    }
    //#endregion
}

export const game = new Game()