export class DOMUtils {
    constructor() {
        this.inputs = {
            img: document.getElementById('textureAtlasInput'),
            xml: document.getElementById('xmlInput'),
            colour: document.getElementById('colourInput'),
            text: document.getElementById('textInput'),
            size: document.getElementById('sizeInput'),
            decimals: document.getElementById('decimalInput'),
            prefix: document.getElementById('prefixInput'),
            rate: document.getElementById('rateInput'),
            countStart: document.getElementById('startInput'),
            countEnd: document.getElementById('endInput'),
            textAlign: document.getElementById('alignSelect'),
        }

        this.outputs = {
            xml: document.getElementById('xmlEditorTextArea'),
            textureAtlas: document.getElementById('textureAtlasOutput'),
        }

        this.buttons = {
            startCountBtn: document.getElementById('start-counter'),
            stopCountBtn: document.getElementById('stop-counter'),
            submit: document.getElementById('submit'),
            update: document.getElementById('update'),
            export: document.getElementById('export'),
        }
    }

    hideElement(element) {
        element.classList.add('hidden')
    }

    showElement(element) {
        element.classList.remove('hidden')
    }

    collapseWindow() {
        const collapseIndicators = document.querySelectorAll('.collapse-indicator')

        collapseIndicators.forEach(indicator => {
            indicator.addEventListener('click', function () {
                const window = this.closest('.window')
                window.classList.toggle('collapsed')
            })
        })
    }
}