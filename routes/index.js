const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const servicesRouter = require('./../routes/services.router');

function routerApi(app){
    app.use('/categories',categoriesRouter);
    app.use('/products',productsRouter);
    app.use('/services', servicesRouter);
}

module.exports = routerApi;