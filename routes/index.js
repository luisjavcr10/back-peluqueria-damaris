const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');

function routerApi(app){
    app.use('/categories',categoriesRouter);
    app.use('/products',productsRouter);
}

module.exports = routerApi;