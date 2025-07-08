export class DOMUtils {
    constructor() {
        this.inputs = {
            img: document.getElementById('textureAtlasInput'),
            xml: document.getElementById('xmlInput'),
            colour: document.getElementById('colourInput'),
            text: document.getElementById('textInput'),
            size: document.getElementById('sizeInput'),
            submit: document.getElementById('submit'),
            update: document.getElementById('update'),
            export: document.getElementById('export'),
        }

        this.outputs = {
            xml: document.getElementById('xmlEditorTextArea'),
            textureAtlas: document.getElementById('textureAtlasOutput'),
        }
    }
}