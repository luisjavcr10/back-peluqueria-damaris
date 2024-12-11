const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categories.service');
const service = new CategoriesService();


router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.status(200).json(categories);
    } catch (error) {
        const httpError = new Error('Error al obtener las categorias');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id',async(req,res,next) => {
    try {
        const {id} = req.params;
        const category = await  service.findById(id);
        res.status(200).json(category);
    } catch (error) {
        const httpError = new Error('Error al encontrar la categoria');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', async (req,res,next) => {
    try {  
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    } catch (error) {
        const httpError = new Error('Error al crear la categoria');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', async (req,res,next) => {
    try {   
        const {id} = req.params;
        const body = req.body;
        const updatedCategory = await service.update(id,body);
        res.status(200).json({updatedCategory});
    } catch (error) {
        const httpError = new Error('Error al actualizar la categoria');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.status(200).json(result);
    } catch ({error}) {
        const httpError = new Error('Error al eliminar la  categoria');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;