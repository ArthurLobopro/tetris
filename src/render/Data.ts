import Store from "../storage/Store"
import { game } from "./Game"

export const saveLastPontuation = () => Store.setGameData('lastPontuation', game.points)