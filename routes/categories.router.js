const express = require('express');

const CategoriesService = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',async(req,res) => {
    const {id} = req.params;
    try {
        const category = await  service.findById(id);
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req,res) => {
    const body = req.body;
    try {  
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        const updatedCategory = await service.update(id,body);
        res.json({updatedCategory});
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch ({error}) {
        res.status(404).json({
            message : error.message
        })
    }
});

module.exports = router;