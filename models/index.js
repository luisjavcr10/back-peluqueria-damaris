const Product = require('./products.model');
const Category = require('./categories.model');
const User = require('./users.model');
const Employee = require('./employees.model');
const Role = require('./roles.model');
const Sales = require('./sales.model');
const SalesDetails = require('./salesDetails.model'); 


// Definir las asociaciones
Category.hasMany(Product, {
    foreignKey: 'idCategory',
    sourceKey: 'idCategory',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'idCategory',
    targetKey: 'idCategory',
    as: 'categories'
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
    as: 'rol'
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

//Relacion entre Sales y User
Sales.belongsTo(User,{
    foreignKey: 'idUser',
    targetKey: 'idUser',
    as: 'user'
});

//Relacion entre sales y salesDetails
Sales.hasMany(SalesDetails,{
    foreignKey: 'idSales',
    sourceKey: 'idSales',
    as: 'details',
    //onDelete: 'CASCADE'
});

SalesDetails.belongsTo(Sales, {
    foreignKey: 'idSales',
    targetKey: 'idSales',
    as: 'sale',
    //onDelete: 'CASCADE'
});

//Relacion entre salesDetails y products
SalesDetails.belongsTo(Product, {
    foreignKey: 'idProduct',
    targetKey: 'idProduct',
    as: 'product'
});

module.exports = {
    Product,
    Category,
    User,
    Employee,
    Role,
    Sales,
    SalesDetails
}; 