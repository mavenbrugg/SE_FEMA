
// Get vars for elements
let formSelect = document.getElementById("formSelect");
let femaForm = document.getElementById("femaForm");
let supplierForm = document.getElementById("supplierForm");
let driverForm = document.getElementById("driverForm");
let distributionCenterForm = document.getElementById("distributionCenterForm");
let laborerForm = document.getElementById("laborerForm");


// let laborTable = document.getElementById("laborTable");
// let workerForm = document.getElementById("workerForm");


// Control which form shows
function changeForm() {
  let selectedUserType = formSelect.value; // get the user type selected 
  let forms = document.getElementsByClassName("Form"); // get array of forms
  for (const form of forms) {
    console.log("It works!");
    if (form.id == selectedUserType) {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  }
};

formSelect.onchange = changeForm;
changeForm();


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
// generateTable(laborTable, rows, "laborTable", ["completion_status", "f_requester", "l_volunteer"]);







