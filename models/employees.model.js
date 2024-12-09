const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Employee extends Model{}

Employee.init({
    idEmployee : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
        field : 'id_empleado'
    },
    idUser : {
        type : DataTypes.INTEGER,
        allowNull : false,
        field : 'id_usuario'
    },
    name : {
        type : DataTypes.STRING(100),
        allowNull : false,
        field : 'nombre'
    },
    phone : {
        type : DataTypes.STRING(15),
        allowNull : true,
        field : 'telefono'
    },
    address : {
        type : DataTypes.STRING(255),
        allowNull : true,
        field : 'direccion'
    }
},{
    sequelize,
    tableName : 'Empleados',
    timestamps : false,
    // Definición de la relación con la tabla Usuarios
    hooks: {
        beforeCreate: (employee, options) => {
            // Aquí puedes agregar lógica antes de crear un empleado, si es necesario
        }
    }
});

module.exports = Employee; 