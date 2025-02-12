const express = require('express');
const router = express.Router();
const passport = require('passport');

const ServiceService = require('../services/services.service');
const service = new ServiceService();
const {ValidatorHandler} = require('../middlewares');
const {checkRoles} = require('./../middlewares/auth.handler');

const {ServiceSchema, PaginatorSchema} = require('../schemas');

router.get('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async(req,res,next) =>{
    try {
        const services = await service.find(req.query);
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const aService = await service.findById(id);
        res.status(200).json(aService);
    }catch (error) {
        next(error);
    }
});

router.post('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ServiceSchema.create(), 'body'),
    async(req,res, next) =>{
    try {
        const body = req.body;
        const newService =  await service.create(body)
        res.json(newService);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    ValidatorHandler.handle(ServiceSchema.update(), 'body'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const changes = req.body;
        const updatedService = await service.update(id,changes);
        res.json(updatedService);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR'),
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;