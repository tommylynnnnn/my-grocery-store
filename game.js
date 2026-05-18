// =====================
// MY GROCERY STORE
// GRID TYCOON VERSION
// =====================

// 💰 MONEY
let money = 100;

// 📦 STOCK SYSTEM (optional early use)
let stock = {
  apples: 10,
  bread: 5
};

// 🧱 GRID SETUP
const gridSize = 10;

let grid = [];
let customers = [];
let shelves = [];

// create empty grid
for (let y = 0; y < gridSize; y++) {
  let row = [];
  for (let x = 0; x < gridSize; x++) {
    row.push("empty");
  }
  grid.push(row);
}

// =====================
// UI UPDATE
// =====================
function updateUI() {
  document.getElementById("money").innerText = money;
}

// =====================
// PLACE SHELVES
// =====================
function addShelf(x, y) {
  grid[y][x] = "shelf";
  shelves.push({ x, y });
}

// starter shelves
addShelf(2, 2);
addShelf(5, 5);
addShelf(7, 3);

// =====================
// RESTOCK (simple system)
// =====================
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

// =====================
// CUSTOMER SPAWNING
// =====================
function spawnCustomer() {
  customers.push({
    x: 0,
    y: Math.floor(Math.random() * gridSize),
    target: null
  });
}

// =====================
// CUSTOMER MOVEMENT
// =====================
function moveCustomers() {
  customers.forEach(c => {
    if (shelves.length === 0) return;

    let targetShelf = shelves[Math.floor(Math.random() * shelves.length)];
    c.target = targetShelf;

    // simple movement (no pathfinding yet)
    if (c.x < c.target.x) c.x++;
    else if (c.x > c.target.x) c.x--;

    if (c.y < c.target.y) c.y++;
    else if (c.y > c.target.y) c.y--;
  });
}

// =====================
// BUYING SYSTEM
// =====================
function handleBuying() {
  customers.forEach(c => {
    shelves.forEach(s => {
      if (c.x === s.x && c.y === s.y) {
        money += 3; // sale value
      }
    });
  });
}

// =====================
// RENDER GRID
// =====================
function render() {
  const store = document.getElementById("store");
  store.innerHTML = "";

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {

      let tile = document.createElement("div");
      tile.classList.add("tile");

      // shelves
      if (grid[y][x] === "shelf") {
        tile.classList.add("shelf");
      }

      // customers
      customers.forEach(c => {
        if (c.x === x && c.y === y) {
          tile.classList.add("customer");
        }
      });

      store.appendChild(tile);
    }
  }
}

// =====================
// GAME LOOP
// =====================
function gameLoop() {
  moveCustomers();
  handleBuying();
  render();
  updateUI();
}

// start loops
setInterval(gameLoop, 500);
setInterval(spawnCustomer, 2500);

// initial render
updateUI();
render();
