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
      res.render('fema_director', { title: "Fema Director", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {

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
  // Add completion status 
  formKeys.push("completion_status");
  formData.push("requested");

  // Get item requests with the same name as the one enterred
  sqlControl.selectRows("`ITEM REQUEST`", formKeys[0], formData[0]).then(
    function(value) {
      let foundMatch = false;

      // Check if each entry with matching name matches the rest of the data enterred
      if (value.length != 0) {

        for (entry of value) {
          let same = true;

          // Check if each key matches
          for (let i = 0; i < formKeys.length; i++) {
            // Check all user-enterred fields except quantity
            if (formKeys[i] != "item_quantity" && entry[formKeys[i]] != formData[i]) { same = false; }
          }

          // Update the item request quantity if matching request found
          if (same) {
            // Get the new quantity
            let addedQty = formData[formKeys.indexOf("item_quantity")];
            let newQty = (parseInt(addedQty) + parseInt(entry["item_quantity"])).toString();

            sqlControl.updateRow("`ITEM REQUEST`", "i_request_id", entry["i_request_id"], ["item_quantity"], [newQty]).then (
              function(value) {

                sqlControl.selectAll("`ITEM REQUEST`").then( // .then makes sure it waits for the SQL request
                  function(value) {
                    // Display the page
                    res.render('fema_director', { title: "Fema Director", itemsData: sqlParse.sqlFormat(value) });
                  }
                );
              }
            );

            // End the loop if same request found
            foundMatch = true;
            break;
          }
        }
      }

      // If no matching row, create new row
      if (!foundMatch) {
        sqlControl.insertInto("`ITEM REQUEST`", formKeys, formData).then(
          function(value) {
            sqlControl.selectAll("`ITEM REQUEST`").then( // .then makes sure it waits for the SQL request
              function(value) {
                // Display the page
                res.render('fema_director', { title: "Fema Director", itemsData: sqlParse.sqlFormat(value) });
              }
            );
          }
        );
      }
    }
  ); 
});

module.exports = router;
