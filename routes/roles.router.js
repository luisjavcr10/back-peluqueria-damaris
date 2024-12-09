const express = require('express');
const router = express.Router();

const RoleService = require('./../services/roles.service');
const service = new RoleService();

router.get('/', async (req, res, next) => {
    try {
        const roles = await service.find();
        res.json(roles);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const role = await service.findById(id);
        res.json(role);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newRole = await service.create(body);
        res.json(newRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedRole = await service.update(id, changes);
        res.json(updatedRole);
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
