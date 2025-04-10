document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const clearCartButton = document.getElementById('clearCart');
    const checkoutButton = document.getElementById('checkoutButton');

    // Hämta varukorgen från localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Funktion för att rendera varukorgen
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Din varukorg är tom!</p>';
            cartTotalElement.textContent = '0 kr';
            return;
        }

        cart.forEach((item, index) => {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <img src="${item.image}" alt="${item.title}" class="img-thumbnail" style="width: 50px;">
                    <p>${item.title}</p>
                    <p>${item.quantity} x ${item.price} kr</p>
                    <p>Summa: ${itemTotal} kr</p>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <button onclick="removeItem(${index})">Ta bort</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = `${total} kr`;
    }

    // Funktion för att uppdatera kvantitet
    window.updateQuantity = function (index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Ta bort produkten om kvantiteten är 0
        }
        saveCart();
        renderCart();
    };

    // Funktion för att ta bort en produkt
    window.removeItem = function (index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    // Funktion för att tömma varukorgen
    clearCartButton.addEventListener('click', function () {
        cart = [];
        saveCart();
        renderCart();
    });

    // Funktion för att spara varukorgen till localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Gå till kassan
    checkoutButton.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Din varukorg är tom!');
            return;
        }
        // Spara varukorgen och navigera till kassasidan
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'formular.html';
    });

    // Rendera varukorgen vid sidladdning
    renderCart();
});