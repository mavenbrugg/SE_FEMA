console.log("This is a test, and it works!");

// Control which form is shown
let formSelect = document.getElementById("formSelect");
let itemForm = document.getElementById("itemForm");
let laborForm = document.getElementById("laborForm");

function changeForm() {
  let formSelected = formSelect.value;
  if (formSelected == "item") {
    itemForm.style.display = "block";
    laborForm.style.display = "none";
  } else {
    itemForm.style.display = "none";
    laborForm.style.display = "block";
  }
  console.log(formSelected);
};

formSelect.onchange = changeForm;

changeForm();

