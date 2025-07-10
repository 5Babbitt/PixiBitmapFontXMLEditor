import { Application, BitmapFont, BitmapText, Texture, Ticker } from 'pixi.js'

export class PixiUtils {
    text
    ticker
    count = 0

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
        this.ticker.add(this.counter, this.ticker)
    }

    async addBitmapText(text, bitmapFont, fontSize = 32) {
        this.text = new BitmapText(text, {
            fontName: bitmapFont,
            fontSize: fontSize,
        })

        this.app.stage.addChild(this.centerComponent(this.text))
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
        this.app.stage.removeChildren()
        this.text = undefined
        this.ticker.stop()
    }

    updateBackgroundColor(color) {
        this.app.renderer.background.color = color
    }

    getApp() {
        return this.app
    }

    counter(ticker) {
        this.count += ticker.deltaMS
    }
}