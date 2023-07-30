const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login-form');
const snackForm = document.getElementById('snack-form');
const snackList = document.getElementById('snack-list');
const inventorySummary = document.getElementById('inventory-summary');
const totalQuantitySpan = document.getElementById('total-quantity');
const inventoryItemsList = document.getElementById('inventory-items');
const stockActions = document.getElementById('stock-actions');
const outStockItemSelect = document.getElementById('out-stock-item');
const quantityToRemoveInput = document.getElementById('quantity-to-remove');

const correctPassword = 'info';
let loggedIn = false;
const inventory = [];

function login() {
  const enteredPassword = passwordInput.value;

  if (enteredPassword === correctPassword) {
    loggedIn = true;
    loginForm.style.display = 'none';
    snackForm.style.display = 'block';
    snackList.style.display = 'block';
    inventorySummary.style.display = 'block';
    updateStockActions();
  } else {
    alert('密碼錯誤，請重新輸入。');
  }
}

function addItem() {
  if (!loggedIn) {
    alert('請先登入後再進行操作。');
    return;
  }

  const snackName = document.getElementById('snack-name').value;
  const quantity = document.getElementById('quantity').value;

  if (snackName.trim() === '' || quantity.trim() === '') {
    alert('請輸入零食名稱和數量。');
    return;
  }

  const newItem = {
    name: snackName,
    quantity: parseInt(quantity),
  };

  inventory.push(newItem);
  updateInventoryDisplay();
  updateStockActions();
}

function updateInventoryDisplay() {
  totalQuantitySpan.textContent = calculateTotalQuantity();

  while (inventoryItemsList.firstChild) {
    inventoryItemsList.removeChild(inventoryItemsList.firstChild);
  }

  inventory.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.quantity}`;
    inventoryItemsList.appendChild(li);
  });
}

function calculateTotalQuantity() {
  let total = 0;
  inventory.forEach((item) => {
    total += item.quantity;
  });
  return total;
}

function updateStockActions() {
  stockActions.style.display = loggedIn ? 'block' : 'none';

  while (outStockItemSelect.firstChild) {
    outStockItemSelect.removeChild(outStockItemSelect.firstChild);
  }

  inventory.forEach((item, index) => {
    const option = document.createElement('option');
    option.textContent = `${item.name}: ${item.quantity}`;
    option.value = index;
    outStockItemSelect.appendChild(option);
  });
}

function removeItem() {
  if (!loggedIn) {
    alert('請先登入後再進行操作。');
    return;
  }

  const selectedIndex = outStockItemSelect.value;
  const quantityToRemove = parseInt
