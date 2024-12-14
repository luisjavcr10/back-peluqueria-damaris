const express = require('express');
const router = express.Router();
const ServiceService = require('../services/services.service');
const service = new ServiceService();
const {ValidatorHandler} = require('../middlewares');
const {ServiceSchema, PaginatorSchema} = require('../schemas');

router.get('/', 
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async(req,res,next) =>{
    try {
        const services = await service.find(req.query);
        res.status(200).json(services);
    } catch (error) {
        const httpError = new Error('Error al obtener los servicios');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', 
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const aService = await service.findById(id);
        res.status(200).json(aService);
    } catch (error) {
        const httpError = new Error('Error al encontrar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    ValidatorHandler.handle(ServiceSchema.create(), 'body'),
    async(req,res, next) =>{
    try {
        const body = req.body;
        const newService =  await service.create(body)
        res.json(newService);
    } catch (error) {
        const httpError = new Error('Error al crear el servicio');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', 
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    ValidatorHandler.handle(ServiceSchema.update(), 'body'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const changes = req.body;
        const updatedService = await service.update(id,changes);
        res.json(updatedService);
    } catch (error) {
        const httpError = new Error('Error al actualizar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', 
    ValidatorHandler.handle(ServiceSchema.get(), 'params'),
    async(req,res, next) =>{
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;