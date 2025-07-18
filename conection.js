// Importa el paquete dotenv para cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv';
// Carga las variables de entorno definidas en el archivo .env
dotenv.config();  // Esto cargará las variables de tu archivo .env

// Importa la configuración de la conexión a la base de datos desde un archivo config.js
import connection from "./config.js";

// Aquí se comentaba la línea de conexión usando mysql2 con require
// const mysql2 = require("mysql2");

// La siguiente línea crea una conexión con la base de datos usando la configuración importada
// let db_con = mysql2.createConnection(connection);

// Establece la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    // Si hay un error de conexión, muestra el mensaje de error
    console.log("Error de conexión");
    return;  // Si ocurre un error, termina la ejecución de la función
  }

  // Si la conexión es exitosa, muestra un mensaje de éxito
  console.log("Conectado");

  // Define la consulta SQL que se va a ejecutar
  let query = "SELECT * FROM db_discos.discos";

  // Ejecuta la consulta en la base de datos
  connection.query(query, (err, rows) => {
    if (err) throw err;  // Si ocurre un error en la ejecución de la consulta, lanza una excepción

    // Si la consulta es exitosa, muestra las filas obtenidas
    console.log(rows);

    // Cierra la conexión a la base de datos después de completar la consulta
    connection.end();
  });
});
