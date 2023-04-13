var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('skilled_worker_view', { title: "Skilled Worker" });
});

// User submitted form
router.post('/', function(req, res, next) {
  // For item input:
  let l_request_id = req.body.l_request_id;
  let l_volunteer = req.body.l_volunteer;
  let formName = req.body.formName

  if (formName == "laborView") {
    sqlControl.selectRows("`LABOR REQUEST`", "l_volunteer", l_volunteer).then( // .then makes sure it waits for the SQL request
      function(value) {
        // Display the page
        res.render('skilled_worker_view', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
      }
    );
  } else {
    sqlControl.updateRow("`LABOR REQUEST`", "l_request_id", l_request_id, ["completion_status"], ["complete"]).then( // .then makes sure it waits for the SQL request
      function(value) {
        sqlControl.selectRows("`LABOR REQUEST`", "l_volunteer", l_volunteer).then( // .then makes sure it waits for the SQL request
          function(value) {
            // Display the page
            res.render('skilled_worker_view', { title: "Skilled Worker", itemsData: sqlParse.sqlFormat(value) });
          }
        );
      }
    );
  }

});

module.exports = router;
