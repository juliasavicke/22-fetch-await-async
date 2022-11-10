"use strict";
console.log("uzd.js");

const divEl = document.getElementById("cards");
const btnEl = document.getElementById("get1");
const sortBtnEl = document.getElementById("sort");

async function fetchData() {
  const response = await fetch("https://reqres.in/api/users?page=1.");
  const data = await response.json();
  return data;
}
//.then((data) => createCards(data.data))
//.catch((err) => console.warn(err));
//fetchData();

function createCards(data) {
  divEl.innerHTML = "";
  data.forEach((pObj) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    const h2El = document.createElement("h2");
    h2El.textContent = `${pObj["first_name"]} ${pObj["last_name"]}`;
    const pEl = document.createElement("p");
    pEl.textContent = `Email: ${pObj["email"]}, ID: ${pObj["id"]}`;
    const imgEl = document.createElement("img");
    imgEl.src = pObj.avatar;
    cardEl.append(h2El, pEl, imgEl);
    divEl.append(cardEl);
  });
}

function sortFetchedData(data) {
  divEl.innerHTML = "";
  const sortedData = data.sort(function (a, b) {
    let x = a.first_name.toLowerCase();
    let y = b.first_name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  createCards(sortedData);
}

btnEl.addEventListener("click", () => {
  return fetchData().then((fdata) => createCards(fdata.data));
});

sortBtnEl.addEventListener("click", () => {
  return fetchData().then((fdata) => sortFetchedData(fdata.data));
});
