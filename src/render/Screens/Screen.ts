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
        if (navigation) {
            this.addNavigation()
        }
    }

    hide() {
        container.removeChild(this.screen)
    }

    close() {
        this.hide()
        this.reset()
    }
}

export abstract class ConfigScreenBase extends Screen {
    constructor() {
        super()
    }

    show() {
        this.reset()
        super.show()
    }
}