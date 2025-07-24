document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    const modalPago = document.getElementById('modal-pago');
    const comprarBtn = document.getElementById('comprar-btn');

    // VOLVER AL INICIO
    document.getElementById('volver-btn').addEventListener('click', () => {
        window.location.href = 'ini.html';
    });

    // BOTÓN COMPRAR - MOSTRAR MODAL SI TODO ESTÁ OK
    comprarBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (!usuarioLogueado) {
            window.location.href = '../iniciarsesión/iniciarsesión.html';
            return;
        }

        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        modalPago.style.display = 'block';
    });

    // OPCIONES DE PAGO
    document.querySelectorAll('.opcion-pago').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const metodo = e.target.dataset.metodo;
            localStorage.setItem('metodoPago', metodo);
            localStorage.setItem('generarBoleta', 'true');

            modalPago.style.display = 'none';

            mostrarMensajeCompraExitosaYRedirigir();
        });
    });

    // MOSTRAR MENSAJE DE COMPRA EXITOSA Y REDIRIGIR
    function mostrarMensajeCompraExitosaYRedirigir() {
        const contenedor = document.createElement('div');
        contenedor.id = 'mensaje-exito';
        contenedor.innerHTML = '<p>COMPRA EXITOSA, GENERANDO BOLETA ✔</p>';
        document.body.appendChild(contenedor);

        setTimeout(() => {
            window.location.href = 'boleta.html';
        }, 2000);
    }

    // MOSTRAR CARRITO
    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const tabla = document.querySelector('#tabla-carrito tbody');
        tabla.innerHTML = '';

        carrito.forEach((producto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Imagen"><img src="${producto.imagen}" alt="" width="100"></td>
                <td data-label="Nombre">${producto.titulo}</td>
                <td data-label="Precio">${producto.precio}</td>
                <td data-label="Cantidad">
                    <input type="number" min="1" value="${producto.cantidad || 1}" data-index="${index}" class="cantidad-input">
                </td>
                <td data-label="Subtotal">S/ ${(getPrecio(producto) * (producto.cantidad || 1)).toFixed(2)}</td>
                <td data-label="Eliminar">
                    <button class="eliminar-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        });

        agregarEventos();
        calcularTotal();
    }

    function getPrecio(producto) {
        if (typeof producto.precio === 'string') {
            return parseFloat(producto.precio.replace(/[^\d\.]/g, '')) || 0;
        }
        return producto.precio || 0;
    }

    function agregarEventos() {
        document.querySelectorAll('.cantidad-input').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });

        document.querySelectorAll('.eliminar-btn').forEach(btn => {
            btn.addEventListener('click', eliminarProducto);
        });
    }

    function actualizarCantidad(e) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = e.target.getAttribute('data-index');
        const nuevaCantidad = parseInt(e.target.value);

        if (nuevaCantidad > 0) {
            carrito[index].cantidad = nuevaCantidad;
            localStorage.setItem('carrito', JSON.stringify(carrito));

            window.dispatchEvent(new Event('storage'));
            mostrarCarrito();
        }
    }

    function eliminarProducto(e) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = e.target.getAttribute('data-index');

        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        window.dispatchEvent(new Event('storage'));
        mostrarCarrito();
    }

    function calcularTotal() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;

        carrito.forEach(producto => {
            const cantidad = producto.cantidad || 1;
            total += getPrecio(producto) * cantidad;
        });

        document.getElementById('total').textContent = `Total: S/ ${total.toFixed(2)}`;
    }
});