var mysql = require('mysql');

// Connect to the database hosted on computer
function createConnection() {
  return (mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sql1234!",
    database: "fema_schema",
  }));
};


// Function that creates a database
exports.createDatabase = function() {
  con = createConnection();
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
};


// Create a table
exports.createTable = function() {
  con = createConnection();
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE Labor (laborID INT NOT NULL AUTO_INCREMENT, laborName VARCHAR(255), laborStartDate VARCHAR(255), laborEndDate VARCHAR(255), laborAddress VARCHAR(255), PRIMARY KEY(laborID));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
};


// Drop a table
exports.dropTable = function() {
  con = createConnection();
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "DROP TABLE Items;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table dropped");
    });
  });
};


// // Insert a row into a table
// exports.insertInto = async function(itemName, itemQty, itemAddr) {
//   // Create a promise so that the app waits for the insert to finish
//   let insertPromise = new Promise(function(resolve) {
//     con = createConnection();
//     con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//       var sql = "INSERT INTO Items (itemName, itemQty, itemAddress) VALUES ( '" + itemName + "', " + itemQty.toString() + ", '" + itemAddr + "');";
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//         resolve(result);
//       });
//     });
//   });

//   // Wait for the insert to finish
//   promiseAnswer = await insertPromise;

//   return (promiseAnswer);
// };


// Insert a row into a table
exports.insertInto = async function(tableName, colNames, colValues) {
  // Create a promise so that the app waits for the insert to finish
  let insertPromise = new Promise(function(resolve) {
    con = createConnection();
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");

      // Generate SQL string based on function input
      let sql = `INSERT INTO ${tableName} (`;
      for (const col of colNames) { // Add column names
        sql = sql.concat(`${col}, `);
      };
      sql = sql.concat(") VALUES (");
      for (const col of colValues) { // Add column values
        sql = sql.concat(`"${col}", `);
      };
      sql = sql.concat(");");
      sql = sql.replace(", )", ")"); // Remove string artifacts (extra comma after names and vals)
      sql = sql.replace(", )", ")"); // Remove string artifacts (extra comma after names and vals)
      
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        resolve(result);
      });
    });
  });

  // Wait for the insert to finish
  promiseAnswer = await insertPromise;

  return (promiseAnswer);
};


// Select all rows from a table
exports.selectAll = async function(tableName) {
  // Create a promise so that the app waits for the select to finish
  let selectPromise = new Promise( function(resolve) {
    con = createConnection();
    con.connect(function(err) {
      if (err) throw err;
      con.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        resolve(result);
      });
    });
  });

  // Wait for the select to finish
  promiseAnswer = await selectPromise;

  return (promiseAnswer);
};


// Select inputted rows from a table
exports.selectRows = async function(tableName, colName, colRestriction) {
  // Create a promise so that the app waits for the select to finish
  let selectPromise = new Promise( function(resolve) {
    con = createConnection();
    con.connect(function(err) {
      if (err) throw err;
      con.query(`SELECT * FROM ${tableName} WHERE ${colName}="${colRestriction}"`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        resolve(result);
      });
    });
  });

  // Wait for the select to finish
  promiseAnswer = await selectPromise;

  return (promiseAnswer);
};


// Delete given row from a table based on ID
exports.deleteRow = async function(tableName, idName, rowID) {
  // Create a promise so that the app waits for the select to finish
  let deletePromise = new Promise( function(resolve) {
    con = createConnection();
    con.connect(function(err) {
      if (err) throw err;
      con.query(`DELETE FROM ${tableName} WHERE ${idName}=${rowID};`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        resolve(result);
      });
    });
  });

  // Wait for the select to finish
  promiseAnswer = await deletePromise;

  return (promiseAnswer);
};


// Update given row from a table based on ID
exports.updateRow = async function(tableName, idName, rowID, colNames, newVals) {
  // Create a promise so that the app waits for the select to finish
  let updatePromise = new Promise( function(resolve) {
    con = createConnection();
    con.connect(function(err) {
      if (err) throw err;

      // Construct sql query
      let sqlString = "";
      for (let i = 0; i < colNames.length; i++) {
        sqlString += `${colNames[i]}="${newVals[i]}", `
      }
      sqlString += "<end>";
      sqlString = sqlString.replace(", <end>", ""); // Remove string artifacts (extra comma after names and vals)

      con.query(`UPDATE ${tableName} SET ${sqlString} WHERE ${idName}=${rowID};`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        resolve(result);
      });
    });
  });

  // Wait for the select to finish
  promiseAnswer = await updatePromise;

  return (promiseAnswer);
};










