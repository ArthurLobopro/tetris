import ConfigScreen from "./Screens/Config.js";
import InitScreen from "./Screens/Init.js";
import GameOverScrenn from "./Screens/GameOver.js";
import PauseScreen from "./Screens/Pause.js";
import { GameScreen } from "./Screens/GameScreen.js";
import MusicConfigScreen from "./Screens/Config/Music.js";
import VelocityConfigScreen from "./Screens/Config/Velocity.js";
import ThemeConfigScreen from "./Screens/Config/Theme.js";
import CustomThemeConfigScreen from "./Screens/Config/CustomTheme.js"

const screens = {
    config: new ConfigScreen(),
    init: new InitScreen(),
    gameOver: new GameOverScrenn(),
    pause: new PauseScreen(),
    game: new GameScreen(),
    
    configScrenns: {
        music: new MusicConfigScreen(),
        velocity: new VelocityConfigScreen(),
        theme: new ThemeConfigScreen(),
        customTheme: new CustomThemeConfigScreen()
    }
}

const { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx, last_points_span, points_span } = screens.game.getComponents()

export { gameScreen, gameCanvas, gameCtx, nextCanvas, nextCtx, screens, last_points_span,points_span }