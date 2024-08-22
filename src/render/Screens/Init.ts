import { ipcRenderer } from "electron";
import type { Game } from "../Game/Game";
import { ScreenManager } from "../ScreenManager";
import { DynamicNavigableScreen } from "./Screen";

export class InitScreen extends DynamicNavigableScreen {
    #game: Game;

    constructor(game: Game) {
        super();
        this.reset();
        this.#game = game;
    }

    build() {
        const initScreen = document.createElement("div");
        initScreen.className = "telas-wrapper";
        initScreen.innerHTML = `
        <fieldset id="init">
            <legend>Início</legend>
            <div class="button-wrapper">
                <button data-action="start" class="focus">START</button>
                <button data-action="config">CONFIGURAÇÕES</button>
                <button data-action="controls">CONTROLES</button>
                <button data-action="about">SOBRE</button>
                <button data-action="exit">SAIR</button>
            </div>
        </fieldset>`;

        const actions = {
            start: () => {
                this.close();
                ScreenManager.screens.game.show();
                this.#game.newGame();
            },
            config: () => {
                this.close();
                ScreenManager.screens.config.show(this);
            },
            controls: () => {
                this.close();
                ScreenManager.screens.controls.show(this);
            },
            about: () => {
                this.close();
                ScreenManager.screens.about.show();
            },
            exit: () => ipcRenderer.send("close"),
        };

        type key = keyof typeof actions;

        const buttons = initScreen.querySelectorAll("button");
        buttons.forEach((button) => {
            button.onclick = () => {
                const { action } = button.dataset;
                actions?.[action as key]?.();
            };
        });

        return initScreen;
    }
}
