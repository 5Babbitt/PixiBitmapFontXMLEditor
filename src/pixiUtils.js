import { Application, BitmapFont, BitmapText, Texture, Ticker } from 'pixi.js'

const centerAlignments = ['center', 'justify']

export class PixiUtils {
    _bitmapText
    _ticker
    _count = 0
    _countRate = 1
    _start = 0
    _end = 0
    _decimals = 2
    _prefix = ''
    _alignment = 'left'

    constructor() {
        this.canvas = document.getElementById('pixiContainer')
    }

    async init(colour = '#ff55ff') {
        this.app = new Application({
            background: colour,
            resizeTo: this.canvas,
            height: this.canvas.offsetHeight,
            width: this.canvas.offsetWidth,
        })

        this.canvas.appendChild(this.app.view)

        this._ticker = new Ticker()
        this._ticker.add(this.counter.bind(this))
    }

    async addBitmapText(text, bitmapFont, fontSize = 32, alignment = 'center') {
        this._bitmapText = new BitmapText(text, {
            fontName: bitmapFont,
            fontSize: fontSize,
            align: alignment,
        })

        this._alignment = alignment
        this.app.stage.addChild(this.centerComponent(this._bitmapText))
    }

    async loadBitmapFont(xmlDoc, imageURL) {
        const imageTexture = await Texture.fromURL(imageURL)

        BitmapFont.install(xmlDoc, imageTexture, true)
        return xmlDoc.querySelector('info').getAttribute('face')
    }

    centerComponent(component) {
        component.pivot.x = component.width / 2
        component.pivot.y = component.height / 2
        component.x = this.app.screen.width / 2
        component.y = this.app.screen.height / 2

        return component
    }

    clearCanvas() {
        this.endCounter()
        this._bitmapText = undefined
        this.app.stage.removeChildren()
    }

    updateBackgroundColor(color) {
        this.app.renderer.background.color = color
    }

    getApp() {
        return this.app
    }

    startCounter(startValue = this._start, endValue = this._end, rate = this._countRate, decimalPlaces = this._decimals, prefix = this._prefix) {
        this._start = parseFloat(startValue)
        this._end = parseFloat(endValue)
        this._countRate = parseFloat(rate)
        this._count = parseFloat(this._start)
        this._decimals = parseInt(decimalPlaces)
        this._prefix = prefix
        this._ticker.start()
    }

    endCounter() {
        this._ticker.stop()
    }

    counter() {
        this._count += parseFloat(this._ticker.deltaTime / 60) * this._countRate
        this._bitmapText.text = `${this._prefix}${this.formatNumberText(this._count)}`

        if (this._count > this._end) {
            this.endCounter()
            this._bitmapText.text = `${this._prefix}${this.formatNumberText(this._end)}`
        }

        this._shouldCenterComponent() && this.centerComponent(this._bitmapText)
    }

    formatNumberText(num) {
        num = parseFloat(num)
        const roundedString = num.toFixed(this._decimals)
        const [integerPart, decimalPart] = roundedString.split('.')
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
    }

    _shouldCenterComponent() {
        return centerAlignments.includes(this._alignment)
    }
}