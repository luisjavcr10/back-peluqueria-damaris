const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Company extends Model{}

Company.init(
    {
        ruc: {
            type: DataTypes.STRING(11),
            primaryKey:true,
            allowNull:false,
            field: 'ruc_empresa'
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull:false,
            field:'nombre'
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull:false,
            field:'direccion'
        },
        logo: {
            type:DataTypes.TEXT('long'),
            allowNull:false,
            field:'logotipo'
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull:false,
            field:'correo_empresarial'
        },
        webAddress: {
            type: DataTypes.STRING(50),
            allowNull:false,
            field:'direccion_web'
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field:'telefono'
        }
    }, {
        sequelize,
        tableName: 'Empresa',
        timestamps: false,
    }
);

module.exports = Company; 