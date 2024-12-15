const express = require('express');
const router = express.Router();
const RoleService = require('../services/roles.service');
const service = new RoleService();
const {ValidatorHandler} = require('../middlewares');
const {RoleSchema, PaginatorSchema} = require('./../schemas');

router.get('/', 
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const roles = await service.find(req.query);
        res.status(200).json(roles);
    } catch (error) {
        const httpError = new Error('Error al obtener los roles');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', 
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = await service.findById(id);
        res.status(200).json(role);
    } catch (error) {
        const httpError = new Error('Error al encontrar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    ValidatorHandler.handle(RoleSchema.create(), 'body'),
    async (req, res, next) => {
    try {
        const body = req.body;
        const newRole = await service.create(body);
        res.json(newRole);
    } catch (error) {
        const httpError = new Error('Error al crear el rol');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', 
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    ValidatorHandler.handle(RoleSchema.update(), 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedRole = await service.update(id, changes);
        res.json(updatedRole);
    } catch (error) {
        const httpError = new Error('Error al actualizar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id',
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el rol');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;
