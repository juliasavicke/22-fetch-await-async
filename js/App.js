"use strict";
console.log("uzd.js");

class App {
  mainUsersArr = [];
  el = {};

  constructor() {
    this.initTargets();
    this.initEventListeners();
    this.fetchData();
  }

  initTargets() {
    this.el.divEl = document.getElementById("cards");
    this.el.btnEl = document.getElementById("get1");
    this.el.sortBtnEl = document.getElementById("sort");
    this.el.listBtnEl = document.getElementById("getList");

    this.el.listDivEl = document.createElement("div");
    this.el.listDivEl.className = "container listDiv";
    document.body.append(this.el.listDivEl);
    this.el.listDivEl1 = document.createElement("div");
    this.el.listDivEl2 = document.createElement("div");

    this.el.listDivEl.append(this.el.listDivEl1, this.el.listDivEl2);

    this.el.ulEl = document.createElement("ul");
    this.el.listDivEl1.append(this.el.ulEl);
  }

  fetchData() {
    return fetch("https://reqres.in/api/users?page=1.")
      .then((resp) => resp.json())
      .then((dataInJs) => (this.mainUsersArr = dataInJs.data))
      .catch((err) => console.warn("klaida getData", err));
  }

  createCards(data) {
    this.el.divEl.innerHTML = "";
    data.forEach((pObj) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card card--user";
      this.el.divEl.append(cardEl);

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

  createList(data) {
    this.el.divEl.innerHTML = "";
    this.el.listDivEl1.innerHTML = "";
    this.el.listDivEl2.innerHTML = "";
    data.forEach((pObj) => {
      const liEl = document.createElement("li");
      liEl.textContent = `${pObj.first_name} ${pObj.last_name} ${pObj.id}`;
      liEl.style.cursor = "pointer";
      this.el.listDivEl1.append(liEl);
      liEl.addEventListener("click", (event) => {
        const user = this.getFetchedUser(event.target.textContent);
        this.createUserCard(user[0]);
      });
    });
  }
  createUserCard(user) {
    this.el.listDivEl2.innerHTML = "";
    const cardEl = document.createElement("div");
    cardEl.className = "card card--user";
    this.el.listDivEl2.append(cardEl);

    const h2El = document.createElement("h2");
    h2El.textContent = `${user["first_name"]} ${user["last_name"]}`;
    const pEl = document.createElement("p");
    pEl.textContent = `${user["email"]}
    (id: ${user["id"]})`;
    const imgEl = document.createElement("img");
    imgEl.src = user.avatar;
    cardEl.append(imgEl, h2El, pEl);
  }

  getFetchedUser(username) {
    const usernameArr = username.split(" ");
    console.log(
      "this.mainUsersArr.filter((fd) => Number(fd.id) === Number(usernameArr[2])) ===",
      this.mainUsersArr.filter((fd) => Number(fd.id) === Number(usernameArr[2]))
    );
    return this.mainUsersArr.filter(
      (fd) => Number(fd.id) === Number(usernameArr[2])
    );
  }

  sortFetchedData(data) {
    this.el.divEl.innerHTML = "";
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
    this.createCards(sortedData);
  }

  initEventListeners() {
    this.el.btnEl.addEventListener("click", async () => {
      const fdata = await this.fetchData();
      this.mainUsersArr = fdata;
      console.log("fdata ===", fdata);
      this.createCards(fdata);
    });

    this.el.sortBtnEl.addEventListener("click", async () => {
      this.sortFetchedData(this.mainUsersArr);
    });

    this.el.listBtnEl.addEventListener("click", async () => {
      const fdata = await this.fetchData();
      this.mainUsersArr = fdata;
      this.createList(fdata);
    });
  }
}

const app = new App();
