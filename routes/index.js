const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const servicesRouter = require('./services.router');
const rolesRouter = require('./roles.router');
const usersRouter = require('./users.router');
const employeesRouter = require('./employees.router');
const saleRouter = require('./sales.router');

function routerApi(app){
    app.use('/categories',categoriesRouter);
    app.use('/products',productsRouter);
    app.use('/services', servicesRouter);
    app.use('/roles',rolesRouter);
    app.use('/users',usersRouter);
    app.use('/employees',employeesRouter);
    app.use('/sales',saleRouter);
}

module.exports = routerApi;