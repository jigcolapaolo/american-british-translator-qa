'use strict';

const Translator = require('../components/translator.js');
const { validLocales } = require('../components/const.js')

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body

      if (text === "") return res.json({ error: 'No text to translate' })
      if (!text || !locale) return res.json({ error: 'Required field(s) missing' })
      if (!validLocales.includes(locale)) return res.json({ error: 'Invalid value for locale field' })


      const translation = translator.translate(text, locale)

      res.json({ text, translation })
    });
};
