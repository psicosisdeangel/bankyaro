import mysql from "mysql2/promise";
import dotenv, { config } from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const getConnection = () =>{

    return connection
};
export{getConnection};

export default db;