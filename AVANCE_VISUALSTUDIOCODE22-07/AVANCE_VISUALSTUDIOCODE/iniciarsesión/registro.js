// Abrir y cerrar modal
const modal = document.getElementById("modalRegistro");
const cerrar = document.querySelector(".cerrar");

// Mostrar el modal automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  modal.style.display = "block"; // Mostrar el modal automáticamente
});

// Cerrar el modal al hacer clic en el botón de cerrar
cerrar.addEventListener("click", function () {
  modal.style.display = "none"; // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none"; // Ocultar el modal
  }
});

// Validaciones dinámicas de contraseña
const inputPass = document.getElementById("clave");
const reglas = {
  largo: /.{8,}/,
  mayus: /[A-Z]/,
  minus: /[a-z]/,
  numero: /[0-9]/,
  especial: /[^A-Za-z0-9]/,
};

inputPass.addEventListener("input", () => {
  for (const [id, regex] of Object.entries(reglas)) {
    const li = document.getElementById(id);
    if (regex.test(inputPass.value)) {
      li.classList.add("valido");
      li.textContent = `✅ ${li.textContent.slice(2)}`;
    } else {
      li.classList.remove("valido");
      li.textContent = `❌ ${li.textContent.slice(2)}`;
    }
  }
});

// Evento al registrar
const form = document.getElementById("formRegistro");

form.addEventListener("submit", function (e) {
  const pass = inputPass.value;
  const cumpleTodas = Object.values(reglas).every((regex) => regex.test(pass));

  if (!cumpleTodas) {
    e.preventDefault(); // solo evita el envío si la contraseña no cumple
    alert("Tu contraseña aún no cumple con todos los requisitos.");
    document.getElementById("mensajeExito").style.display = "none";
  }
});




