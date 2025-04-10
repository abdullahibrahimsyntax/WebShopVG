document.addEventListener('DOMContentLoaded', function () {
    // Kontrollera om orderData saknas och skapa en standardstruktur
    if (!localStorage.getItem('orderData')) {
        const defaultOrderData = {
            orderId: null,
            orderDate: null,
            customer: null,
            cart: []
        };
        localStorage.setItem('orderData', JSON.stringify(defaultOrderData));
    }

    // Kontrollera om currentOrder saknas och skapa en standardstruktur
    if (!localStorage.getItem('currentOrder')) {
        const defaultOrder = {
            orderId: null,
            orderDate: null,
            customer: {
                name: '',
                email: '',
                phone: '',
                address: ''
            },
            cart: [] // Kopiera innehållet från varukorgen här vid beställning
        };
        localStorage.setItem('currentOrder', JSON.stringify(defaultOrder));
    }

    // Hämta varukorgen från localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartDetails');

    // Rensa tidigare innehåll i varukorgscontainern
    cartContainer.innerHTML = '';

    // Kontrollera om varukorgen är tom och visa ett meddelande
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Din varukorg är tom!</p>';
        return;
    }

    // Visa varukorgens innehåll och beräkna totalsumman
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        // Skapa en visuell representation av varje produkt i varukorgen
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <img src="${item.image}" alt="${item.title}" class="img-thumbnail" style="width: 100px; height: 100px; margin-right: 10px;">
                <p>${item.title} - Antal: ${item.quantity} - Pris: ${item.price} kr</p>
                <p>Summa: ${itemTotal} kr</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Visa totalsumman längst ner i varukorgen
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Totalsumma: ${total} kr</strong>`;
    cartContainer.appendChild(totalElement);

    // Hantera formulärinlämning för att skapa en ny order
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hämta kunduppgifter från formuläret
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        // Kontrollera att alla fält är ifyllda
        if (!name || !email || !phone || !address) {
            alert('Vänligen fyll i alla fält!');
            return;
        }

        // Skapa en ny order med kunduppgifter och varukorgens innehåll
        const newOrder = {
            orderId: Math.floor(Math.random() * 100000).toString(),
            orderDate: new Date().toLocaleDateString(),
            customer: { name, email, phone, address },
            cart: cart // Kopiera varukorgens innehåll
        };

        // Spara den nya ordern i localStorage
        localStorage.setItem('currentOrder', JSON.stringify(newOrder));

        // Rensa varukorgen från localStorage
        localStorage.removeItem('cart');

        // Skicka användaren till kvittosidan
        window.location.href = 'kvitto.html';
    });
});
