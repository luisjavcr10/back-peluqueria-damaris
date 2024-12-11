const express = require('express');
const router = express.Router();

const ProductService = require('../services/products.service');
const service = new ProductService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.status(200).json(categories);
    } catch (error) {
        const httpError = new Error('Error al obtener los productos');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await service.findById(id);
        res.status(200).json(product);
    } catch (error) {
        const httpError = new Error('Error al encontrar el producto');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', async(req,res)=>{
    const body = req.body;
    try {
        const newProduct = await service.create(body);
        res.json(newProduct);
    } catch (error) {
        const httpError = new Error('Error al crear el producto');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    try {
        const updatedProduct = await service.update(id,changes);
        res.json(updatedProduct);
    } catch (error) {
        const httpError = new Error('Error al actualizar el producto');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el producto');
        httpError.status = 404;
        next(httpError);
    }
});


module.exports = router;