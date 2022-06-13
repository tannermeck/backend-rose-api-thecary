const { Router } = require('express');
const { Episode } = require('../models/Episode');

module.exports = Router().get('/', async (req, res) => {
  // const id = req.params.id;
  const data = await Episode.getAll();
  res.json(data);
});
