var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('driver_view', { title: "Driver" });
});

// User submitted form
router.post('/', function(req, res, next) {
  // For item input:
  let i_request_id = req.body.i_request;
  let d_driver = req.body.d_driver;
  let formName = req.body.formName

  if (formName == "driverView") {
    sqlControl.selectRows("`DRIVERS TRANSPORTING ITEMS`", "d_driver", d_driver).then( // .then makes sure it waits for the SQL request
      function(value) {
        // Display the page
        res.render('driver_view', { title: "Driver", itemsData: sqlParse.sqlFormat(value) });
      }
    );
  } else {
    sqlControl.updateRow("`ITEM REQUEST`", "i_request_id", i_request_id, ["completion_status"], ["complete"]).then( // .then makes sure it waits for the SQL request
      function(value) {
        sqlControl.deleteRow("`DRIVERS TRANSPORTING ITEMS`", "i_request", i_request_id).then(
          function(value) {
            sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "committed").then( // .then makes sure it waits for the SQL request
              function(value) {
                // Display the page
                res.render('driver_view', { title: "Driver", itemsData: sqlParse.sqlFormat(value) });
              }
            );
          }
        );
      }
    );
  }

});

module.exports = router;
