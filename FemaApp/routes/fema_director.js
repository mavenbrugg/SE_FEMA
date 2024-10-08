var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectAll("Labor").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('fema_director', { title: "Fema Director", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {
  // For item input:
  var itemName = req.body.itemName;
  var itemQty = req.body.itemQty;
  var itemAddress = req.body.itemAddress;

  // Get data submitted with form
  let formKeys = Object.keys(req.body);
  formKeys.shift(); // Remove the form name
  let formData = [];
  for (const i in req.body) { 
    // Don't consider the form name
    if (i.toString() != "formName") {
      formData.push(req.body[i]); 
    }
  };

  sqlControl.insertInto("Labor", formKeys, formData).then();

  sqlControl.selectAll("Labor").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('fema_director', { title: "Fema Director", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

module.exports = router;
