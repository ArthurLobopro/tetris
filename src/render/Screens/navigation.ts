const getButtons = (element: Element) => {
    const buttons = element.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    const focused = element.querySelector('button.focus') as HTMLButtonElement
    return { buttons, focused }
}

const functions = {
    up(element: Element) {
        const { buttons, focused } = getButtons(element)
        let previus = focused?.previousElementSibling || null
        if (previus?.tagName !== "BUTTON") {
            previus = buttons[buttons.length - 1]
        }
        focused?.classList.remove('focus')
        previus.classList.add('focus')
    },
    down(element: Element) {
        const { buttons, focused } = getButtons(element)
        let next = focused?.nextElementSibling || null
        if (!next || next?.tagName !== "BUTTON" || next == focused) {
            next = buttons[0]
        }
        focused?.classList.remove('focus')
        next.classList.add('focus')
    },
    select(element: HTMLElement) {
        const { focused } = getButtons(element)
        focused?.click()
    }
}

const keys = {
    "ArrowUp": functions.up,
    "w": functions.up,
    "ArrowDown": functions.down,
    "s": functions.down,
    "Enter": functions.select
}

export default keys