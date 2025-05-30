let cart = [];

const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('show');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) existingItem.quantity += 1;
    else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    updateCart();
    showPopup();
}

// Update cart UI
function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
      <span>${item.name} (${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
        cartItemsContainer.appendChild(itemElement);
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function showPopup() {
    const popup = document.getElementById('popup-message');
    if (popup) {
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 2000);
    }
}

updateCart();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.shop-container').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.querySelector('img').alt;
            const itemPrice = parseFloat(button.querySelector('h1').textContent.replace('$', ''));
            addToCart(itemName, itemPrice);
        });
    });
});