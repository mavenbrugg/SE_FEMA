var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('skilled_worker', { title: 'Skilled Worker' });
});

module.exports = router;
