// DOM
document.addEventListener('DOMContentLoaded', () => {
    const generar = localStorage.getItem('generarBoleta');
    if (!generar) {
        window.location.href = 'index.html'; // redirecciona si entran manualmente
        return;
    }

    const metodoPago = localStorage.getItem('metodoPago') || 'No especificado';
    document.getElementById('metodo-pago').textContent = metodoPago;

    const usuario = localStorage.getItem('usuarioLogueado') || 'Cliente no identificado';
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    document.getElementById('cliente').textContent = usuario;

    const lista = document.getElementById('detalle-productos');
    const totalSpan = document.getElementById('total');
    const fechaSpan = document.getElementById('fecha');
    const horaSpan = document.getElementById('hora');
    const ordenSpan = document.getElementById('orden');

    const hoy = new Date();
    fechaSpan.textContent = hoy.toLocaleDateString('es-PE');
    horaSpan.textContent = hoy.toLocaleTimeString('es-PE');
    ordenSpan.textContent = Math.floor(100000 + Math.random() * 900000);

    let total = 0;

    carrito.forEach(producto => {
        const precio = typeof producto.precio === 'string'
            ? parseFloat(producto.precio.replace(/[^\d.]/g, ''))
            : producto.precio;

        const cantidad = producto.cantidad || 1;
        const subtotal = precio * cantidad;

        const li = document.createElement('li');
        li.textContent = `${cantidad} x ${producto.titulo} - S/ ${subtotal.toFixed(2)}`;
        lista.appendChild(li);

        total += subtotal;
    });

    totalSpan.textContent = total.toFixed(2);

    // Al imprimir, vaciar carrito y banderas
    window.onafterprint = () => {
        localStorage.removeItem('carrito');
        localStorage.removeItem('generarBoleta');
        localStorage.removeItem('metodoPago');
    };
});