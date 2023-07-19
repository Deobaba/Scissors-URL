const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

function toggleInputFields(headingId) {
  var inputFields = document
    .getElementById(headingId)
    .getElementsByClassName("input-fields")[0];
  if (inputFields.style.display === "none") {
    inputFields.style.display = "block";
  } else {
    inputFields.style.display = "none";
  }
}





