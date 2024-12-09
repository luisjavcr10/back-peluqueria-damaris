const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class User extends Model{}

User.init({
    idUser : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
        field : 'id_usuario'
    },
    name : {
        type : DataTypes.STRING(100),
        allowNull : false,
        field : 'nombre'
    },
    email : {
        type : DataTypes.STRING(100),
        allowNull : false,
        unique: true,
        field : 'email'
    },
    passwordHash : {
        type : DataTypes.STRING(255),
        allowNull : false,
        field : 'password_hash'
    },
    idRole : {
        type : DataTypes.INTEGER,
        allowNull : false,
        field : 'id_rol'
    },
    active : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
        field : 'activo'
    }
},{
    sequelize,
    tableName : 'Usuarios',
    timestamps : false,
    // Definición de la relación con la tabla Roles
    hooks: {
        beforeCreate: (user, options) => {
            // Aquí puedes agregar lógica antes de crear un usuario, si es necesario
        }
    }
});

module.exports = User; 