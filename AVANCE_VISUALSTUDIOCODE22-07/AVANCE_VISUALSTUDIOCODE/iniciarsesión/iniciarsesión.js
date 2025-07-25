document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");
  let intentos = 0;

  if (!form) {
    console.error("No se encontró el formulario con ID loginForm.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("login.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if (data.trim() !== "ERROR") {
          localStorage.setItem('usuarioLogueado', data.trim()); // <-- GUARDAMOS EL NOMBRE
          window.location.href = "/AVANCE_VISUALSTUDIOCODE22-07/AVANCE_VISUALSTUDIOCODE/inicio/ini.html";
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
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        mensaje.textContent = "Error de conexión con el servidor.";
        mensaje.style.color = "red";
      });
  });
});
