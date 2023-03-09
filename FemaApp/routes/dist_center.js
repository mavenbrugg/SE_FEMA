var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dist_center', { title: 'Distribution Center' });
});

module.exports = router;
