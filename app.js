// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAfF69Cuq3OnDEcdPk1-XhGwOuD1oG0tSg",

  authDomain: "sample-timer.firebaseapp.com",

  projectId: "sample-timer",

  storageBucket: "sample-timer.appspot.com",

  messagingSenderId: "356807541178",

  appId: "1:356807541178:web:58315031bcf9377d0cdd83",

  measurementId: "G-WWE7P1FCGZ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getDatabase();

var input = document.getElementById("input");
var list = document.getElementById("list");

window.addTask = function () {
  var value = input.value;

  var obj = {
    todo: value,
  };

  var dataRef = push(ref(database, "todos/"));
  obj.id = dataRef.key;

  set(dataRef, obj);

  input.value = "";
};

function getTodos() {
  var dataRef = ref(database, "todos/");

  onValue(dataRef, function (data) {
    var dataObj = data.val();
    var dataList = Object.values(dataObj || {});
    render(dataList);
  });
}
getTodos();

window.edit = function (value) {
  var val = prompt("Enter updated value");
  var editTodo = {
    todo: val,
    id: value,
  };

  var dataRef = ref(database, `todos/${value}`);
  update(dataRef, editTodo);
};

window.del = function (key) {
  remove(ref(database, `todos/${key}`));
};

function render(dataArr) {
  list.innerHTML = "";
  for (var i = 0; i < dataArr.length; i++) {
    list.innerHTML += `<li class= p-2>${dataArr[i].todo}<button onclick="edit('${dataArr[i].id}')" class="ms-4 mx-2 btn btn-warning">Edit</button><button class=" mx-2 btn btn-danger" onclick="del('${dataArr[i].id}')">Delete</button></li>`;
  }
}
