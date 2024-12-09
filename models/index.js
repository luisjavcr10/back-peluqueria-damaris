const Product = require('./products.model');
const Category = require('./categories.model');
const User = require('./users.model');
const Employee = require('./employees.model');
const Role = require('./roles.model');

// Definir las asociaciones
Category.hasMany(Product, {
    foreignKey: 'idCategory',
    sourceKey: 'idCategory',
    as: 'productos'
});

Product.belongsTo(Category, {
    foreignKey: 'idCategory',
    targetKey: 'idCategory',
    as: 'categoria'
});

// Relación entre Role y User
Role.hasMany(User, {
    foreignKey: 'idRole',
    sourceKey: 'idRole',
    as: 'usuarios'
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
    as: 'empleado'
});

Employee.belongsTo(User, {
    foreignKey: 'idUser',
    targetKey: 'idUser',
    as: 'usuario'
});

module.exports = {
    Product,
    Category,
    User,
    Employee,
    Role
}; 