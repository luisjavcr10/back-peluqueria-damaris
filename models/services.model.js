const {DataTypes, Model} = require('sequelize');
const sequelize = require('./../config/db');

class Service extends Model{}

Service.init({
    idService : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
        field : 'id_servicio'
    },
    name : {
        type : DataTypes.STRING(100),
        allowNull : false,
        field : 'nombre'
    },
    description : {
        type : DataTypes.STRING(255),
        allowNull: true,
        field : 'descripcion'
    },
    price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        field : 'precio'
    },
    state : {
        type : DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue : true,
        field : 'activo'
    }
},{
    sequelize,
    tableName : 'Servicios',
    timestamps : false
});

module.exports = Service;