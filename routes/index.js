const express = require('express');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const servicesRouter = require('./services.router');
const rolesRouter = require('./roles.router');
const usersRouter = require('./users.router');
const employeesRouter = require('./employees.router');
const saleRouter = require('./sales.router');
const authRouter= require('./auth.router');
const paypalRouter = require('./payPal.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/categories',categoriesRouter);
    router.use('/products',productsRouter);
    router.use('/services', servicesRouter);
    router.use('/roles',rolesRouter);
    router.use('/users',usersRouter);
    router.use('/employees',employeesRouter);
    router.use('/sales',saleRouter);
    router.use('/paypal',paypalRouter)
}

module.exports = routerApi;
 