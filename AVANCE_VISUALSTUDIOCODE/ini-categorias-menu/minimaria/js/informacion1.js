// ---------------------------
// Variables globales
// ---------------------------
let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
const inputQuantity = document.querySelector('.input-quantity');
const btnIncrement = document.querySelector('#increment');
const btnDecrement = document.querySelector('#decrement');
const totalAmount = document.querySelector('#total-amount');
const btnAddToCart = document.querySelector('#add-to-cart');
const carritoElement = document.getElementById('carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const iconoCarrito = document.getElementById("img-carrito");

let valueByDefault = parseInt(inputQuantity?.value) || 1;
let productPrice = parseFloat(document.querySelector('#producto-precio')?.dataset.precio) || 0;

// ---------------------------
// Actualizar total
// ---------------------------
function updateTotal() {
    if (totalAmount) {
        totalAmount.textContent = (valueByDefault * productPrice).toFixed(2);
    }
}

btnIncrement?.addEventListener('click', () => {
    valueByDefault++;
    inputQuantity.value = valueByDefault;
    updateTotal();
});

btnDecrement?.addEventListener('click', () => {
    if (valueByDefault > 1) {
        valueByDefault--;
        inputQuantity.value = valueByDefault;
        updateTotal();
    }
});

inputQuantity?.addEventListener('input', () => {
    valueByDefault = parseInt(inputQuantity.value);
    if (isNaN(valueByDefault) || valueByDefault < 1) {
        valueByDefault = 1;
    }
    inputQuantity.value = valueByDefault;
    updateTotal();
});

updateTotal();

// ---------------------------
// Agregar al carrito
// ---------------------------
btnAddToCart?.addEventListener('click', () => {
    const infoElemento = leerDatosElemento();
    insertarCarrito(infoElemento);
    alert('Producto añadido al carrito correctamente.');
    renderizarCarrito();
});

function leerDatosElemento() {
    return {
        imagen: document.querySelector('.container-img img')?.src || '',
        titulo: document.querySelector('.container-title')?.textContent || '',
        precio: productPrice,
        id: document.querySelector('.container-title')?.textContent.trim().toLowerCase().replace(/\s+/g, '-') || Date.now(),
        cantidad: valueByDefault
    };
}

function insertarCarrito(elemento) {
    const existe = productosCarrito.find(prod => prod.id === elemento.id);
    if (existe) {
        existe.cantidad += elemento.cantidad;
    } else {
        productosCarrito.push(elemento);
    }
    guardarCarritoLocalStorage();
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

// ---------------------------
// Renderizar carrito
// ---------------------------
function renderizarCarrito() {
    if (!listaCarrito) return;

    listaCarrito.innerHTML = '';
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.titulo}</td>
            <td>S/ ${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        listaCarrito.appendChild(row);
    });
}

carritoElement?.addEventListener('click', function(e){
    if(e.target.classList.contains('borrar')) {
        e.preventDefault();
        const productoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(prod => prod.id !== productoId);
        guardarCarritoLocalStorage();
        renderizarCarrito();
    }
});

vaciarCarritoBtn?.addEventListener('click', function(e){
    e.preventDefault();
    productosCarrito = [];
    guardarCarritoLocalStorage();
    renderizarCarrito();
});

// ---------------------------
// Mostrar/Ocultar carrito
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();

    iconoCarrito?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (carritoElement) {
            carritoElement.style.display = carritoElement.style.display === "block" ? "none" : "block";
            renderizarCarrito();
        }
    });

    document.addEventListener("click", () => {
        if (carritoElement) carritoElement.style.display = "none";
    });

    carritoElement?.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

// ---------------------------
// Toggle descripción producto
// ---------------------------
const toggleDescription = document.querySelector('.title-description');
const contentDescription = document.querySelector('.text-description');

toggleDescription?.addEventListener('click', () => {
    contentDescription?.classList.toggle('hidden');
});
