var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fema_director', { title: 'Fema Director' });
});

// User submitted item/labor form
router.post('/', function(req, res, next) {
  // For item input:
  var itemName = req.body.itemName;
  var itemQty = req.body.itemQty;
  var itemAddr = req.body.itemAddr;
  // For labor input:
  var laborName = req.body.laborName;
  var laborStartDate = req.body.laborStartDate;
  var laborEndDate = req.body.laborEndDate;
  var laborAddr = req.body.laborAddr;

  res.render('fema_director', { title: 'Fema Director', 
    itemName: itemName, 
    itemQty: itemQty, 
    itemAddr: itemAddr,
    laborName: laborName,
    laborStartDate: laborStartDate,
    laborEndDate: laborEndDate,
    laborAddr: laborAddr });
});

module.exports = router;
