const Product = require('./products.model');
const Category = require('./categories.model');
const User = require('./users.model');
const Employee = require('./employees.model');
const Role = require('./roles.model');
const Sales = require('./sales.model');
const SalesDetails = require('./salesDetails.model'); 
const Service = require('./../models/services.model');
const Company = require('./company.model');

// Definir las asociaciones
// Relación entre Category y Product
Category.hasMany(Product, {
    foreignKey: 'idCategory',
    sourceKey: 'idCategory',
    as: 'products'
});

Product.belongsTo(Category, { 
    foreignKey: 'idCategory',
    targetKey: 'idCategory',
    as: 'category'
});

// Relación entre Role y User
Role.hasMany(User, {
    foreignKey: 'idRole',
    sourceKey: 'idRole',
    as: 'users'
});

User.belongsTo(Role, {
    foreignKey: 'idRole',
    targetKey: 'idRole',
    as: 'role'
});

// Relación entre User y Employee
User.hasOne(Employee, {
    foreignKey: 'idUser',
    sourceKey: 'idUser',
    as: 'employee'
});

Employee.belongsTo(User, {
    foreignKey: 'idUser',
    targetKey: 'idUser',
    as: 'user'
});

// Relación entre Sales y User
Sales.belongsTo(User, {
    foreignKey: 'idUser',
    targetKey: 'idUser',
    as: 'user'
});

// Relación entre Sales y SalesDetails
Sales.hasMany(SalesDetails, {
    foreignKey: 'idSales',
    sourceKey: 'idSales',
    as: 'details',
    onDelete: 'CASCADE'
});

SalesDetails.belongsTo(Sales, {
    foreignKey: 'idSales',
    targetKey: 'idSales',
    as: 'sale',
    onDelete: 'CASCADE'
});

// Relación entre SalesDetails y Product
SalesDetails.belongsTo(Product, {
    foreignKey: 'idProduct',
    targetKey: 'idProduct',
    as: 'product'
});

//Relacion entre Sales y Company

Sales.belongsTo(Company, {
    foreignKey: 'ruc',
    targetKey: 'ruc',
    as: 'company'
});

module.exports = {
    Product,
    Category,
    User,
    Employee,
    Role,
    Sales,
    SalesDetails,
    Service,
    Company
};  

// Agregar función para sincronizar todos los modelos
const sequelize = require('../config/db');
async function syncAllModels() {
    try {
        await sequelize.sync({ alter: true }); // Usa alter:true para actualizar tablas sin perder datos
        console.log('Todos los modelos han sido sincronizados correctamente.');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
}

module.exports.syncAllModels = syncAllModels;