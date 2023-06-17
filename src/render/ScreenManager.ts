import { AboutScreen } from "./Screens/About"
import { ConfigScreen } from "./Screens/Config"
import { CustomThemeConfigScreen } from "./Screens/Config/CustomTheme"
import { MusicConfigScreen } from "./Screens/Config/Music"
import { ThemeConfigScreen } from "./Screens/Config/Theme"
import { VelocityConfigScreen } from "./Screens/Config/Velocity"
import { ControlsScreen } from "./Screens/Controls"
import { GameOverScreen } from "./Screens/GameOver"
import { gameScreen } from "./Screens/GameScreen"
import { InitScreen } from "./Screens/Init"
import { PauseScreen } from "./Screens/Pause"

const screens = {
    config: new ConfigScreen(),
    init: new InitScreen(),
    gameOver: new GameOverScreen(),
    pause: new PauseScreen(),
    game: gameScreen,
    about: new AboutScreen(),
    controls: new ControlsScreen(),
    configScreens: {
        music: new MusicConfigScreen(),
        velocity: new VelocityConfigScreen(),
        theme: new ThemeConfigScreen(),
        customTheme: new CustomThemeConfigScreen()
    }
}

export { screens }
