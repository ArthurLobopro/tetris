import { game } from "./Game"
import { screens } from "./ScreenManager"

const keyDownFunctions = {
    "ArrowLeft": () => game.controller.move("left"),
    "ArrowRight": () => game.controller.move("right"),
    "ArrowDown": () => game.controller.accelerate(),
    "s": () => game.controller.accelerate(),
    "a": () => game.controller.move("left"),
    "d": () => game.controller.move("right"),
    'r': () => game.controller.rotate(),
    ' ': () => game.controller.dropFigure(),
    'Escape': () => game.pause(),
}

window.onload = () => {
    screens.game.show(false)
    screens.init.show()
}

export const mainKeyDown = (event: KeyboardEvent) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
    keyDownFunctions[key as keyof typeof keyDownFunctions]?.()
}