// ======================
// LÓGICA DEL CARRITO PARA DECORACION.JS
// ======================

// Cargar el carrito desde localStorage o inicializarlo vacío
let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM necesarios
const carrito = document.getElementById('carrito');
const listaProductos = document.querySelector('.container-items');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar todos los event listeners
cargarEventListeners();
document.addEventListener('DOMContentLoaded', renderizarCarrito);

function cargarEventListeners() {
    // Delegación de evento: botón Agregar al carrito
    listaProductos.addEventListener('click', agregarProducto);

    // Evento para eliminar producto del carrito (delegación)
    carrito.addEventListener('click', eliminarElemento);

    // Evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// =============================
// Agregar Producto
// =============================
function agregarProducto(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault(); // Evitamos que el enlace recargue o siga por defecto

        // Obtener la URL del href (informacion.html o informacion2.html o informacion3.html)
        const url = e.target.getAttribute('href');

        // Redirigir a la URL definida en el href
        window.location.href = url;
    }
}


function eliminarElemento(e) {
    if (e.target.classList.contains('borrar')) {
        const productoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(prod => prod.id !== productoId);
        guardarCarritoLocalStorage();
        renderizarCarrito();
    }
}

function vaciarCarrito() {
    productosCarrito = [];
    guardarCarritoLocalStorage();
    renderizarCarrito();
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        listaCarrito.appendChild(row);
    });
}

// Mostrar/ocultar carrito al hacer clic en el ícono
const imgCarrito = document.getElementById('img-carrito');
imgCarrito.addEventListener('click', function(e) {
    e.stopPropagation();
    carrito.style.display = carrito.style.display === 'block' ? 'none' : 'block';
    renderizarCarrito();
});

document.addEventListener('click', function() {
    carrito.style.display = 'none';
});

carrito.addEventListener('click', function(e) {
    e.stopPropagation();
});

// ...existing code...

const productos = [
  { nombre: "Bruselina vainilla & fresas", archivo: "../html/informacion50.html", imagen: "../img/50.png" },
  { nombre: "Crocante de manzana", archivo: "../html/informacion51.html", imagen: "../img/51.png" },
  { nombre: "Bruselina chocolate & lúcuma", archivo: "../html/informacion52.html", imagen: "../img/52.png" },
  { nombre: "Merengado de vainilla y fresas", archivo: "../html/informacion53.html", imagen: "../img/53.png" },
  { nombre: "Pavlova de frutas de estación", archivo: "../html/informacion54.html", imagen: "../img/54.png" },
  { nombre: "Tartaleta de frutos rojos", archivo: "../html/informacion55.html", imagen: "../img/55.png" },
  { nombre: "Torta de chocolate", archivo: "../html/informacion56.html", imagen: "../img/56.png" },
  { nombre: "Tres leches clásica", archivo: "../html/informacion57.html", imagen: "../img/57.png" },
  { nombre: "Tres leches de chocolate", archivo: "../html/informacion58.html", imagen: "../img/58.png" }
];

const searchInput = document.getElementById('search-input');
const resultados = document.getElementById('resultados-busqueda');

if (searchInput && resultados) {
  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    resultados.innerHTML = '';
    if (query.length === 0) {
      resultados.style.display = 'none';
      return;
    }
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(query));
    if (filtrados.length === 0) {
      resultados.innerHTML = '<div class="resultado-item">No se encontraron productos</div>';
      resultados.style.display = 'block';
      return;
    }
    filtrados.forEach(p => {
      const item = document.createElement('div');
      item.className = 'resultado-item';
      item.innerHTML = `<img src="${p.imagen}" alt="${p.nombre}">${p.nombre}`;
      item.onclick = () => window.location.href = p.archivo;
      resultados.appendChild(item);
    });
    resultados.style.display = 'block';
  });

  // Ocultar resultados al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !resultados.contains(e.target)) {
      resultados.style.display = 'none';
    }
  });
}
