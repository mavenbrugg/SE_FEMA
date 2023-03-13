// Table Generator
// function generateTable(docBody, rows, tableID) {
function generateTable(table, rows, tableID, omittedColumns) {
  // Get the key names that will become the column names
  colNames = Object.keys(rows[0]);

  // Check if any tables exists
  const tables = document.getElementsByTagName("table");

  // Create variables for reference
  let tableHead;
  let tableBody;

  // // If no table exists, create one
  // if (tables.length == 0) {
  //   // Create <table>, <thead>, and <tbody> elements
  //   table = document.createElement("table");
  //   table.id = (tableID);
  //   tableHead = document.createElement("thead");
  //   tableBody = document.createElement("tbody");

  //   // Create table head
  //   // Create the top row
  //   const topRow = document.createElement("tr");
  //   // Create the columns
  //   for (let h = 0; h < colNames.length; h++) {
  //     // Create a <th> element and name it
  //     const currentColumn = document.createElement("th");
  //     currentColumn.innerHTML = colNames[h];

  //     // Append the column <td> into the row <tr>
  //     topRow.appendChild(currentColumn);

  //     // Append the row <tr> into <tbody>
  //     tableBody.appendChild(topRow);
  //   };
  // } else {
  //   table = tables[0];
  //   tableBody = table.querySelectorAll("tbody")[0];
  // }

  // Create columns
  // Check how many columns there already are
  tableBody = table.querySelectorAll("tbody")[0];
  let numColumns = tableBody.querySelectorAll("tr").length;

  for (let j = numColumns-1; j < rows.length; j++) {
    // Create a new row
    const currentRow = document.createElement("tr");

    // Create cells
    for (let i = 0; i < colNames.length; i++) {
      // Skip omitted columns
      if (omittedColumns.includes(colNames[i])) {
        continue;
      };

      // creates a <td> element
      const currentCell = document.createElement("td");
      currentCell.innerHTML = rows[j][colNames[i]];
      
      
      // Append the cell <td> into the row <tr>
      currentRow.appendChild(currentCell);
    }
    // Append the row <tr> into <tbody>
    tableBody.appendChild(currentRow);
  }

  // Append <tbody> into <table>
  table.appendChild(tableBody);
  // // Append <table> into <body>
  // docBody.appendChild(table);

};



