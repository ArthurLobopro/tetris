import { Game } from "../Game/Game"
import { ScreenManager } from "../ScreenManager"
import navigation from "./navigation"

const container = document.getElementById("container") as HTMLElement

type key = keyof typeof navigation

export abstract class Screen {
    declare screen: HTMLElement

    abstract build(): HTMLElement

    addNavigation() {
        window.onkeydown = event => navigation[event.key as key]?.(this.screen)
    }

    removeNavigation() {
        window.onkeydown = null
    }

    reset() {
        this.screen = this.build()
    }

    show(navigation = true) {
        container.appendChild(this.screen)
        ScreenManager.instance.setScreen(this)
        if (navigation) {
            this.addNavigation()
        }
    }

    hide() {
        this.screen.remove()
    }

    close() {
        this.hide()
        this.reset()
    }
}

export abstract class GameBasedScreen extends Screen {
    protected game: Game

    constructor(game: Game) {
        super()
        this.game = game
    }
}

export abstract class DynamicScreen extends Screen {
    show() {
        this.reset()
        super.show()
    }
}

export abstract class DynamicGameBasedScreen extends DynamicScreen {
    protected game: Game

    constructor(game: Game) {
        super()
        this.game = game
    }
}