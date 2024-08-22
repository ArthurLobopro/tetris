import { UserPreferencesController as UserPreferences } from "../../../storage/controllers/UserPreferences";
import { DynamicGameBasedScreen } from "../Screen";

export class MusicConfigScreen extends DynamicGameBasedScreen {
    build() {
        const configTemp = UserPreferences.get();

        const saveConfig = () => {
            UserPreferences.set(configTemp);
            this.game.userPreferences = UserPreferences.get();
        };

        const music_screen = document.createElement("div");
        music_screen.className = "telas-wrapper";
        music_screen.innerHTML = `
        <fieldset>
            <legend>Música</legend>
                <div class="line">
                    Música: <div class="check" id="music" data-check="${UserPreferences?.music}"></div>
                </div>
                <div class="line">
                    Volume: <input type="range" id="volume"  min="0" max="100" value="${UserPreferences?.musicVolume * 100}">
                </div>
                <div class="buttons">
                    <button data-action="save">
                        OK
                    </button>
                    <button data-action="cancel">
                        Cancelar
                    </button>
                </div>
        </fieldset>`;

        const music_input = music_screen.querySelector(
            "#music",
        ) as HTMLDivElement;
        music_input.onclick = () => {
            const value = music_input.dataset.check === "true";
            music_input.dataset.check = (!value).toString();
            configTemp.music = !value;
        };

        const volume_input = music_screen.querySelector(
            "#volume",
        ) as HTMLInputElement;
        volume_input.onchange = () => {
            const { valueAsNumber: value } = volume_input;
            configTemp.musicVolume = value / 100;
        };

        const buttons = music_screen.querySelectorAll("button");
        buttons.forEach((button) => {
            button.onclick = () => {
                const { action } = button.dataset;

                if (action === "save") {
                    saveConfig();
                    this.game.reloadConfig();
                }

                this.close();
                this.game.screenManager.screens.config.focus();
            };
        });

        return music_screen;
    }
}
