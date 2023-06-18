import { z } from "zod"

export const gameSchema = z.object({
    lastPontuation: z.number().min(0).default(0),
    records: z.array(
        z.object({
            points: z.number().min(0).default(0)
        })
    )
        .min(3).max(3).default([
            { points: 0 }, { points: 0 }, { points: 0 }
        ])
})

export type GameSchema = z.infer<typeof gameSchema>

export const preferencesSchema = z.object({
    music: z.boolean().default(true),
    musicVolume: z.number().min(0).max(1).default(1),
    velocity: z.enum(["slow", "normal", "fast"]).default("normal"),
    theme: z.enum(["retro", "tetris", "custom"]).default("tetris")
})

export type PreferencesSchema = z.infer<typeof preferencesSchema>

const colorSchema = z.string().regex(/^#([0-9a-f]{3}){1,2}$/i)

const themeSchema = z.object({
    figures: z.object({
        square: colorSchema,
        stick: colorSchema,
        z: colorSchema,
        "reverse-z": colorSchema,
        "reverse-L": colorSchema,
        L: colorSchema,
        T: colorSchema
    }),
    background: colorSchema,
    lines: colorSchema
})

export type ThemeSchema = z.infer<typeof themeSchema>

const tetrisTheme = themeSchema.default({
    figures: {
        square: "#D0BE00",
        stick: "#00CAE0",
        z: "#DA0000",
        "reverse-z": "#00C733",
        "reverse-L": "#007CC6",
        L: "#D08A00",
        T: "#C500EA"
    },
    background: "#0e0d0d",
    lines: "#2a2929"
})

const retroTheme = themeSchema.default({
    figures: {
        square: "#ddd",
        stick: "#ddd",
        z: "#ddd",
        "reverse-z": "#ddd",
        "reverse-L": "#ddd",
        L: "#ddd",
        T: "#ddd"
    },
    background: "#1a1818",
    lines: "#555"
})

export const themesSchema = z.object({
    tetris: tetrisTheme,
    retro: retroTheme,
    custom: tetrisTheme
})

export type ThemesSchema = z.infer<typeof themesSchema>