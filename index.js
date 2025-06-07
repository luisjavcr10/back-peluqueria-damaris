const express = require('express');
const logger = require('./utils/logger');
const config = require('./config/config');
const routerApi = require('./routes');
const initializePassport = require('./config/auth');
const {ErrorHandler} = require('./middlewares');
const db = require('./db/connection');
const cors = require('cors');
const models = require('./models');

const corsOptions = {
  origin: '*', // Solo permitir solicitudes de este dominio
  methods: 'GET,POST,PUT,DELETE',         // Permitir solo estos métodos
  allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
};


const app = express();

// Middlewares
app.use(express.json({ limit: '300kb' })); // Increase the payload size limit

// Inicializar Passport
initializePassport(app);

// Verificar conexión a la base de datos
db.getConnection()
  .then(async () => {
    logger.info('Conexión exitosa a la base de datos');
    await models.syncAllModels();
  })
  .catch((err) => {
    logger.error('Error al conectar a la base de datos:', err);
    process.exit(1);
});

app.use(cors(corsOptions));

routerApi(app);

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.boomErrorHandler);
app.use(ErrorHandler.errorHandler);

// Iniciar servidor
app.listen(config.port, () => {
  logger.info(`Servidor corriendo en http://localhost:${config.port}`);
});