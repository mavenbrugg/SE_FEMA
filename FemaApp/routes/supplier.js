var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectRows("Items", "itemStatus", "Not Committed").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted form
router.post('/', function(req, res, next) {
  // For item input:
  var supplierName = req.body.supplierName;
  var supplierAddr = req.body.supplierAddr;
  var itemID = req.body.itemID;

  sqlControl.updateRow("Items", "itemID", itemID, "itemStatus", "Committed").then( // .then makes sure it waits for the SQL request
    function(value) {
      sqlControl.selectRows("Items", "itemStatus", "Not Committed").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Display the page
          res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
        }
      );
    }
  );

  
});

module.exports = router;
