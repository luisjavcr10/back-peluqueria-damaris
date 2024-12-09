const Product = require('./products.model');
const Category = require('./categories.model');

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

module.exports = {
    Product,
    Category
}; 