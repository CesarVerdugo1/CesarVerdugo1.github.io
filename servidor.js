//Escribe un comentario explicando para qué sirve http
import http from 'http';
//http sirve para crear un servidor web que pueda manejar solicitudes y enviar respuestas a los clientes. Es una parte fundamental de Node.js para construir aplicaciones web y APIs.

//Escribe un comentario explicando para qué sirve url
import url from 'node:url';
//url es un módulo de Node.js que proporciona utilidades para trabajar con URLs. Permite analizar, resolver y manipular URLs de manera sencilla, lo que es útil para manejar rutas y parámetros en un servidor web.

//Escribe un comentario explicando para qué sirve fs
import fs from 'fs';
//fs es un módulo de Node.js que proporciona una API para interactuar con el sistema de archivos. Permite leer, escribir, actualizar y eliminar archivos y directorios, lo que es esencial para manejar contenido dinámico en un servidor web, como cargar páginas HTML o almacenar datos.

// Reutilizamos esta función para responder HTML desde archivos de manera consistente.
function mostrarPagina(res, archivoHtml) {
  fs.readFile(archivoHtml, 'utf8', (error, data) => {
    if (error) {
      // 500: error interno del servidor al procesar la solicitud.
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Oh no!!!!');
      return;
    }

    // 200: solicitud procesada correctamente.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}

    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
      mostrarPagina(res, 'bienvenida.html');
    }


    //Esta función deberá enviar un json con los datos de las mascotas
    function getMascotas(req, res) {
        //Esto representa un objeto JSON de una mascota
        //Agrega otra mascota
        const mascotas = [
            {
                "nombre": "Pikachu",
                "color": "Amarillo"
            },
            {
                "nombre": "Carmino",
                "color": "Naranja"
            }
        ];  
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      // La función stringify convierte un objeto JavaScript en una cadena JSON. La usamos porque el método res.end() espera una cadena como argumento, y no podemos enviar directamente un objeto JavaScript. Al convertirlo a JSON, podemos enviar la información de manera estructurada y legible para el cliente que la recibe.
      res.end(JSON.stringify(mascotas));
    }

    function mostrarMascotas(req, res) {
      const mascotas = [
        {
          nombre: 'Pikachu',
          color: 'Amarillo'
        },
        {
          nombre: 'Carmino',
          color: 'Naranja'
        }
      ];

      const items = mascotas
        .map((mascota) => `<li>${mascota.nombre} - ${mascota.color}</li>`)
        .join('');

      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mascotas</title>
</head>
<body>
  <h1>Mascotas</h1>
  <p>Lista de mascotas disponibles:</p>
  <ul>${items}</ul>
</body>
</html>`;

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    }

     
      function mostrarAdoptantes(req, res) {
        //Construye una página básica adpotantes.html
        mostrarPagina(res, 'adoptantes.html');
      }

      function mostrarEquipo(req, res) {
        mostrarPagina(res, 'equipo.html');
      }

      function mostrarOpinion(req, res) {
        mostrarPagina(res, 'opinion.html');
      }

    //Esta función deberá enviar un json con los datos de las adoptantes
    function getAdoptantes(req, res) {
    //Tienes que corregir varias cosas en esta sección
      const adoptantes = [
        {
          "nombre": "María García",
          "ciudad": "Mexico City"
        },
        {
          "nombre": "Juan López",
          "ciudad": "Guadalajara"
        },
        {
          "nombre": "Carlos Rodríguez",
          "ciudad": "Monterrey"
        }
      ];
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(adoptantes));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      //Cambia el mensaje por algo más divertido
      res.end('Ni idea de donde esta tu pagina hermanito.');
    }

    //incluye el enlace a la documentación de createServer
    //https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
    const servidor = http.createServer((req, res) => {
      const ruta = req.url;

      if (ruta === '/') {
        darBienvenida(req, res);
      } else if (ruta === '/api/mascotas') {
        getMascotas(req, res);
      } else if (ruta === '/api/adoptantes') {
        getAdoptantes(req, res);
      } 
      else if (ruta === '/mascotas') {
        mostrarMascotas(req, res);
      } 
      else if (ruta === '/adoptantes') {
        mostrarAdoptantes(req, res);
      } 
      else if (ruta === '/equipo') {
        mostrarEquipo(req, res);
      }
      else if (ruta === '/opinion') {
        mostrarOpinion(req, res);
      }
      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

      //Agrega una ruta /opinion
      //Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      //¿Qué es el freedombox?
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      
      
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html
