// Importa el framework Express para crear el servidor y gestionar rutas HTTP
import express, { json } from 'express';

// Importa la conexión a la base de datos desde el archivo 'config.js'
import connection from './config.js';

// Importa funciones para manipular rutas de archivos
import { join, dirname } from 'path';

// Importa la función fileURLToPath para obtener la ruta del archivo en módulos ES
import { fileURLToPath } from 'url';

// Crea una instancia de Express que manejará las rutas y solicitudes HTTP
const app = express();

// Define el puerto donde el servidor escuchará las peticiones
const PORT = 3002;

// Obtener el equivalente de __dirname en módulos ES (para manejar rutas de archivos)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Desactiva el encabezado 'x-powered-by' que viene por defecto en Express (para mayor seguridad)
app.disable('x-powered-by');

// Usa el middleware json de Express para que las solicitudes y respuestas manejen JSON
app.use(json());

// Rutas para servir archivos estáticos (HTML)
app.get("/admin", (req, res) => {
  // Sirve el archivo HTML de administración desde la carpeta 'public'
  res.sendFile(join(__dirname, 'public', 'administrador.html'))
});

app.get("/listadiscos", (req, res) => {
  // Sirve el archivo HTML con la lista de discos desde la carpeta 'public'
  res.sendFile(join(__dirname, 'public', 'lista-discos.html'))
});

// Ruta para obtener todos los discos
app.get("/discos", (req, res) => {
  // Realiza una consulta SQL para obtener todos los discos de la base de datos
  connection.query("SELECT id, nombre, Artista, fecha_pub, Discografica, precio FROM discos", (err, rows) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    res.json(rows); // Devuelve los resultados de la consulta en formato JSON
  });
});

// Ruta para obtener un disco específico por su ID
app.get("/discos/:id", (req, res) => {
  // Realiza una consulta SQL para obtener un disco específico por su ID
  connection.query("SELECT id, nombre, Artista, fecha_pub, Discografica, precio FROM discos WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    if (rows.length === 0) return res.status(404).send("Disco no encontrado"); // Si no se encuentra el disco, responde con un código 404
    res.json(rows[0]); // Devuelve el disco encontrado en formato JSON
  });
});

// Ruta para crear un nuevo disco
app.post("/discos", (req, res) => {
  // Extrae los datos del nuevo disco del cuerpo de la solicitud
  const { nombre, Artista, fecha_pub, Discografica, Precio } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre || !Artista || !fecha_pub || !Discografica || !Precio) return res.status(400).send("Faltan campos obligatorios");

  // Realiza una consulta SQL para insertar el nuevo disco en la base de datos
  connection.query("INSERT INTO discos (nombre, Artista, fecha_pub, Discografica, Precio) VALUES (?, ?, ?, ?, ?)", [nombre, Artista, fecha_pub, Discografica, Precio], (err, results) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    // Devuelve el ID del nuevo disco creado con un mensaje de éxito
    res.status(201).json({ id: results.insertId, message: "Disco creado" });
  });
});

// Ruta para actualizar un disco existente
app.put("/discos/:id", (req, res) => {
  // Extrae los datos del disco que se va a actualizar
  const { nombre, Artista, fecha_pub, Discografica, Precio } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre || !Artista || !fecha_pub || !Discografica || !Precio) return res.status(400).send("Faltan campos obligatorios");

  // Realiza una consulta SQL para actualizar el disco con el ID especificado
  connection.query("UPDATE discos SET nombre = ?, Artista = ?, fecha_pub = ?, Discografica = ?, Precio = ? WHERE id = ?", [nombre, Artista, fecha_pub, Discografica, Precio, req.params.id], (err, results) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    if (results.affectedRows === 0) return res.status(404).send("Disco no encontrado"); // Si no se encuentra el disco, responde con un código 404
    res.json({ message: "Disco actualizado" }); // Devuelve un mensaje de éxito
  });
});

// Ruta para actualizar parcialmente un disco
app.patch("/discos/:id", (req, res) => {
  // Extrae los campos del disco que se van a actualizar parcialmente
  const fields = req.body;

  // Realiza una consulta SQL para actualizar solo los campos especificados en la solicitud
  connection.query(`UPDATE discos SET ${Object.keys(fields).map(key => `${key} = ?`).join(", ")} WHERE id = ?`, [...Object.values(fields), req.params.id], (err, results) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    if (results.affectedRows === 0) return res.status(404).send("Disco no encontrado"); // Si no se encuentra el disco, responde con un código 404
    res.json({ message: "Disco actualizado parcialmente" }); // Devuelve un mensaje de éxito
  });
});

// Ruta para eliminar un disco
app.delete("/discos/:id", (req, res) => {
  // Realiza una consulta SQL para eliminar el disco con el ID especificado
  connection.query("DELETE FROM discos WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Error en el servidor"); // Si hay un error en la consulta, responde con un código 500
    if (results.affectedRows === 0) return res.status(404).send("Disco no encontrado"); // Si no se encuentra el disco, responde con un código 404
    res.json({ message: "Disco eliminado" }); // Devuelve un mensaje de éxito
  });
});

// Inicia el servidor y hace que esté escuchando en el puerto 3002
app.listen(PORT, () => {
  // Muestra un mensaje en la consola indicando que el servidor está corriendo
  console.log(`Servidor conectado a http://localhost:${PORT}`);
});
