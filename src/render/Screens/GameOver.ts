import { DynamicGameBasedNavigableScreen } from "./Screen";

export class GameOverScreen extends DynamicGameBasedNavigableScreen {
    build() {
        const canvasGame = document.getElementById("game") as HTMLCanvasElement;
        const image = canvasGame.toDataURL("image/png") as string;

        const gameOverScreen = document.createElement("div");
        gameOverScreen.className = "telas-wrapper";
        gameOverScreen.innerHTML = `
        <fieldset id="game-over">
            <legend>GAME OVER</legend>
            <div class="line">
                <div>Pontuação:</div>
                <div>${this.game.points}</div>
            </div>
            <img src="${image}" style="border: 1px solid #aaa;max-height:73%" id="game-over-print">
            <button class="focus" style="align-self: center;margin-bottom: 10px;">NEW GAME</button>
        </fieldset>`;

        const button = gameOverScreen.querySelector(
            "button",
        ) as HTMLButtonElement;
        button.onclick = () => {
            this.close();
            this.game.screenManager.screens.game.focus();
            this.game.newGame();
        };

        return gameOverScreen;
    }
}
