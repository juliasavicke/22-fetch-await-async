"use strict";
console.log("fetch.js");

//parsisiusti user.json

fetch("data/user.json")
  .then((response) => response.json())
  .then((data) => console.log("data ===", data))
  .catch((err) => console.warn(err));
