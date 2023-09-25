const mysql = require("mysql2");

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "red_social",
});

// Conecta a la base de datos
db.connect((err: any) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

export default db;
