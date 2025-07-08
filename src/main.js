/**
 * REF LINKS:
 * PIXI v7:
 * https://pixijs.com/7.x/examples/text/bitmap-text
 * https://pixijs.download/v7.x/docs/PIXI.BitmapText.html
 * https://pixijs.download/v7.x/docs/PIXI.BitmapFont.html
 *
 * Vite:
 * https://vite.dev/guide/static-deploy#github-pages
 *
 * TODO:
 * [X] import pixi
 * [X] pixi viewport
 * [X] image upload and display
 * [X] xml upload, view
 * [X] Load and display bitmapText
 * [X] Load and display on GithubPages
 * [X] xml parsing
 * [X] use uploaded text and img to make bitmap font
 * [X] reset pixi scene
 * [X] get font family name from xml file
 * [X] xml edit
 * [X] split functionality
 * [X] xml export
 *
 * Nice to haves
 * [ ] Text Counter
 * [ ] XML syntax hightlighting
 * [ ] upload background images
 */

import { DOMUtils } from './DOMUtils.js'
import { FileUtils } from './fileUtils.js'
import { PixiUtils } from './pixiUtils.js'

let xmlData
let imgURL

const domUtils = new DOMUtils()
const pixiUtils = new PixiUtils(domUtils.inputs.colour.value)

// Input Events
domUtils.inputs.submit.addEventListener('click', submitInputValues)

//Update
domUtils.inputs.update.addEventListener('click', updateBitmapText)
domUtils.inputs.text.addEventListener('input', updateBitmapText)
domUtils.inputs.size.addEventListener('input', updateBitmapText)
domUtils.inputs.colour.addEventListener('input', updateBitmapText)

//Export
domUtils.inputs.export.addEventListener('click', exportXMLFile)


async function startPixi() {
    await pixiUtils.init(domUtils.inputs.colour.value)
}

async function submitInputValues() {
    // Upload Image
    const imgFile = domUtils.inputs.img.files[0]
    imgURL = URL.createObjectURL(imgFile)
    domUtils.outputs.textureAtlas.src = imgURL

    // Upload XML
    const xmlFile = domUtils.inputs.xml.files[0]
    domUtils.outputs.xml.value = await FileUtils.getXMLText(xmlFile)

    await updateBitmapText()
}

async function updateBitmapText() {
    pixiUtils.clearCanvas()
    pixiUtils.updateBackgroundColor(domUtils.inputs.colour.value)

    updateXMLData()

    const xmlDocument = FileUtils.parseXMLString(xmlData)
    const fontName = await pixiUtils.loadBitmapFont(xmlDocument, imgURL)
    const text = domUtils.inputs.text.value
    const fontSize = domUtils.inputs.size.value

    await pixiUtils.addBitmapText(text, fontName, fontSize)
}

function exportXMLFile() {
    FileUtils.download(domUtils.inputs.xml.files[0].name, domUtils.outputs.xml.value)
}

function updateXMLData() {
    xmlData = domUtils.outputs.xml.value
}

(async () => {
    await startPixi()
}) ()
