import mysql2 from 'mysql2';

const {DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD}= process.env


const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "login_cadastro",
  password: ""
});

export default db;