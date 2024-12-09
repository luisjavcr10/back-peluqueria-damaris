const express = require('express');
const router = express.Router();

const UserService = require('../services/users.service');
const service = new UserService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await service.findById(id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newUser = await service.create(body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedUser = await service.update(id, changes);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;