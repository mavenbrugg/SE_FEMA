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

  let l_request_id = req.body.l_request_id;
  let l_volunteer = req.body.l_volunteer;

  sqlControl.updateRow("`LABOR REQUEST`", "l_request_id", l_request_id, ["completion_status", "l_volunteer"], ["in progress", l_volunteer]).then(
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
