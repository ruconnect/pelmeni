let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    // Количество товаров в кнопке
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    // Рендер товаров в модальном окне
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div><strong>${item.name}</strong> x${item.quantity}</div>
            <div>${itemTotal} ₽</div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('cart-total').innerText = totalPrice;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    alert('Спасибо за заказ! Наш менеджер (или сам Шлёпа) свяжется с вами в ближайшее время для подтверждения доставки.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Закрытие модалки при клике вне её
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
