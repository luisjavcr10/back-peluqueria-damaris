const express = require('express');
const router = express.Router();
const ProductService = require('../services/products.service');
const service = new ProductService();
const {ValidatorHandler} = require('../middlewares');
const {ProductSchema, PaginatorSchema} = require('../schemas');

router.get('/', 
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const categories = await service.find(req.query);
        res.status(200).json(categories);
    } catch (error) {
        const httpError = new Error('Error al obtener los productos');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', 
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const product = await service.findById(id);
        res.status(200).json(product);
    } catch (error) {
        const httpError = new Error('Error al encontrar el producto');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    ValidatorHandler.handle(ProductSchema.create(),'body'),
    async(req,res, next)=>{
    try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.json(newProduct);
    } catch (error) {
        const httpError = new Error('Error al crear el producto');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', 
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    ValidatorHandler.handle(ProductSchema.update(),'body'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const changes = req.body;
        const updatedProduct = await service.update(id,changes);
        res.json(updatedProduct);
    } catch (error) {
        const httpError = new Error('Error al actualizar el producto');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', 
    ValidatorHandler.handle(ProductSchema.get(),'params'),
    async(req,res, next)=>{
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el producto');
        httpError.status = 404;
        next(httpError);
    }
});


module.exports = router;