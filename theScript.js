// Hämta produktdata från FakeStore API
fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => {
        const container = document.querySelector('.container');
        if (!container) {
            console.error('Fel: Container-elementet hittades inte!');
            return;
        }

        // Rensa containern innan produkter läggs till
        container.innerHTML = '';

        let rowElement;
        products.forEach((product, index) => {
            // Skapa en ny rad för varje 5 produkter
            if (index % 5 === 0) {
                rowElement = document.createElement('div');
                rowElement.className = 'row justify-content-center';
                container.appendChild(rowElement);
            }

            // Skapa en kolumn för varje produkt
            const columnElement = document.createElement('div');
            columnElement.className = 'col-6 col-sm-4 col-md-3 col-lg-2 g-5';

            // Lägg till produktdetaljer i kolumnen
            columnElement.innerHTML = `
                <div class="card">
                    <h4 class="product-title text-center fs-5">${product.title}</h4>
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <p class="text-center product-price">${product.price} kr</p>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Lägg till i varukorgen</button>
                </div>
            `;

            rowElement.appendChild(columnElement);
        });

        // Lägg till eventlyssnare för "Lägg till i varukorgen"-knappar
        document.querySelectorAll('.add-to-cart-btn').forEach((button, index) => {
            button.addEventListener('click', () => {
                const selectedProduct = products[index];
                addToCart(selectedProduct);
            });
        });

        // Uppdatera varukorgens antal vid sidladdning
        updateCartCount();
    })
    .catch((error) => console.error('Fel vid hämtning av produkter:', error));

// Funktion för att lägga till en produkt i varukorgen
function addToCart(product) {
    // Hämta varukorgen från localStorage eller initiera en tom array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kontrollera om produkten redan finns i varukorgen
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Öka kvantiteten om produkten redan finns
    } else {
        cart.push({ ...product, quantity: 1 }); // Lägg till ny produkt med kvantitet 1
    }

    // Spara den uppdaterade varukorgen tillbaka till localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Informera användaren och uppdatera varukorgens antal
    alert(`${product.title} har lagts till i din varukorg!`);
    updateCartCount();
}

// Funktion för att uppdatera varukorgens antal i sidhuvudet
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}