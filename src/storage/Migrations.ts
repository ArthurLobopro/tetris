import type Store from "zod-electron-store";
import type { ThemesSchema } from "./StoreSchemas";

type OldPreferencesSchema = {
    "1.2.0": {
        music: boolean;
        musicVolume: number;
        gameplayVelocity: 150 | 300 | 500;
        theme: string;
    };
};

export const userPreferencesMigrations = {
    "1.1.3": (store: Store<OldPreferencesSchema["1.2.0"]>) => {
        if (store.has("gameplayVelocity")) {
            const gameplayVelocity = store.store.gameplayVelocity;

            const velocities = {
                500: "slow",
                300: "normal",
                150: "fast",
            };

            store.delete("gameplayVelocity");
            store.set("velocity", velocities[gameplayVelocity]);
        }
    },
};

export const themeMigrations = {
    "1.2.1": (store: Store<ThemesSchema>) => {
        store.reset("retro");
    },
};
