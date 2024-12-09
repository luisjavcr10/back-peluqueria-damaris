
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Sales extends Model {}

Sales.init({
    idSales: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_venta'
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field : 'id_usuario'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field : 'total'
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field : 'fecha'
    },
    nameCustomer: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field : 'nombre_cliente'
    }
}, {
    sequelize,
    modelName: 'Sales',
    tableName: 'Ventas',
    timestamps: false
});

module.exports = Sales; 