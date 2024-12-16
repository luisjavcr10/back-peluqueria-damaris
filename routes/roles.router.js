const express = require('express');
const router = express.Router();
const passport = require('passport');

const RoleService = require('../services/roles.service');
const service = new RoleService();
const {ValidatorHandler} = require('../middlewares');
const {checkRoles} = require('./../middlewares/auth.handler');
const {RoleSchema, PaginatorSchema} = require('./../schemas');

router.get('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('Administrador','Empleado'),
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const roles = await service.find(req.query);
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('Administrador','Empleado'),
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = await service.findById(id);
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
});

router.post('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles(['Administrador']),
    ValidatorHandler.handle(RoleSchema.create(), 'body'),
    async (req, res, next) => {
    try {
        const body = req.body;
        const newRole = await service.create(body);
        res.json(newRole);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles(['Administrador']),
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    ValidatorHandler.handle(RoleSchema.update(), 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedRole = await service.update(id, changes);
        res.json(updatedRole);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
    passport.authenticate('jwt', {session : false}), 
    checkRoles(['Administrador']),
    ValidatorHandler.handle(RoleSchema.get(), 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
