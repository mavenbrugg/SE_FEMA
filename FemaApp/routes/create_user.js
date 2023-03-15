var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectAll("`ITEM REQUEST`").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('create_user', { title: "Create User", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {
  // For item input:
  var item_name = req.body.item_name;
  var item_quantity = req.body.item_quantity;
  var item_address = req.body.item_address;

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

  // Add default fields
  formKeys.push("f_orderer");
  formData.push("1");

  sqlControl.insertInto("`ITEM REQUEST`", formKeys, formData).then(
    function(value) {
      sqlControl.selectAll("`ITEM REQUEST`").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Display the page
          res.render('create_user', { title: "Create User", itemsData: sqlParse.sqlFormat(value) });
        }
      );
    }
  );

  
});

module.exports = router;
