var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "committed").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('driver', { title: "Driver", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted form
router.post('/', function(req, res, next) {
  // For item input:
  var driverName = req.body.driverName;
  var i_request_id = req.body.i_request_id;

  sqlControl.updateRow("`ITEM REQUEST`", "i_request_id", i_request_id, ["completion_status"], ["en route"]).then( // .then makes sure it waits for the SQL request
    function(value) {
      sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "committed").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Display the page
          res.render('driver', { title: "Driver", itemsData: sqlParse.sqlFormat(value) });
        }
      );
    }
  );

  
});

module.exports = router;
