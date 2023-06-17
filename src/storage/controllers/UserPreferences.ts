import { userPreferences } from "../Store"
import { PreferencesSchema } from "../StoreSchemas"

export class UserPreferencesController {
    static get() {
        return userPreferences.store
    }

    static get music() {
        return userPreferences.get('music')
    }

    static set music(value: boolean) {
        userPreferences.set('music', value)
    }

    static get musicVolume() {
        return userPreferences.get('musicVolume')
    }

    static set musicVolume(value: number) {
        userPreferences.set('musicVolume', value)
    }

    static get velocity() {
        return userPreferences.get('velocity')
    }

    static set velocity(value: PreferencesSchema['velocity']) {
        userPreferences.set('velocity', value)
    }

    static get theme() {
        return userPreferences.get('theme')
    }

    static set theme(value: PreferencesSchema['theme']) {
        userPreferences.set('theme', value)
    }
}