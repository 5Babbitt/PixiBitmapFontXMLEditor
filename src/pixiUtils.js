import { Application, BitmapFont, BitmapText, Texture } from 'pixi.js'

export class PixiUtils {
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
    }

    async addBitmapText(text, bitmapFont, fontSize = 32, alignment = 'left') {
        const bitmapFontText = new BitmapText(text, {
            fontName: bitmapFont,
            fontSize: fontSize,
            align: alignment,
        })

        this.app.stage.addChild(this.centerComponent(bitmapFontText))
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
    }

    updateBackgroundColor(color) {
        this.app.renderer.background.color = color
    }

    getApp() {
        return this.app
    }
}