document.addEventListener('DOMContentLoaded', function () {
    // Hämta den aktuella ordern från localStorage
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    if (!currentOrder || !currentOrder.cart || currentOrder.cart.length === 0) {
        alert('Ingen order hittades! Vänligen gör en beställning först.');
        window.location.href = 'index.html';
        return;
    }

    // Visa orderinformation
    document.getElementById('orderId').textContent = currentOrder.orderId || 'Ej tillgängligt';
    document.getElementById('orderDate').textContent = currentOrder.orderDate || 'Ej tillgängligt';

    // Visa kundinformation
    document.getElementById('customerName').textContent = currentOrder.customer.name || 'Ej tillgängligt';
    document.getElementById('customerEmail').textContent = currentOrder.customer.email || 'Ej tillgängligt';
    document.getElementById('customerPhone').textContent = currentOrder.customer.phone || 'Ej tillgängligt';
    document.getElementById('deliveryAddress').textContent = currentOrder.customer.address || 'Ej tillgängligt';

    // Visa produkterna i ordern
    const productInfoContainer = document.getElementById('productInfo');
    let total = 0;
    currentOrder.cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        const productElement = document.createElement('p');
        productElement.textContent = `${item.title} - Antal: ${item.quantity} - Pris: ${item.price} kr - Summa: ${itemTotal} kr`;
        productInfoContainer.appendChild(productElement);
    });

    // Visa totalsumman
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Totalsumma: ${total} kr</strong>`;
    productInfoContainer.appendChild(totalElement);
});