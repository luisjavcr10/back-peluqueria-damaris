const express = require('express');
const router = express.Router();

const ProductService = require('./../services/products.service');
const service = new ProductService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await service.findById(id);
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
});

router.post('/', async(req,res)=>{
    const body = req.body;
    try {
        const newProduct = await service.create(body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    try {
        const updatedProduct = await service.update(id,changes);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});


module.exports = router;