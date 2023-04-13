var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var sqlControl = require("../public/javascripts/SQLControl.js");
var sqlParse = require("../public/javascripts/SQLEncode.js");

// Used for parsing POSTs
express().use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlControl.selectAll("`APP USER`").then( // .then makes sure it waits for the SQL request
    function(value) {
      // Display the page
      res.render('create_user', { title: "Create User", tableData: sqlParse.sqlFormat(value) });
    }
  );
});

// User submitted item/labor form
router.post('/', function(req, res, next) {

  // Get data submitted with form
  let formKeys = Object.keys(req.body); // Get the keys (column names)
  formKeys.shift(); // Remove the form name

  // Remove trailing form names from keys
  for (let i = 0; i < formKeys.length; i++) {
    formKeys[i] = formKeys[i].replace("_FEMA", "");
    formKeys[i] = formKeys[i].replace("_supplier", "");
    formKeys[i] = formKeys[i].replace("_driver", "");
    formKeys[i] = formKeys[i].replace("_dist", "");
    formKeys[i] = formKeys[i].replace("_laborer", "");
  }

  // Get values
  let formData = [];
  for (const i in req.body) { 
    // Don't consider the form name
    if (i.toString() != "formName") {
      formData.push(req.body[i]); 
    }
  };

  // Get the user type selecter
  let userType = req.body.formName;

  // Add a new user first
  sqlControl.insertInto("`APP USER`", ["user_name", "user_type"], [formData[0], userType]).then(
    function(value) {
      // Get the user that was just added
      sqlControl.selectFirstById("`APP USER`").then( // .then makes sure it waits for the SQL request
        function(value) {
          // Find the user id of the user just created
          userID = value[0]["user_id"];

          // Get the first letter of the user type to add to the user_id
          typeString = userType.toLowerCase()[0] + "_";
          if (userType == "DISTRIBUTION_CENTER") {typeString = "dc_"}; // distribution center has two letters

          // Add user_id to keys and data
          formKeys.push(typeString + "user_id");
          formData.push(userID);
          // Remove the user_name from keys and data
          formKeys.shift();
          formData.shift();

          // Add the new user to its child table
          sqlControl.insertInto(userType, formKeys, formData).then(
            function(value) {
              sqlControl.selectAll("`APP USER`").then(
                function(value) {
                  // Display the page
                  res.render('create_user', { title: "Create User", tableData: sqlParse.sqlFormat(value) });
                }
              )
            }
          )
        }
      );
    }
  );
});

module.exports = router;
