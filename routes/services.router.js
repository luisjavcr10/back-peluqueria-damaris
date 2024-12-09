const express = require('express');
const router = express.Router();

const ServiceService = require('./../services/services.service');
const service = new ServiceService();

router.get('/', async(req,res,next) =>{
    try {
        const services = await service.find();
        res.json(services);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req,res) =>{
    const {id} = req.params;
    try {
        const aService = await service.findById(id);
        res.json(aService);
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
});

router.post('/', async(req,res) =>{
    const body = req.body;
    try {
        const newService = service.create(body)
        res.json(newService);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const changes = req.body;
    try {
        const updatedService = service.update(id,changes);
        res.json(updatedService);
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

router.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    try {
        const result = service.delete(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

module.exports = router;