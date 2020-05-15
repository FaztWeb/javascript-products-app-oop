// Product Constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// UI Constructor
class UI extends Product {
    constructor(name, price, year, message, cssClass) {
        super(name, price, year)
        this.message = message
        this.cssClass = cssClass
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    addProduct() {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${this.name}
                    <strong>Price</strong>: ${this.price}
                    <strong>Year</strong>: ${this.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }
    showMessage(message, cssClass) {

        //recibir valores de message o cssClass de forma implicita o explicita
        const newCssClass = cssClass || this.cssClass;
        const newMessage = message || this.message;

        const div = document.createElement('div');
        div.className = `alert alert-${newCssClass} mt-2`;
        div.appendChild(document.createTextNode(newMessage));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteProduct() {
        document.getElementById('product-list')
            .addEventListener('click', (e) => {
                if (e.target.name === 'delete') {
                    e.target.parentElement.parentElement.parentElement.remove();
                    this.showMessage('Product delect successfully...', 'info');
                }
            });
    }
}

//definir clase UI de manera explicita para reutilizar el método showMessage();
const uiMessage = new UI

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e) {

        const name = document.getElementById('name').value,
            price = document.getElementById('price').value,
            year = document.getElementById('year').value;
        if (name === '' || price === '' || year === '') {
            return uiMessage.showMessage('Complete fields, please!', 'info');
        } else {
            const ui = new UI(name, price, year, 'Product added succesfully', 'success');
            ui.addProduct();
            ui.showMessage();
            ui.deleteProduct();
        }
        e.preventDefault();
    });

/*
    document.getElementById('product-list')
    .addEventListener('click', function(e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
    });

*/