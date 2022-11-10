"use strict";
console.log("uzd.js");

const divEl = document.getElementById("cards");
const btnEl = document.getElementById("get1");
const sortBtnEl = document.getElementById("sort");
const listBtnEl = document.getElementById("getList");

const listDivEl = document.createElement("div");
listDivEl.className = "container listDiv";
document.body.append(listDivEl);
const listDivEl1 = document.createElement("div");
const listDivEl2 = document.createElement("div");

listDivEl.append(listDivEl1, listDivEl2);

const ulEl = document.createElement("ul");
listDivEl1.append(ulEl);

async function fetchData() {
  const response = await fetch("https://reqres.in/api/users?page=1.");
  const data = await response.json();
  return data;
}

function createCards(data) {
  divEl.innerHTML = "";
  data.forEach((pObj) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card card--user";
    divEl.append(cardEl);

    const h2El = document.createElement("h2");
    h2El.textContent = `${pObj["first_name"]} ${pObj["last_name"]}`;
    const pEl = document.createElement("p");
    pEl.textContent = `${pObj["email"]}
    (id: ${pObj["id"]})`;
    const imgEl = document.createElement("img");
    imgEl.src = pObj.avatar;
    cardEl.append(imgEl, h2El, pEl);
  });
}

function createList(data) {
  divEl.innerHTML = "";
  listDivEl1.innerHTML = "";
  listDivEl2.innerHTML = "";
  data.forEach((pObj) => {
    const liEl = document.createElement("li");
    liEl.textContent = `${pObj.first_name} ${pObj.last_name} ${pObj.id}`;
    liEl.style.cursor = "pointer";
    listDivEl1.append(liEl);
    liEl.addEventListener("click", (event) => {
      return getFetchedUser(event.target.textContent).then((user) =>
        createUserCard(user[0])
      );
    });
  });
}
function createUserCard(user) {
  listDivEl2.innerHTML = "";
  const cardEl = document.createElement("div");
  cardEl.className = "card card--user";
  listDivEl2.append(cardEl);

  const h2El = document.createElement("h2");
  h2El.textContent = `${user["first_name"]} ${user["last_name"]}`;
  const pEl = document.createElement("p");
  pEl.textContent = `${user["email"]}
    (id: ${user["id"]})`;
  const imgEl = document.createElement("img");
  imgEl.src = user.avatar;
  cardEl.append(imgEl, h2El, pEl);
}

function getFetchedUser(username) {
  const usernameArr = username.split(" ");
  return fetchData().then((fdata) => {
    return fdata.data.filter((fd) => Number(fd.id) === Number(usernameArr[2]));
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

listBtnEl.addEventListener("click", () => {
  return fetchData().then((fdata) => createList(fdata.data));
});
