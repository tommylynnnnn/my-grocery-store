let money = 100;

let stock = {
  apples: 0,
  bread: 0
};

function updateUI() {
  document.getElementById("money").innerText = money;
  document.getElementById("applesStock").innerText = stock.apples;
  document.getElementById("breadStock").innerText = stock.bread;
}

// Restock items
function restock(item) {
  if (item === "apples" && money >= 5) {
    money -= 5;
    stock.apples += 5;
  }

  if (item === "bread" && money >= 8) {
    money -= 8;
    stock.bread += 3;
  }

  updateUI();
}

// Customer system
function customerBuy() {
  let choices = ["apples", "bread"];
  let item = choices[Math.floor(Math.random() * choices.length)];

  if (stock[item] > 0) {
    stock[item]--;
    money += item === "apples" ? 3 : 6;
  }

  updateUI();
}

// Customers arrive every 2 seconds
setInterval(customerBuy, 2000);

updateUI();
