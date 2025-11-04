import {config} from "dotenv";

config();

export default{
    dbUser: process.env.DB_USER,
    dbpassword: process.env.BD_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,


};

export {config};