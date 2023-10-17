import { Game } from "./Game/Game"
import { AboutScreen } from "./Screens/About"
import { ConfigScreen } from "./Screens/Config"
import { CustomThemeConfigScreen } from "./Screens/Config/CustomTheme"
import { MusicConfigScreen } from "./Screens/Config/Music"
import { ThemeConfigScreen } from "./Screens/Config/Theme"
import { VelocityConfigScreen } from "./Screens/Config/Velocity"
import { ControlsScreen } from "./Screens/Controls"
import { GameOverScreen } from "./Screens/GameOver"
import { GameScreen } from "./Screens/GameScreen"
import { InitScreen } from "./Screens/Init"
import { PauseScreen } from "./Screens/Pause"
import { Screen } from "./Screens/Screen"

// const screens = {
//     config: new ConfigScreen(),
//     init: new InitScreen(),
//     gameOver: new GameOverScreen(),
//     pause: new PauseScreen(),
//     game: new GameScreen(),
//     about: new AboutScreen(),
//     controls: new ControlsScreen(),
//     configScreens: {
//         music: new MusicConfigScreen(),
//         velocity: new VelocityConfigScreen(),
//         theme: new ThemeConfigScreen(),
//         customTheme: new CustomThemeConfigScreen()
//     }
// }

interface Screens {
    config: ConfigScreen
    init: InitScreen
    gameOver: GameOverScreen
    pause: PauseScreen
    game: GameScreen
    about: AboutScreen
    controls: ControlsScreen
    configScreens: {
        music: MusicConfigScreen
        velocity: VelocityConfigScreen
        theme: ThemeConfigScreen
        customTheme: CustomThemeConfigScreen
    }
}

export class ScreenManager {
    declare _atualScreen: Screen
    declare _lastScreen: Screen
    declare private _screens: Screens
    declare static instance: ScreenManager

    constructor(game: Game) {
        if (!(ScreenManager.instance instanceof ScreenManager)) {
            this.#initScreens(game)
            ScreenManager.instance = this
        } else {
            throw new Error("Cannot instance two Screen Managers")
        }
    }

    static get screens() {
        return this.instance._screens
    }

    get screens() {
        return this._screens
    }

    setScreen(screen: Screen) {
        this._lastScreen = this._atualScreen
        this._atualScreen = screen
        console.log(screen)

    }

    get lastScreen() {
        return this._lastScreen
    }

    #initScreens(game: Game) {
        this._screens = {
            config: new ConfigScreen(game),
            init: new InitScreen(game),
            gameOver: new GameOverScreen(game),
            pause: new PauseScreen(game),
            game: new GameScreen(game),
            about: new AboutScreen(),
            controls: new ControlsScreen(),
            configScreens: {
                music: new MusicConfigScreen(game),
                velocity: new VelocityConfigScreen(game),
                theme: new ThemeConfigScreen(game),
                customTheme: new CustomThemeConfigScreen(game)
            }
        }
    }
}