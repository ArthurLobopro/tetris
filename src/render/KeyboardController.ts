export function CreateKeyDownHandler(functions: { [key: string]: VoidFunction }) {
    return (event: KeyboardEvent) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key

        const fullShortcut = [
            event.ctrlKey ? "ctrl+" : "",
            event.shiftKey ? "shift+" : "",
            key
        ].join("")

        functions[fullShortcut as keyof typeof functions]?.()
    }
}