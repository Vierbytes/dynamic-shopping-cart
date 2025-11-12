const productNameInput = document.getElementById('product-name')
const productPriceInput = document.getElementById('product-price')
const addProductButton = document.getElementById('add-product')
const cart = document.getElementById('cart')
const totalPriceSpan = document.getElementById('total-price')

let totalPrice = 0

function updateTotalPrice(amount) {
    totalPrice += amount
    totalPriceSpan.textContent = totalPrice.toFixed(2)
}

function removeItem(event) {
    const item = event.target.closest('li')
    const price = parseFloat(item.dataset.price)
    updateTotalPrice(-price)
    item.remove()
}

function addProduct() {
    const productName = productNameInput.value.trim()
    const productPrice = parseFloat(productPriceInput.value)

    if (productName === '') {
        alert('Please enter a product name!')
        return
    }

    if (isNaN(productPrice) || productPrice <= 0) {
        alert('Please enter a valid price greater than 0!')
        return
    }

    const listItem = document.createElement('li')

    listItem.classList.add('cart-item')

    listItem.dataset.price = productPrice

    const itemText = document.createElement('span')

    itemText.textContent = `${productName} - $${productPrice.toFixed(2)}`

    const removeButton = document.createElement('button')

    removeButton.textContent = 'Remove'

    removeButton.addEventListener('click', removeItem) // Connect to removeItem function

    listItem.appendChild(itemText) // Add the text to the list item

    listItem.appendChild(removeButton) // Add the button to the list item

    cart.appendChild(listItem)

    updateTotalPrice(productPrice)

    productNameInput.value = ''
    productPriceInput.value = ''
    productNameInput.focus()
}

addProductButton.addEventListener('click', addProduct)

productPriceInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addProduct()
    }
})