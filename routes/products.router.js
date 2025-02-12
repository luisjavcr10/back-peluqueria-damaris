const express = require('express');
const router = express.Router();
const passport = require('passport');

const ProductService = require('../services/products.service');
const service = new ProductService();
const {ValidatorHandler} = require('../middlewares');
const {checkRoles} = require('./../middlewares/auth.handler');
const {ProductSchema, PaginatorSchema, CategorySchema} = require('../schemas');

router.get('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const categories = await service.find(req.query);
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const product = await service.findById(id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.get('/category/:id',
    passport.authenticate('jwt', {session:false}),
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(CategorySchema.get(),'params'),
    async(req, res, next) =>{
        try {
            const{id} = req.params;
            const products = await service.findByCategory(id);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ProductSchema.create(),'body'),
    async(req,res, next)=>{
    try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    ValidatorHandler.handle(ProductSchema.update(),'body'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const changes = req.body;
        const updatedProduct = await service.update(id,changes);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;