import { menuArray } from '/data.js'

const orderSection = document.getElementById('order-section')
const instructionsSection = document.getElementById('instructions-section')
const orderItemsEl = document.getElementById('order-items')
const orderTotalEl = document.querySelector('#order-total p')
const mainEl = document.querySelector('main')
const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')
const paymentName = document.getElementById('name')

let orders = {}

document.addEventListener('click', function(e){
  const { add, remove } = e.target.dataset
  if (add) {
    handleAddClick(Number(add))
  } else if (remove) {
    handleRemoveClick(Number(remove))
  } else if (e.target.id === 'complete-order-btn') {
    handleCompleteOrder()
  } else if (e.target.id === 'payment-modal-close-btn') {
    handleCloseModal()
  }
  toggleOrderSection()
})

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  handleCloseModal()
  orderSection.classList.add('hidden')
  instructionsSection.classList.remove('hidden')
  instructionsSection.classList.add('thanks-msg')
  instructionsSection.innerHTML = `
    <h3>Thanks, ${paymentName.value}! Your order is on its way!
  `
  orders = {}
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

function handleCompleteOrder() {
  paymentModal.style.display = 'block'
  mainEl.classList.add('modal-active')
}

function handleCloseModal() {
  paymentModal.style.display = 'none'
  mainEl.classList.remove('modal-active')
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
            <button id="add-btn" class="add-btn" data-add=${id} aria-label="Add item">
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
          <button id="remove-btn" data-remove=${item.id} aria-label="Remove item">remove</button>
          <p class="price">£${item.price * item.quantity}</p>
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
