
/*----- Control which form is shown -----*/
let formSelect = document.getElementById("formSelect");
let itemForm = document.getElementById("itemForm");
let laborForm = document.getElementById("laborForm");
let itemsTable = document.getElementById("itemsTable");
let laborTable = document.getElementById("laborTable");


// function changeForm() {
//   let formSelected = formSelect.value;
//   if (formSelected == "item") {
//     itemForm.style.display = "block";
//     laborForm.style.display = "none";
//     itemsTable.style.display = "block";
//     laborTable.style.display = "none";
//   } else {
//     itemForm.style.display = "none";
//     laborForm.style.display = "block";
//     itemsTable.style.display = "none";
//     laborTable.style.display = "block";
//   }
//   console.log(formSelected);
// };


// Control which form and table shows
let currentURL = window.location.href;
if (currentURL.includes("items")) {
  // Show/hide form and table
  itemForm.style.display = "block";
  laborForm.style.display = "none";
  itemsTable.style.display = "block";
  laborTable.style.display = "none";
  //Auto Select formSelect
  formSelect.value = "item";
} else {
  // Show/hide form and table
  itemForm.style.display = "none";
  laborForm.style.display = "block";
  itemsTable.style.display = "none";
  laborTable.style.display = "block";
  //Auto Select formSelect
  formSelect.value = "labor";
}

function changeForm() {
  if (currentURL.includes("items")) { window.location.href = "./labor"; }
  else { window.location.href = "./items"; }
};

formSelect.onchange = changeForm;


/*----- Control Table -----*/ 

// Get table data from page and split into an array
let tableData = document.getElementById("hiddenItemsData").innerHTML.split("\n");

// Array of row objects
let rows = [];
// Get rows from tableData
for (const obj of tableData) {
  if (obj.length != 0) {rows.push(JSON.parse(obj)); }; // omit the last empty string
};

// Generate Items table (from other file)
generateTable(itemsTable, rows, "itemsTable", []);

// Generate Labor table
generateTable(laborTable, rows, "laborTable", []);















