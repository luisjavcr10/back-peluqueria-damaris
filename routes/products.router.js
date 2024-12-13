const express = require('express');
const router = express.Router();
const ProductService = require('../services/products.service');
const service = new ProductService();
const validatorHandler = require('./../middlewares/validator.handler');
const {createdProductSchema, updatedProductSchema, getProductSchema} = require('./../schemas/product.schema');
const queryPaginatorSchema = require('./../schemas/paginator.schema');

router.get('/', 
    validatorHandler(queryPaginatorSchema,'query'),
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
    validatorHandler(getProductSchema,'params'),
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
    validatorHandler(createdProductSchema,'body'),
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
    validatorHandler(getProductSchema,'params'),
    validatorHandler(updatedProductSchema,'body'),
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
    validatorHandler(getProductSchema,'params'),
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