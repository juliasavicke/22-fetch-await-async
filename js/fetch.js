"use strict";
console.log("fetch.js");

//parsisiusti user.json

function getLocalUser() {
  fetch("data/user.json")
    .then((response) => response.json())
    .then((data) => console.log("data ===", data))
    .catch((err) => console.warn(err));
}

getLocalUser();

//parsisiusti colors.txt
function getLocalText() {
  fetch("data/colors.txt")
    .then((response) => response.text())
    .then((data) => {
      console.log("data ===", data);
      const colorsArr = data.split(", ");
      console.log("colorsArr ===", colorsArr);
    })
    .catch((err) => console.warn(err));
}
getLocalText();

const initHtml = () =>
  fetch("data/footer.html")
    .then((response) => response.text())
    .then((data) => document.body.insertAdjacentHTML("beforeend", data))
    .catch((err) => console.warn(err));
initHtml();
