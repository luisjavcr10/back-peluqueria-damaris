const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');
const service = new UserService();
const validatorHandler = require('./../middlewares/validator.handler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('./../schemas/user.schema');
const queryPaginatorSchema = require('./../schemas/paginator.schema');

router.get('/', 
    validatorHandler(queryPaginatorSchema,'query'),
    async (req, res, next) => {
    try {
        const users = await service.find(req.query);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        const httpError = new Error('Error al obtener los usuarios');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.findById(id);
        res.status(200).json(user);
    } catch (error) {
        const httpError = new Error('Error al encontrar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    validatorHandler(createUserSchema,'body'),
    async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await service.create(body);
        res.json(newUser);
    } catch (error) {
        const httpError = new Error('Error al crear el usuario');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', 
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema,'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedUser = await service.update(id, changes);
        res.json(updatedUser);
    } catch (error) {
        const httpError = new Error('Error al actualizar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => { 
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        const httpError = new Error('Error al eliminar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;