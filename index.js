const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const routerApi = require('./routes');
const {ErrorHandler} = require('./middlewares')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

require('./config/auth');


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir si hay un error
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

routerApi(app);

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.boomErrorHandler);
app.use(ErrorHandler.errorHandler);