
// Get vars for elements
let itemsTable = document.getElementById("itemsTable");
let supplierForm = document.getElementById("supplierForm");


/*----- Control Table -----*/ 

// Get table data from page and split into an array
let tableData = document.getElementById("hiddenItemsData").innerHTML.split("\n");

// Array of row objects
let rows = [];
// Get rows from tableData
for (const obj of tableData) {
  if (obj.length != 0) {rows.push(JSON.parse(obj)); }; // omit the last empty string
};

console.log(rows);


// Generate Items table (from other file)
// generateTable(itemsTable, rows, "itemsTable", ["completion_status", "current_street", "current_city",
//  "current_state", "current_zip", "destination_street", "destination_city", "destination_state",
//   "destination_zip", "f_orderer", "s_supplier", "dc_intermediate"]);

generateTable(itemsTable, rows, "itemsTable", ["completion_status", "current_street", "current_city",
 "current_state", "current_zip", "f_orderer", "s_supplier", "dc_intermediate"]);







