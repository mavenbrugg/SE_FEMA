
// Get vars for elements
let itemsTable = document.getElementById("itemsTable");
let driverForm = document.getElementById("driverForm");


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
generateTable(itemsTable, rows, "itemsTable", ["itemStatus",]);







