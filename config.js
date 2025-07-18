// db.js

// Importa la función `createConnection` desde el paquete `mysql2`, que se utiliza para crear conexiones a una base de datos MySQL.
import { createConnection } from 'mysql2';

// Importa el paquete `dotenv` para cargar variables de entorno desde un archivo `.env`.
import dotenv from 'dotenv';

// Carga las variables de entorno definidas en el archivo `.env` (si existe). Esto permite manejar configuraciones como credenciales de la base de datos de forma segura.
dotenv.config();

// Crea la conexión a la base de datos usando los valores que vienen del archivo `.env` (o valores por defecto si las variables de entorno no están definidas).
// Utiliza el operador de coalescencia nula (??) para asignar un valor por defecto en caso de que la variable de entorno no esté definida.

const connection = createConnection({
  host: process.env.DB_HOST ?? 'localhost', // Dirección del host de la base de datos, por defecto 'localhost'.
  user: process.env.DB_USER ?? 'root', // Usuario para la base de datos, por defecto 'root'.
  password: process.env.DB_PASSWORD ?? '@Tecmilenio2025', // Contraseña de la base de datos, por defecto '@Tecmilenio2025'.
  database: process.env.DB_NAME ?? 'db_discos', // Nombre de la base de datos a conectar, por defecto 'db_discos'.
  port: process.env.DB_PORT ?? 3306, // Puerto en el que se encuentra la base de datos, por defecto 3306 (puerto estándar de MySQL).
});

// Asegúrate de que la conexión esté bien configurada y exportada, para que se pueda usar en otros archivos.
export default connection;
