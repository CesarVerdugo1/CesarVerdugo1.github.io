import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const puerto = Number(process.env.PORT) || 1984;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express me gusta porque hace el enrutamiento mas claro que muchos if/else.
// Tambien simplifica el envio de JSON y archivos HTML con metodos directos.

function rutaHtml(nombreArchivo) {
  return path.join(__dirname, nombreArchivo);
}

function enviarPagina(res, archivoHtml) {
  res.sendFile(rutaHtml(archivoHtml), (error) => {
    if (error) {
      res.status(500).type('text/plain; charset=utf-8').send('Oh no!!!!');
    }
  });
}

function obtenerMascotas() {
  return [
    {
      nombre: 'Pikachu',
      color: 'Amarillo'
    },
    {
      nombre: 'Carmino',
      color: 'Naranja'
    }
  ];
}

app.get('/', (req, res) => {
  enviarPagina(res, 'bienvenida.html');
});

app.get('/api/mascotas', (req, res) => {
  // En Express, res.json evita llamar manualmente a JSON.stringify.
  res.status(200).json(obtenerMascotas());
});

app.get('/mascotas', (req, res) => {
  const items = obtenerMascotas()
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
  <ul>
    ${items}
  </ul>
</body>
</html>`; 
  res.status(200).send(html);
});

app.use(express.json());

app.post('/api/otro', (req, res) => {
  console.log('El cuerpo de la petición: ', req.body);
  res.sendStatus(200);
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en puerto ${puerto}`);
});

app.get('/api/mascotas/:nombre', (req, res) => {
  const nombreBuscado = req.params.nombre.toLowerCase();

  const mascota = obtenerMascotas().find(
    (m) => m.nombre.toLowerCase() === nombreBuscado
  );

  if (!mascota) {
    return res.status(404).json({ error: 'Mascota no encontrada' });
  }

  res.status(200).json(mascota);
});
