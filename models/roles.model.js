const {DataTypes, Model} = require('sequelize');
const sequelize = require('./../config/db');

class Role extends Model{}

Role.init({
    idRole : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
        field : 'id_rol'
    },
    name : {
        type : DataTypes.STRING(50),
        allowNull : false,
        unique: true,
        field : 'nombre'
    },
    description : {
        type : DataTypes.STRING(255),
        allowNull: true,
        field : 'descripcion'
    }
},{
    sequelize,
    tableName : 'Roles',
    timestamps : false
});

module.exports = Role; 