const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Category extends Model {}

Category.init({
    idCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_categoria'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'nombre'
    },
    description: {
        type: DataTypes.STRING(255),
        field: 'descripcion'
    }
}, {
    sequelize,
    tableName: 'Categorias',
    timestamps: false,
});

module.exports = Category;