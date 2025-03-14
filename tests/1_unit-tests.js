const chai = require('chai');
const assert = chai.assert;
const { validLocales } = require('../components/const.js')

const Translator = require('../components/translator.js');
const translator = new Translator()

suite('Unit Tests', () => {
    test("Translate Mangoes are my favorite fruit. to British English", () => {
        const input = "Translate Mangoes are my favorite fruit."
        const expectedOutput = `Translate Mangoes are my ${translator.highlightString('favourite')} fruit.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate I ate yogurt for breakfast. to British English", () => {
        const input = "I ate yogurt for breakfast."
        const expectedOutput = `I ate ${translator.highlightString('yoghurt')} for breakfast.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate We had a party at my friend's condo. to British English", () => {
        const input = "We had a party at my friend's condo."
        const expectedOutput = `We had a party at my friend's ${translator.highlightString('flat')}.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate Can you toss this in the trashcan for me? to British English", () => {
        const input = "Can you toss this in the trashcan for me?"
        const expectedOutput = `Can you toss this in the ${translator.highlightString('bin')} for me?`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate The parking lot was full. to British English", () => {
        const input = "The parking lot was full."
        const expectedOutput = `The ${translator.highlightString('car park')} was full.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
        const input = "Like a high tech Rube Goldberg machine."
        const expectedOutput = `Like a high tech ${translator.highlightString('Heath Robinson device')}.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate To play hooky means to skip class or work. to British English", () => {
        const input = "To play hooky means to skip class or work."
        const expectedOutput = `To ${translator.highlightString('bunk off')} means to skip class or work.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate No Mr. Bond, I expect you to die. to British English", () => {
        const input = "No Mr. Bond, I expect you to die."
        const expectedOutput = `No ${translator.highlightString('Mr')} Bond, I expect you to die.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate Dr. Grosh will see you now. to British English", () => {
        const input = "Dr. Grosh will see you now."
        const expectedOutput = `${translator.highlightString('Dr')} Grosh will see you now.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate Lunch is at 12:15 today. to British English", () => {
        const input = "Lunch is at 12:15 today."
        const expectedOutput = `Lunch is at ${translator.highlightString('12.15')} today.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Translate We watched the footie match for a while. to American English", () => {
        const input = "We watched the footie match for a while."
        const expectedOutput = `We watched the ${translator.highlightString('soccer')} match for a while.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate Paracetamol takes up to an hour to work. to American English", () => {
        const input = "Paracetamol takes up to an hour to work."
        const expectedOutput = `${translator.highlightString('Tylenol')} takes up to an hour to work.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate First, caramelise the onions. to American English", () => {
        const input = "First, caramelise the onions."
        const expectedOutput = `First, ${translator.highlightString('caramelize')} the onions.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate I spent the bank holiday at the funfair. to American English", () => {
        const input = "I spent the bank holiday at the funfair."
        const expectedOutput = 
            `I spent the ${translator.highlightString('public holiday')} at the ${translator.highlightString('carnival')}.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate I had a bicky then went to the chippy. to American English", () => {
        const input = "I had a bicky then went to the chippy."
        const expectedOutput = 
            `I had a ${translator.highlightString('cookie')} then went to the ${translator.highlightString('fish-and-chip shop')}.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
        const input = "I've just got bits and bobs in my bum bag."
        const expectedOutput = 
            `I've just got ${translator.highlightString('odds and ends')} in my ${translator.highlightString('fanny pack')}.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
        const input = "The car boot sale at Boxted Airfield was called off."
        const expectedOutput = 
            `The ${translator.highlightString('swap meet')} at Boxted Airfield was called off.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate Have you met Mrs Kalyani? to American English", () => {
        const input = "Have you met Mrs Kalyani?"
        const expectedOutput = 
            `Have you met ${translator.highlightString('Mrs.')} Kalyani?`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate Prof Joyner of King's College, London. to American English", () => {
        const input = "Prof Joyner of King's College, London."
        const expectedOutput = 
            `${translator.highlightString('Prof.')} Joyner of King's College, London.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Translate Tea time is usually around 4 or 4.30. to American English", () => {
        const input = "Tea time is usually around 4 or 4.30."
        const expectedOutput = 
            `Tea time is usually around 4 or ${translator.highlightString('4:30')}.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Highlight translation in Mangoes are my favorite fruit.", () => {
        const input = "Mangoes are my favorite fruit."
        const expectedOutput = 
            `Mangoes are my ${translator.highlightString('favourite')} fruit.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Highlight translation in I ate yogurt for breakfast.", () => {
        const input = "I ate yogurt for breakfast."
        const expectedOutput = `I ate ${translator.highlightString('yoghurt')} for breakfast.`

        assert.strictEqual(translator.translate(input, validLocales[0]), expectedOutput)
    })

    test("Highlight translation in We watched the footie match for a while.", () => {
        const input = "We watched the footie match for a while."
        const expectedOutput = `We watched the ${translator.highlightString('soccer')} match for a while.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })

    test("Highlight translation in Paracetamol takes up to an hour to work.", () => {
        const input = "Paracetamol takes up to an hour to work."
        const expectedOutput = `${translator.highlightString('Tylenol')} takes up to an hour to work.`

        assert.strictEqual(translator.translate(input, validLocales[1]), expectedOutput)
    })
});
