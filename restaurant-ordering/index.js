import { menuArray } from '/data.js'

const orderSection = document.getElementById('order-section')
const instructionsSection = document.getElementById('instructions-section')
const orderItemsEl = document.getElementById('order-items')
const orderTotalEl = document.querySelector('#order-total p')
// const purchaseBtn = document.getElementById('purchase-btn')

const orders = {}

document.addEventListener('click', function(e){
  const { add, remove } = e.target.dataset
  if (add) {
    handleAddClick(Number(add))
  } else if (remove) {
    handleRemoveClick(Number(remove))
  }
  toggleOrderSection()
})

function handleAddClick(itemId){
  if (orders[itemId]) {
    orders[itemId].quantity++
  } else {
    const item = menuArray.find(item => item.id === itemId)
    orders[itemId] = {...item, quantity: 1 }
  }
  return displayOrder()
}

function handleRemoveClick(itemId) {
  if (orders[itemId]) {
    orders[itemId].quantity--
    if (orders[itemId].quantity === 0) {
      delete orders[itemId]
    }
  }
  return displayOrder()
}

function toggleOrderSection(){
  const hasOrders = Object.keys(orders).length > 0
  orderSection.classList.toggle('hidden', !hasOrders)
  instructionsSection.classList.toggle('hidden', hasOrders)
}

function getMenuHtml(menuArr) {
  return menuArr.map(item => {
    const { name, ingredients, id, price, emoji } = item
    return `
          <li class="item-block">
            <div class="emoji">${emoji}</div>
            <div>
              <h3>${name}</h3>
              <p class="ingredients">${ingredients.join(', ')}</p>
              <p class="price">£${price}</p>
            </div>
            <button id="add-btn" class="add-btn" data-add=${id}>
              <i class="fa-solid fa-plus" data-add="${id}"></i>
            </button>
          </li>
    `
  }).join('')
}

function displayOrder() {
  const orderList = Object.values(orders).map(item => {
    return `
        <li class="order-item-info">
          <h3>${item.name} x ${item.quantity}</h3>
          <button id="remove-btn" data-remove=${item.id}>remove</button>
          <p>£${item.price * item.quantity}</p>
        </li>
    `
  }).join('')

  orderItemsEl.innerHTML = orderList
  updateOrderTotal()
}

function calculateTotal() {
  return Object.values(orders).reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

function updateOrderTotal() {
  const total = calculateTotal()
  return orderTotalEl.textContent = `£${total}`
}

function renderMenu() {
  document.getElementById('menu-items').innerHTML = getMenuHtml(menuArray)
}

renderMenu()
