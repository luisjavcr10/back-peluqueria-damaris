const express = require('express');
const router = express.Router();
const passport = require('passport');

const {ValidatorHandler, /*AuthHandler*/} = require('../middlewares');
const {checkRoles} = require('./../middlewares/auth.handler');
const {CategorySchema,PaginatorSchema} = require('./../schemas');
const CategoriesService = require('../services/categories.service');
const service = new CategoriesService();


router.get('/',
    passport.authenticate('jwt', {session : false}), 
    checkRoles('Administrador','Empleado'),
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
    checkRoles(['Administrador','Empleado']),
    ValidatorHandler.handle(CategorySchema.get(),'params'),
    async(req,res,next) => {
    try {
        const {id} = req.params;
        const category = await  service.findById(id);
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
});

router.post('/',
    passport.authenticate('jwt', {session : false}), 
    checkRoles(['Administrador']),
    ValidatorHandler.handle(CategorySchema.create(),'body'),
    async (req,res,next) => {
    try {  
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

router.put('/:id',
    passport.authenticate('jwt', {session : false}), 
    checkRoles(['Administrador']),
    ValidatorHandler.handle(CategorySchema.get(),'params'),
    ValidatorHandler.handle(CategorySchema.update(),'body'),
    async (req,res,next) => {
    try {   
        const {id} = req.params;
        const body = req.body;
        const updatedCategory = await service.update(id,body);
        res.status(200).json({updatedCategory});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
    passport.authenticate('jwt', {session : false}),
    checkRoles(['Administrador']), 
    ValidatorHandler.handle(CategorySchema.get(),'params'),
    async (req,res,next) => {
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;