import ConfigScreen from "./Screens/Config.js";
import InitScreen from "./Screens/Init.js";
import GameOverScrenn from "./Screens/GameOver.js";
import PauseScreen from "./Screens/Pause.js";
import { viewGameScreen } from "./Screens/GameScreen.js";
import MusicConfigScreen from "./Screens/Config/Music.js";

const container = document.getElementById("container")

const { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx } = viewGameScreen()
container.appendChild(gameScreen)

const screens = {
    config: new ConfigScreen(),
    init: new InitScreen(),
    gameOver: new GameOverScrenn(),
    pause: new PauseScreen(),
    configScrenns: {
        music: new MusicConfigScreen(),
    }
}

export { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx, screens }