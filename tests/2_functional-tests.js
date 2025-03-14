const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');
const { validLocales } = require('../components/const.js')

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translate = new Translator()

suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: "Have you met Mrs Kalyani?",
                locale: validLocales[1]
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.deepEqual(res.body, {
                    text: "Have you met Mrs Kalyani?",
                    translation: `Have you met ${translate.highlightString('Mrs.')} Kalyani?` 
                })
                done()
            })
    })

    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: "Have you met Mrs Kalyani?",
                locale: "british-to-french"
            })
            .end((err, res) => {
                assert.deepEqual(res.body, { error: 'Invalid value for locale field' })
                done()
            })
    })

    test('Translation with missing text field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: null,
                locale: validLocales[0]
            })
            .end((err, res) => {
                assert.deepEqual(res.body, { error: 'Required field(s) missing' })
                done()
            })
    })

    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: "Have you met Mrs Kalyani?",
                locale: null
            })
            .end((err, res) => {
                assert.deepEqual(res.body, { error: 'Required field(s) missing' })
                done()
            })
    })

    test('Translation with empty text: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: "",
                locale: validLocales[0]
            })
            .end((err, res) => {
                assert.deepEqual(res.body, { error: 'No text to translate' })
                done()
            })
    })

    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: "Hello world",
                locale: validLocales[0]
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.deepEqual(res.body, { text: "Hello world", translation: "Everything looks good to me!" })
                done()
            })
    })
});
