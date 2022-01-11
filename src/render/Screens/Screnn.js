import navigation from "./navigation.js"

const container = document.getElementById("container")

export class Screen {
    
    addNavigation() {
        window.onkeydown = event => navigation[event.key]?.(this.screen)
    }

    reset() {
        this.screen = this.buildFunction()
    }

    show() {
        container.appendChild(this.screen)
        this.addNavigation()
    }

    hide() {
        container.removeChild(this.screen)
    }

    close() {
        this.hide()
        this.reset()
    }
}