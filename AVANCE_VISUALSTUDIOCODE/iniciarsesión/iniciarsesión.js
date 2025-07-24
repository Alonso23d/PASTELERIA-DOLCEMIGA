let intentos = 0;
const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

// Lista de usuarios válidos
const usuariosValidos = [
  { email: "usuario@correo.com", password: "123456" },
  { email: "yelina@correo.com", password: "flores" }
];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const usuarioValido = usuariosValidos.find(
    (usuario) => usuario.email === email && usuario.password === password
  );

  if (usuarioValido) {
    mensaje.textContent = "¡Bienvenido!";
    mensaje.style.color = "green";
    intentos = 0;

    // Guardar sesión activa
    localStorage.setItem('usuarioLogueado', 'true');

    // Redirigir al usuario después de un inicio de sesión exitoso
    setTimeout(() => {
      window.location.href = "../inicio/Ini.html";
    }, 1000);
  } else {
    intentos++;
    if (intentos >= 3) {
      alert("Has excedido los intentos. No puedes ingresar.");
      form.querySelector("button[type='submit']").disabled = true;
    } else {
      mensaje.textContent = `Intento inválido. Te quedan ${3 - intentos} intento(s).`;
      mensaje.style.color = "red";
    }
  }
});

// Redirigir al formulario de registro
const registroLink = document.querySelector(".registro a");
registroLink.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "registro.html";
});
