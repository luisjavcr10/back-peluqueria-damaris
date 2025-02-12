const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Product extends Model{}

Product.init({
    idProduct :{
        type: DataTypes.STRING(50),
        primaryKey : true,
        field : 'id_producto' 
    },
    name : {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique : true,
        field : 'nombre'
    },
    description:{
        type : DataTypes.STRING(255),
        allowNull : true,
        field : 'descripcion'
    },
    image: {
        type: DataTypes.TEXT('long'),
        allowNull:true,
        field: 'imagen'
    },
    idCategory :{
        type : DataTypes.INTEGER,
        allowNull : false,
        field : 'id_categoria' ,
    },
    price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        field : 'precio'
    },
    stock :{
        type: DataTypes.INTEGER,
        defaultValue : 0,
        allowNull : false,
        field : 'stock'
    },
    arrivalDate : {
        type : DataTypes.DATE,
        field: 'fecha_llegada'
    },
    expirationDate : {
        type : DataTypes.DATE,
        field: 'fecha_vencimiento'
    },
    state : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
        field: 'activo'
    }
},{
    sequelize,
    tableName : 'Productos',
    timestamps : false,
    scopes : {
        noIdCategory : {
            attributes : {exclude : ['idCategory']}
        },
        noState : {
            attributes : {exclude : ['state']}
        },
        orderByPrice: {
            order: [['price', 'ASC']],
        }
    }
});

module.exports = Product;