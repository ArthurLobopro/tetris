import { viewGameScreen } from "./Screens/GameScreen.js";

const container = document.getElementById("container")

const { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx } = viewGameScreen()
container.appendChild(gameScreen)

export { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx }