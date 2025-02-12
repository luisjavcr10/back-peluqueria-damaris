const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Sales extends Model {}

Sales.init({
    idSales: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        field: 'id_venta'
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field : 'id_usuario'
    },
    ruc:{
        type:DataTypes.STRING(11),
        allowNull:false,
        field:'ruc_empresa'
    },
    totalGravado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field : 'total_gravado'
    },
    igv: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field : 'igv'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field : 'total'
    },
    methodPayment:{
        type: DataTypes.STRING(10),
        allowNull:false,
        field:'forma_pago'
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field : 'fecha'
    },
    idCustomer:{
        type: DataTypes.STRING(12),
        allowNull: false,
        field : 'id_cliente'
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