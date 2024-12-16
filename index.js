const express = require('express');
const logger = require('./utils/logger');
const config = require('./config/config');
const routerApi = require('./routes');
const initializePassport = require('./config/auth');
const {ErrorHandler} = require('./middlewares');
const db = require('./db/connection');


const app = express();

// Middlewares
app.use(express.json());

// Inicializar Passport
initializePassport(app);

// Verificar conexión a la base de datos
db.getConnection()
  .then(() => logger.info('Conexión exitosa a la base de datos'))
  .catch((err) => {
    logger.error('Error al conectar a la base de datos:', err);
    process.exit(1);
});

routerApi(app);

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.boomErrorHandler);
app.use(ErrorHandler.errorHandler);

// Iniciar servidor
app.listen(config.port, () => {
  logger.info(`Servidor corriendo en http://localhost:${config.port}`);
});