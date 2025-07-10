import { Application, BitmapFont, BitmapText, Texture, Ticker } from 'pixi.js'

export class PixiUtils {
    bitmapText
    ticker
    count = 0
    countRate = 1
    start = 0
    end = 0
    decimals = 2
    prefix = ''

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

        this.ticker = new Ticker()
        this.ticker.add(this.counter.bind(this))
    }

    async addBitmapText(text, bitmapFont, fontSize = 32) {
        this.bitmapText = new BitmapText(text, {
            fontName: bitmapFont,
            fontSize: fontSize,
        })

        this.app.stage.addChild(this.centerComponent(this.bitmapText))
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
        this.bitmapText = undefined
        this.app.stage.removeChildren()
    }

    updateBackgroundColor(color) {
        this.app.renderer.background.color = color
    }

    getApp() {
        return this.app
    }

    startCounter(startValue = this.start, endValue = this.end, rate = this.countRate, decimalPlaces = this.decimals, prefix = this.prefix) {
        this.start = parseFloat(startValue)
        this.end = parseFloat(endValue)
        this.countRate = parseFloat(rate)
        this.count = parseFloat(this.start)
        this.decimals = parseInt(decimalPlaces)
        this.prefix = prefix
        this.ticker.start()
    }

    endCounter() {
        this.ticker.stop()
    }

    counter() {
        console.log(`Delta Time: ${this.ticker.deltaTime}`)
        this.count += parseFloat(this.ticker.deltaTime) * this.countRate
        this.bitmapText.text = this.formatNumberText(this.count)

        if (this.count > this.end) {
            this.endCounter()
        }
    }

    formatNumberText(num) {
        num = parseFloat(num)
        const roundedString = num.toFixed(this.decimals)
        const [integerPart, decimalPart] = roundedString.split('.')
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
    }
}