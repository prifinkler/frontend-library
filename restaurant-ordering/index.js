import { menuArray } from '/data.js'

function getItemsHtml() {
  return menuArray.map(item => {
    const { name, ingredients, id, price, emoji } = item
    return `
          <li class="item-block">
            <div class="emoji">${emoji}</div>
            <div>
              <h3>${name}</h3>
              <p class="ingredients">${ingredients.join(', ')}</p>
              <p class="price">£${price}</p>
            </div>
            <button id="add-btn" class="add-btn"><i class="fa-solid fa-plus"></i></button>
          </li>
    `
  }).join('')
}

document.getElementById('menu-items').innerHTML = getItemsHtml()
