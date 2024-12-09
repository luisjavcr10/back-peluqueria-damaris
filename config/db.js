const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host : process.env.DB_HOST,
    dialect : 'mysql',
})

sequelize
    .authenticate()
    .then(() => console.log('Conexión exitosa con la base de datos usando Sequelize'))
    .catch((err) => console.error('Error al conectar con la base de datos:', err));

module.exports = sequelize; 