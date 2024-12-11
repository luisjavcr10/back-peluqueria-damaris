const express = require('express');
const router = express.Router();

const RoleService = require('../services/roles.service');
const service = new RoleService();

router.get('/', async (req, res, next) => {
    try {
        const roles = await service.find();
        res.status(200).json(roles);
    } catch (error) {
        const httpError = new Error('Error al obtener los roles');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const role = await service.findById(id);
        res.status(200).json(role);
    } catch (error) {
        const httpError = new Error('Error al encontrar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newRole = await service.create(body);
        res.json(newRole);
    } catch (error) {
        const httpError = new Error('Error al crear el rol');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedRole = await service.update(id, changes);
        res.json(updatedRole);
    } catch (error) {
        const httpError = new Error('Error al actualizar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;
