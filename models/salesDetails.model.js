const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class SalesDetails extends Model {}

SalesDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Esta es la clave
        allowNull: false      // Recomendado para PK
    },
    //
    idSales: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'id_venta',
        references: {
            model: 'Ventas', // Debe coincidir con el nombre de la tabla en Sales
            key: 'id_venta' // Debe coincidir con el campo en Sales
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
        field: 'id_producto',
        references: {
            model: 'Productos',
            key: 'id_producto'
        }
    },
    idService: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_servicio',
        references: {
            model: 'Servicios',
            key: 'id_servicio'
        }
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