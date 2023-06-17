interface ITimerConstructor {
    callback: () => void
    rate: number
    autoplay?: boolean
}

const fps = (rate: number) => 1000 / rate

export class Interval {
    private _rate: number
    private _callback: () => void
    private _interval?: NodeJS.Timer

    constructor(props: ITimerConstructor) {
        const {
            callback,
            rate,
            autoplay = true
        } = props

        this._rate = rate
        this._callback = callback

        if (autoplay) {
            this.start()
        }
    }

    start() {
        this._interval = setInterval(this._callback, fps(this._rate))
    }

    stop() {
        clearInterval(this._interval as NodeJS.Timer)
    }

    set rate(value: number) {
        this.stop()
        this._rate = value
        this.start()
    }

    set callback(value: () => void) {
        this.stop()
        this._callback = value
        this.start()
    }
}