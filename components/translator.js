const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
const { validLocales, finalPunctuationTypes } = require('../components/const.js')


class Translator {

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    removeDot(str) {
        return str.replace(/\.$/, '')
    }

    highlightString(str) {
        return `<span class="highlight">${str}</span>` 
    }

    formatTime(time) {
        return time.includes(":") 
        ? this.highlightString(time.replace(/:/g, ".")) 
        : this.highlightString(time.replace(/\./g, ":"))
    }

    translate(text, locale) {

        const textArray = text.split(" ")
        let newTextArray

        if (locale === validLocales[0]) {
            newTextArray = this.americanToBritish(textArray)
        } else {
            newTextArray = this.britishToAmerican(textArray)
        }

        newTextArray[0] = this.capitalize(newTextArray[0])
        
        let translatedText = newTextArray.join(" ")
        const finalIndex = translatedText.length - 1
        const originalTextFinalIndex = text.length - 1

        if (finalPunctuationTypes.includes(text[originalTextFinalIndex]) && !finalPunctuationTypes.includes(translatedText[finalIndex])) 
            translatedText = translatedText.concat('.')

        return text === translatedText ? "Everything looks good to me!" : translatedText
    }

    americanToBritish(textArray) {
        const newTextArray = []
        let ignoreIndexCount = 0

        for (let i = 0; i < textArray.length; i++) {

            if (ignoreIndexCount > 0) {
                ignoreIndexCount--
                continue
            }

            const timeRegex = /(^|\s)([0-9]|1[0-9]|2[0-3])[:.]([0-5][0-9])/;
            const match = textArray[i].match(timeRegex);

            if (match) {
                newTextArray.push(this.formatTime(match[0]))
                continue
            }

            const word1 = textArray[i].toLowerCase()
            const word2 = textArray[i + 1] ? `${word1} ${textArray[i + 1].toLowerCase()}` : null
            const word3 = textArray[i + 2] ? `${word2} ${textArray[i + 2].toLowerCase()}` : null

            if (word3 && americanOnly.hasOwnProperty(this.removeDot(word3))) {
                newTextArray.push(this.highlightString(americanOnly[this.removeDot(word3)]))
                ignoreIndexCount = 2
                continue
            } else if (word2 && americanOnly.hasOwnProperty(this.removeDot(word2))) {
                newTextArray.push(this.highlightString(americanOnly[this.removeDot(word2)]))
                ignoreIndexCount = 1
                continue
            } else if (americanOnly.hasOwnProperty(this.removeDot(word1))) {
                newTextArray.push(this.highlightString(americanOnly[this.removeDot(word1)]))
                continue
            }

            if (americanToBritishSpelling.hasOwnProperty(word1)) {
                newTextArray.push(this.highlightString(americanToBritishSpelling[word1]))
                continue
            }
            if (americanToBritishTitles.hasOwnProperty(word1)) {
                newTextArray.push(this.highlightString(this.capitalize(americanToBritishTitles[word1]))) 
                continue
            }

            newTextArray.push(textArray[i])
        }

        return newTextArray
    }

    britishToAmerican(textArray) {
        const newTextArray = []
        let ignoreIndexCount = 0

        for (let i = 0; i < textArray.length; i++) {

            if (ignoreIndexCount > 0) {
                ignoreIndexCount--
                continue
            }

            const timeRegex = /(^|\s)([0-9]|1[0-9]|2[0-3])[:.]([0-5][0-9])/;
            const match = textArray[i].match(timeRegex);

            if (match) {
                newTextArray.push(this.formatTime(match[0]))
                continue
            }

            const word1 = textArray[i].toLowerCase()
            const word2 = textArray[i + 1] ? `${word1} ${textArray[i + 1].toLowerCase()}` : null
            const word3 = textArray[i + 2] ? `${word2} ${textArray[i + 2].toLowerCase()}` : null

            if (word3 && britishOnly.hasOwnProperty(this.removeDot(word3))) {
                newTextArray.push(this.highlightString(britishOnly[this.removeDot(word3)]))
                ignoreIndexCount = 2
                continue
            } else if (word2 && britishOnly.hasOwnProperty(this.removeDot(word2))) {
                newTextArray.push(this.highlightString(britishOnly[this.removeDot(word2)]))
                ignoreIndexCount = 1
                continue
            } else if (britishOnly.hasOwnProperty(this.removeDot(word1))) {
                newTextArray.push(this.highlightString(britishOnly[this.removeDot(word1)]))
                continue
            }

            let spellingKey = Object.entries(americanToBritishSpelling).find(([key, val]) => val === word1)?.[0]
            let titleKey = Object.entries(americanToBritishTitles).find(([key, val]) => val === word1)?.[0]
            if (spellingKey) {
                newTextArray.push(this.highlightString(spellingKey))
                continue
            }
            if (titleKey) {
                newTextArray.push(this.highlightString(this.capitalize(titleKey))) 
                continue
            }

            newTextArray.push(textArray[i])
        }

        return newTextArray
    }

}

module.exports = Translator;