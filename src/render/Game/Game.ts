import { PreferencesSchema } from "../../storage/StoreSchemas"
import { GameDataController as GameData } from "../../storage/controllers/GameData"
import { UserPreferencesController as UserPreferences } from "../../storage/controllers/UserPreferences"
import { Audios } from "../Audio"
import { Interval } from "../Interval"
import "../KeyboardController"
import { CreateKeyDownHandler } from "../KeyboardController"
import { ScreenManager } from "../ScreenManager"
import { formatPoints } from "../Util"
import { GameController } from "./GameController"
import { GameFigures } from "./GameFigures"
import { GameRenderer } from "./GameRenderer"
import { GameState } from "./GameState"

export class Game {
    height = 30
    width = 15
    squareWidth = 16
    pointsPerBlock = 10

    lastPontuation = 0
    _points = 0
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
    declare isMusicOn: boolean
    declare _velocity: keyof typeof this.velocities
    declare figures: GameFigures
    declare renderInterval: Interval
    declare fallInterval: Interval
    declare state: GameState
    declare controller: GameController
    declare renderer: GameRenderer
    declare screenManager: ScreenManager

    get velocity() {
        return this._velocity
    }

    set velocity(value: keyof typeof this.velocities) {
        this._velocity = value
        this.fallInterval && (this.fallInterval.rate = this.velocities[value])
    }

    get points() {
        return this._points
    }

    set points(points: number) {
        this._points = points
        try {
            this.screen.points_span.innerText = formatPoints(this.points)
        } catch (error) { }
    }

    get screen() {
        return ScreenManager.screens.game
    }

    get keyDownFunctions() {
        return {
            "ArrowLeft": () => this.controller.move("left"),
            "ArrowRight": () => this.controller.move("right"),
            "ArrowDown": () => this.controller.accelerate(),
            "s": () => this.controller.accelerate(),
            "a": () => this.controller.move("left"),
            "d": () => this.controller.move("right"),
            'r': () => this.controller.rotate(),
            ' ': () => this.controller.dropFigure(),
            'Escape': () => this.pause(),
        }
    }

    constructor() {
        this.loadUserPreferences()

        this.state = new GameState(this)
        this.figures = new GameFigures(this)
        this.controller = new GameController(this)
        this.renderer = new GameRenderer(this)
        this.screenManager = new ScreenManager(this)

        this.reset()
    }

    init() {
        this.screenManager.screens.init.show(true)
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
        this.controller.reset()
        this.isMusicOn = false
        this.state.resetState()
        this.velocity = UserPreferences.velocity
        this.lastPontuation = GameData.lastPontuation
        this.figures.spawnFigure()
    }

    addPoints(points: number) {
        this.points += points
    }

    newGame() {
        this.lastPontuation = this.points
        this.points = 0
        this.screen.points_span.innerText = formatPoints(this.points)
        this.screen.last_points_span.innerText = formatPoints(this.lastPontuation)

        this.reset()
        this.status = "active"

        this.renderer.render()

        window.onkeydown = CreateKeyDownHandler(this.keyDownFunctions)

        this.fallInterval = new Interval({
            callback: () => this.tick(),
            rate: this.velocities[this.velocity]
        })

        this.renderInterval = new Interval({
            callback: () => this.renderer.render(),
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

    tick() {
        if (!this.controller.collision() && this.status == "active") {
            this.figures.down()
        } else if (this.figures.atualFigure.y <= 0) {
            this.gameOver()
        } else {
            this.figures.addFigurePoints()
            this.state.addFigureToState()
            this.figures.spawnFigure()
        }
    }

    pause() {
        window.onkeydown = CreateKeyDownHandler(this.keyDownFunctions)
        this.fallInterval.stop()
        this.status = "paused"
        ScreenManager.screens.pause.show()
        if (this.isMusicOn) {
            Audios.theme.pause()
        }
    }

    continueGame() {
        this.status = "active"
        this.fallInterval.start()
        window.onkeydown = CreateKeyDownHandler(this.keyDownFunctions)
        if (this.isMusicOn) {
            Audios.theme.play()
        }
    }

    gameOver() {
        this.fallInterval.stop()
        this.renderInterval.stop()
        this.verifyRecords()
        GameData.lastPontuation = this.points
        ScreenManager.screens.gameOver.show()
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
}