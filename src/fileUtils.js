export class FileUtils {
    static async getXMLText(file) {
        try {
            return await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (event) => resolve(event.target.result)
                reader.onerror = () => reject(new Error('Failed to read file'))
                reader.readAsText(file)
            })
        } catch (error) {
            return `Error: Unable to load xml file\n${error}`
        }
    }

    static parseXMLString(xmlContent) {
        const parser = new DOMParser()
        return parser.parseFromString(xmlContent, 'text/xml')
    }

    static download(filename, content) {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(content))
        element.setAttribute('download', filename)
        element.style.display = 'none'

        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }
}