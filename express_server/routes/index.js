var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', async (req, res, next) => {
  let response = await moviesController.readFiles();
  res.send(response);
  next();
});

module.exports = router;