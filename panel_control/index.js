/*const xhr = new XMLHttpRequest();
xhr.open("GET", "https://mi-expendio.000webhostapp.com/productos");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};*/

//Autentucación de usuario
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.buttons').addEventListener('click', login);
});

function login() {
  // Obtener los valores de usuario y contraseña
  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  //objeto con los datos del usuario
  const userCredentials = {
      username: username,
      password: password
  };

  // Realizar una solicitud a la API para autenticar al usuario
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://mi-expendio.000webhostapp.com/login");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(userCredentials));

  xhr.onload = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          const data = JSON.parse(xhr.responseText);

          // Verificar la respuesta de la API
          if (data.autenticado) {
              // Redirigir a la pantalla home
              window.location.href = 'http://localhost/panel_control/Panel/index.php';
          } else {
              alert('Usuario o contraseña incorrectos');
          }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
}
