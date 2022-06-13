const { Router } = require('express');
const { Quote } = require('../models/Quote');

module.exports = Router().post('/', async (req, res) => {
  const character = await Quote.insert(req.body);
  res.json(character);
});
