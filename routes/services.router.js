const express = require('express');
const router = express.Router();

const ServiceService = require('../services/services.service');
const service = new ServiceService();

router.get('/', async(req,res,next) =>{
    try {
        const services = await service.find();
        res.status(200).json(services);
    } catch (error) {
        const httpError = new Error('Error al obtener los servicios');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', async(req,res) =>{
    const {id} = req.params;
    try {
        const aService = await service.findById(id);
        res.status(200).json(aService);
    } catch (error) {
        const httpError = new Error('Error al encontrar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', async(req,res) =>{
    const body = req.body;
    try {
        const newService =  await service.create(body)
        res.json(newService);
    } catch (error) {
        const httpError = new Error('Error al crear el servicio');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const changes = req.body;
    try {
        const updatedService = await service.update(id,changes);
        res.json(updatedService);
    } catch (error) {
        const httpError = new Error('Error al actualizar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el servicio');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;