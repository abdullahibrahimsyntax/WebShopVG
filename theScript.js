fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        if (!container) {
            console.error('Container-elementet hittades inte!');
            return;
        }
        container.innerHTML = '';

        let row;
        data.forEach((product, index) => {
            if (index % 5 === 0) {
                row = document.createElement('div');
                row.className = 'row justify-content-center';
                container.appendChild(row);
            }

            const col = document.createElement('div');
            col.className = 'col-6 col-sm-4 col-md3 col-lg-2 g-5';

            col.innerHTML = `
            <div class="card">
             <h4 class="product-title text-center fs-5">${product.title}</h4>
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
            <p class="text-center product-price">$${product.price}</p>
            <button class="btn btn-primary purchase-btn" data-id="product${index + 1}">PURCHASE</button>
            </div>
            `;

            row.appendChild(col);
        });


        document.querySelectorAll('.purchase-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const product = data[index-1];
                const urlParams = new URLSearchParams({
                    product: product.title,
                    price: product.price,
                    image: product.image
                }).toString();
                window.location.href = `formular.html?${urlParams}`;
            });
        });
    })
    .catch(error => console.error('Fel vid hämtning av produkter:', error));
