import { loadAudio } from "./Util";

class GameAudios {
    private declare _theme: HTMLAudioElement;

    constructor() {
        loadAudio("../assets/audios/tetris-theme.mp3").then((result) => {
            this._theme = result;
        });
    }

    get theme() {
        return this._theme;
    }
}

export const Audios = new GameAudios();
