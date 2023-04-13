var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "Requested").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted form
router.post('/', function(req, res, next) {
  // Inputs from form:
  let supplierName = req.body.supplierName;
  let current_street = req.body.current_street;
  let current_city = req.body.current_city;
  let current_state = req.body.current_state;
  let current_zip = req.body.current_zip;
  let i_request_id = req.body.i_request_id;
  let item_quantity = req.body.item_quantity;
  let s_supplier = req.body.s_supplier;

  // Get the item request the user specified
  sqlControl.selectRows("`ITEM REQUEST`", "i_request_id", i_request_id).then( 
    function(value) {
      // Check if the supplier committed more items than the FEMA director requested
      let requested_qty = parseInt(value[0]["item_quantity"]);

      // If supplier commits > amount left in the request, make committed amount equal to amount requested
      if (item_quantity > requested_qty) { item_quantity = requested_qty; };

      // Get the amount left (not committed yet)
      let amount_left = requested_qty - item_quantity; 

      // Copy old request data to new request
      let cols = [];
      let rows = [];
      for (key in value[0]) {
        if (key == "item_quantity") {
          cols.push(key);
          rows.push(item_quantity);
        } else if (key == "current_street") {
          cols.push(key);
          rows.push(current_street);
        } else if (key == "current_city") {
          cols.push(key);
          rows.push(current_city);
        } else if (key == "current_state") {
          cols.push(key);
          rows.push(current_state);
        } else if (key == "current_zip") {
          cols.push(key);
          rows.push(current_zip);
        } else if (key == "s_supplier") {
          cols.push(key);
          rows.push(s_supplier);
        } else if (key == "completion_status") {
          cols.push(key);
          rows.push("committed");
        } else if (key != "i_request_id" && key != "dc_intermediate") {
            cols.push(key);
            rows.push(value[0][key]);
        }
      }

      // Create new order with committed items
      sqlControl.insertInto("`ITEM REQUEST`", cols, rows).then(
        function(value) {

          // Update the old order's item quantity
          sqlControl.updateRow("`ITEM REQUEST`", "i_request_id", i_request_id, ["item_quantity"], [amount_left]).then(
            function(value) {
              // If the old order's quantity is <= 0, delete it
              if (amount_left <= 0) {
                sqlControl.deleteRow("`ITEM REQUEST`", "i_request_id", i_request_id).then(
                  function(value) {
                    // Display page
                    sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "Requested").then( // .then makes sure it waits for the SQL request
                      function(value) {
                        // Display the page
                        res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
                      }
                    );
                  }
                );
              } else {
                // Display page
                sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "Requested").then( // .then makes sure it waits for the SQL request
                      function(value) {
                        // Display the page
                        res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
                      }
                    );
              }
            }
          );
        }
      );
    }
  );

  // sqlControl.updateRow("`ITEM REQUEST`", "i_request_id", i_request_id, ["completion_status", "current_street",
  //  "current_city", "current_state", "current_zip", "s_supplier"], ["committed", current_street, current_city, current_state,
  //   current_zip, s_supplier]).then( // .then makes sure it waits for the SQL request
  //   function(value) {
  //     sqlControl.selectRows("`ITEM REQUEST`", "completion_status", "Requested").then( // .then makes sure it waits for the SQL request
  //       function(value) {
  //         // Display the page
  //         res.render('supplier', { title: "Supplier", itemsData: sqlParse.sqlFormat(value) });
  //       }
  //     );
  //   }
  // );

  
});

module.exports = router;
