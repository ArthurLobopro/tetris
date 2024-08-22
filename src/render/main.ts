import { Game } from "./Game/Game";

const game = new Game();

game.init();

window.onkeydown = (event) => game.screenManager._atualScreen.onKeyDown(event);
