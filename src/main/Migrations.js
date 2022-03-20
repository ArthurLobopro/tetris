const userPreferencesMigrations = {
    "1.1.3": store => {
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

module.exports = Object.freeze({
    userPreferencesMigrations
})