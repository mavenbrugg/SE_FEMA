var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectRows("`LABOR REQUEST`", "completion_status", "requested").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('skilled_worker', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {

  var l_request_id = req.body.l_request_id;

  sqlControl.updateRow("`LABOR REQUEST`", "l_request_id", l_request_id, ["completion_status"], ["in progress"]).then(
    function(value) {
      sqlControl.selectRows("`LABOR REQUEST`", "completion_status", "requested").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Display the page
          res.render('skilled_worker', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
        }
      );
    }
  );

  
});

module.exports = router;
