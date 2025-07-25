let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];


/*primero vamos a crear constantes*/ 
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
 
cargarEventListeners();
document.addEventListener('DOMContentLoaded', renderizarCarrito);

/*creamos funciones*/
function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}
//AGREGADO
function mostrarMensajeCarrito() {
    const mensaje = document.getElementById('mensaje-carrito');
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 2000); // desaparece en 2 segundos
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
         mostrarMensajeCarrito(); // MOSTRARA EL MENSAJE 
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const existe = productosCarrito.find(prod => prod.id === elemento.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        elemento.cantidad = 1;
        productosCarrito.push(elemento);
    }
    guardarCarritoLocalStorage();
    renderizarCarrito();
}

function guardarCarritoLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function eliminarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar')){
        const productoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
        guardarCarritoLocalStorage();
        renderizarCarrito();
    }
}

function vaciarCarrito(){
    productosCarrito = [];
    guardarCarritoLocalStorage();
    renderizarCarrito();
}

function renderizarCarrito(){
    lista.innerHTML = '';
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        lista.appendChild(row);
    });
}

function guardarCarritoLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

//mostrar/ocultar el carrito con clic
document.addEventListener("DOMContentLoaded", function () {
    const iconoCarrito = document.getElementById("img-carrito");

    iconoCarrito.addEventListener("click", function (e) {
        e.stopPropagation(); // Evita que se cierre instantáneamente
        carrito.style.display = carrito.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function () {
        carrito.style.display = "none";
    });

    carrito.addEventListener("click", function (e) {
        e.stopPropagation(); // No cerrar si se hace clic dentro del carrito
    });
});

document.getElementById('ver-carrito').addEventListener('click', function(e) {
    e.preventDefault(); // Evita comportamiento por defecto
    window.open('carrito.html', '_blank'); // Abre carrito.html en nueva pestaña
});



// PERMITE DESAPARECER EL BTN INICIAR SESION AL LOGEARSE  

document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');

    const usuarioLogueado = localStorage.getItem('usuarioLogueado'); 

    if (usuarioLogueado) {
        if (btnLogin) {
            const enlace = btnLogin.querySelector('a');
            enlace.innerHTML = `<i class="bi bi-person-circle"></i> ${usuarioLogueado}`;
            enlace.href = "#";
        }

        // Mostrar el botón de logout
        if (btnLogout) btnLogout.style.display = 'inline-block';

        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogueado');
            localStorage.removeItem('carrito');
            window.location.reload();
        });
    }
});



