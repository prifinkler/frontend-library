import { menuArray } from '/data.js'
const orderSection = document.getElementById('order-section')
const orders = []

document.addEventListener('click', function(e){
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove)
  }
  toggleOrderSection()
})

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

function handleAddClick(itemId){
  const index = Number(itemId)
  orders.push(menuArray[index])
  return displayOrder()
}

function handleRemoveClick(itemId) {
  const index = menuArray.indexOf(Number(itemId))
  orders.splice(index, 1)
  return displayOrder()
}

function toggleOrderSection(){
  if (orders.length > 0) {
    orderSection.classList.remove('hidden')
  } else {
    orderSection.classList.add('hidden')
  }
}

function displayOrder() {
  const orderList = orders.map(item => {
    return `
        <li class="order-item-info">
          <h3>${item.name}</h3>
          <button id="remove-btn" data-remove=${item.id}>remove</button>
          <p>£${item.price}</p>
        </li>
    `
  }).join('')
  displayOrderTotal(orders)
  return document.getElementById('order-items').innerHTML = orderList
}

function displayOrderTotal(orderArr) {
  const total = orderArr.reduce((total, currentItem) => {
    return total + currentItem.price
  }, 0)
  return document.querySelector('#order-total p').textContent = `£${total}`
}

function render(){
  document.getElementById('menu-items').innerHTML = getMenuHtml(menuArray)
}

render()
