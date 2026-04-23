let current = "";

function input(value) {
  current += value;
  document.getElementById("result").innerText = current;
}

function clearAll() {
  current = "";
  document.getElementById("result").innerText = "0";
}

function calculate() {
  try {
    current = eval(current).toString();
    document.getElementById("result").innerText = current;
  } catch {
    current = "";
    document.getElementById("result").innerText = "Error";
  }
}

function sign() {
  current = (-parseFloat(current)).toString();
  document.getElementById("result").innerText = current;
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  document.getElementById("result").innerText = current;
}

function openCalc() {
  window.location.href = "calc.html";
}
function goBack() {
  window.location.href = "index.html";
}

function backspace() {
  current = current.slice(0, -1);
  document.getElementById("result").innerText = current || "0";
}

function square() {
  current = (parseFloat(current) ** 2).toString();
  document.getElementById("result").innerText = current;
}

function sqrt() {
  current = Math.sqrt(parseFloat(current)).toString();
  document.getElementById("result").innerText = current;
}

function factorialFunc() {
  let n = parseInt(current);
  if (n < 0) {
    current = "Error";
  } else {
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    current = res.toString();
  }
  document.getElementById("result").innerText = current;
}

function addTripleZero() {
  current += "000";
  document.getElementById("result").innerText = current;
}

function changeResultColor() {
  const el = document.getElementById("result");
  el.style.backgroundColor =
    el.style.backgroundColor === "black" ? "green" : "black";
}

function randomNumber() {
  current = Math.floor(Math.random() * 100).toString();
  document.getElementById("result").innerText = current;
}