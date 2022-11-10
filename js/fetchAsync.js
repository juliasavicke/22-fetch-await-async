"use strict";
console.log("fetchAsync.js");

const pEl = document.getElementById("todo");

// fetch("https://dummyjson.com/todos/1")
//   .then((response) => response.json())
//   .then((todo) => console.log("todo ===", todo))
//   .catch((err) => console.warn("klaida gauti todo", err));

//async fetch

async function getTodo() {
  try {
    const response = await fetch("https://dummyjson.com/todos/1");
    const todo = await response.json();
    console.log("todo ===", todo);
    return todo;
  } catch (error) {
    console.warn("klaida gauti todo", error);
  }
}

const todo1 = getTodo().then((td1) => console.log(td1));
console.log("todo1 ===", todo1);
