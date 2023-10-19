interface ITimerConstructor {
    callback: () => void
    rate: number
    autoplay?: boolean
}

const fps = (rate: number) => 1000 / rate

export class Interval {
    private _rate: number
    private _callback: () => void
    private _interval?: ReturnType<typeof setInterval>
    private _isRunning = false

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
        this._isRunning = true
    }

    stop() {
        clearInterval(this._interval)
        this._isRunning = false
    }

    set rate(value: number) {
        const isRunning = this._isRunning
        isRunning && this.stop()
        this._rate = value
        isRunning && this.start()
    }

    set callback(value: () => void) {
        const isRunning = this._isRunning
        isRunning && this.stop()
        this._callback = value
        isRunning && this.start()
    }
}