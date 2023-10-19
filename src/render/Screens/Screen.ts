import { Game } from "../Game/Game"
import { ScreenManager } from "../ScreenManager"
import { CreateNavigation } from "./navigation"

const container = document.getElementById("container") as HTMLElement

export abstract class Screen {
    declare screen: HTMLElement

    abstract build(): HTMLElement

    onKeyDown(event: KeyboardEvent) { }

    reset() {
        this.screen = this.build()
    }

    show() {
        container.appendChild(this.screen)
        this.focus()
    }

    hide() {
        this.screen.remove()
    }

    focus() {
        ScreenManager.instance.setScreen(this)
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

export abstract class DynamicNavigableScreen extends DynamicScreen {
    onKeyDown(event: KeyboardEvent): void {
        CreateNavigation(this.screen)(event)
    }
}
export abstract class DynamicGameBasedNavigableScreen extends DynamicGameBasedScreen {
    onKeyDown(event: KeyboardEvent): void {
        CreateNavigation(this.screen)(event)
    }
}