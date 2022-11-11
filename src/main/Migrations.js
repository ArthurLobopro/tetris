const userPreferencesMigrations = {
    "1.1.3": store => {
        if (store.has("gameplayVelocity")) {
            const gameplayVelocity = store.store.gameplayVelocity

            const velocities = {
                500: "slow",
                300: "normal",
                150: "fast"
            }

            store.delete('gameplayVelocity')
            store.set('velocity', velocities[gameplayVelocity])
        }
    }
}

const themeMigrations = {
    "1.2.1": store => {
        store.reset("retro")
    }
}

module.exports = Object.freeze({
    userPreferencesMigrations,
    themeMigrations
})