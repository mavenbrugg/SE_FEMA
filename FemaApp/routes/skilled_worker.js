var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectRows("Labor", "laborStatus", "Not Started").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('skilled_worker', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {

  var laborID = req.body.laborID;

  sqlControl.updateRow("Labor", "laborID", laborID, "laborStatus", "In Progress").then(
    function(value) {
      sqlControl.selectRows("Labor", "laborStatus", "Not Started").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Display the page
          res.render('skilled_worker', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
        }
      );
    }
  );

  
});

module.exports = router;
