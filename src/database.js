import mysql from "mysql";
import { promisify } from "util";
import config from "./config";

const { database } = config;

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("La Base de Datos se cerró.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("La Base de Datos tiene demasiadas conexiones");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("La Conexión con la Base de Datos se perdió");
    }
  }

  if (connection) connection.release();
  console.log("Base de Datos Conectada");

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

export default pool;
