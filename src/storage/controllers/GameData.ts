import { gameData } from "../Store";

export class GameDataController {
	static get lastPontuation() {
		return gameData.get("lastPontuation");
	}

	static set lastPontuation(value: number) {
		gameData.set("lastPontuation", value);
	}

	static get records() {
		return gameData.get("records");
	}

	static set records(value: { points: number }[]) {
		gameData.set("records", value);
	}
}
