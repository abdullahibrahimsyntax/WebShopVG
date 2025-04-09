document.addEventListener('DOMContentLoaded', function() {
    // Hämta orderdata från localStorage
    const orderData = JSON.parse(localStorage.getItem('currentOrder'));

    
    if (orderData) {
        // Visa orderinformation
        document.getElementById('orderId').textContent = orderData.orderNumber;
        document.getElementById('orderDate').textContent = new Date(orderData.orderDate).toLocaleString('sv-SE');
        
        // Visa kundinformation
        document.getElementById('customerName').textContent = orderData.customer.name;
        document.getElementById('customerEmail').textContent = orderData.customer.email;
        document.getElementById('customerPhone').textContent = orderData.customer.phone;
        
        // Visa leveransadress
        const address = `Adress: ${orderData.customer.address.street}, Postnummer: ${orderData.customer.address.zip}, Postort: ${orderData.customer.address.city}`;
        document.getElementById('deliveryAddress').textContent = address;
        
        // Visa produktinformation
        displayProductDetails(orderData);
    } else {
        // Visa felmeddelande om ingen order hittades
        document.querySelector('.receipt-container').innerHTML = `
            <div class="alert alert-warning">
                <h4>Ingen order hittades</h4>
                <p>Det verkar som att du kom hit direkt utan att göra en beställning.</p>
                <a href="index.html" class="btn btn-primary">Gå till startsidan</a>
            </div>
        `;
    }
});
function displayProductDetails(orderData) {
    const productDetails = document.getElementById('productInfo');
    
    productDetails.innerHTML = `
        <p><strong>Produkt:</strong> ${orderData.product.title || 'Produktinformation saknas'}</p>
        <p><strong>Pris:</strong> $${orderData.product.price || '0'}</p>
        ${orderData.product.image ? `<img src="${orderData.product.image}" class="product-image img-fluid">` : ''}
    `;
}