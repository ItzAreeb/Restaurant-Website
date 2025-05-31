let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    saveCart();
    updateCart();
    showPopup();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items list
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
      <div>
        <span>${item.name}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div class="cart-item-controls">
        <button class="decrement-btn" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="increment-btn" data-index="${index}">+</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to the new buttons
    document.querySelectorAll('.increment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            saveCart();
            updateCart();
        });
    });

    document.querySelectorAll('.decrement-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Remove if quantity would go to 0
            }
            saveCart();
            updateCart();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            saveCart();
            updateCart();
        });
    });
}

function showPopup() {
    const popup = document.getElementById('popup-message');
    if (popup) {
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 2000);
    }
}

saveCart();
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