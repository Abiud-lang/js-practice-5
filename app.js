const farmProductsUrl = "http://localhost:3000/farmProducts";

document.addEventListener('DOMContentLoaded', () => {
    fetchFarmProducts();
});

function fetchFarmProducts() {
    fetch(farmProductsUrl)
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.querySelector('.content');
            products.forEach(product => {
                const productDiv = document.createElement('div');

                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.name;

                const name = document.createElement('h2');
                name.textContent = product.name;

                const description = document.createElement('p');
                description.textContent = product.description;

                const price = document.createElement('p');
                price.textContent = `Price: $${product.price}`;

                const quantity = document.createElement('p');
                quantity.textContent = `Available: ${product.quantityAvailable}`;

                const orderButton = document.createElement('button');
                orderButton.textContent = 'Order Now';
                orderButton.addEventListener('click', () => placeOrder(product.id));

                productDiv.appendChild(image);
                productDiv.appendChild(name);
                productDiv.appendChild(description);
                productDiv.appendChild(price);
                productDiv.appendChild(quantity);
                productDiv.appendChild(orderButton);

                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching farm products:', error));
}

function placeOrder(productId) {
    const order = {
        productId: productId,
        quantity: 1 
    };

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        alert('Order placed successfully!');
    })
    .catch(error => console.error('Error placing order:', error));
}
