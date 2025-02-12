const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class SalesDetails extends Model {}

SalesDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idSales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_venta',
        references: {
            model: 'Sales', 
            key: 'idSales'
        }
    },
    type: {
        type: DataTypes.ENUM('producto', 'servicio'),
        allowNull: false,
        field: 'tipo'
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_producto'
    },
    idService: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_servicio'
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: 'cantidad'
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'precio_unitario'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'SalesDetails',
    tableName: 'Detalle_Ventas',
    timestamps: false,
    primaryKey: ['idSales', 'id']
});

module.exports = SalesDetails; 