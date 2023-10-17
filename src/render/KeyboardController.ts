export function CreateKeyDownHandler(functions: { [key: string]: VoidFunction }) {
    return (event: KeyboardEvent) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
        functions[key as keyof typeof functions]?.()
    }
}