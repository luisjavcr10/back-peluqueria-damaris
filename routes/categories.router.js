const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categories.service');
const service = new CategoriesService();
const validatorHandler = require('./../middlewares/validator.handler');
const {createCategorySchema, updatedCategorySchema,getCategorySchema} = require('./../schemas/category.schema');
const queryPaginatorSchema = require('./../schemas/paginator.schema');

router.get('/',
    validatorHandler(queryPaginatorSchema,'query'),
    async (req, res, next) => {
    try {
        const categories = await service.find(req.query);
        res.status(200).json(categories);
    } catch (error) {
        const httpError = new Error('Error al obtener las categorias');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id',
    validatorHandler(getCategorySchema,'params'),
    async(req,res,next) => {
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

router.post('/', 
    validatorHandler(createCategorySchema,'body'),
    async (req,res,next) => {
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

router.put('/:id', 
    validatorHandler(getCategorySchema,'params'),
    validatorHandler(updatedCategorySchema,'body'),
    async (req,res,next) => {
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

router.delete('/:id', 
    validatorHandler(getCategorySchema,'params'),
    async (req,res,next) => {
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