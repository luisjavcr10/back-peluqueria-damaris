const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');
const service = new UserService();
const {ValidatorHandler} = require('../middlewares');
const {UserSchema, PaginatorSchema} = require('../schemas');

router.get('/', 
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const users = await service.find(req.query);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    ValidatorHandler.handle(UserSchema.get(), 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/', 
    ValidatorHandler.handle(UserSchema.create(),'body'),
    async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await service.create(body);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', 
    ValidatorHandler.handle(UserSchema.get(), 'params'),
    ValidatorHandler.handle(UserSchema.update(),'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedUser = await service.update(id, changes);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', 
    ValidatorHandler.handle(UserSchema.get(), 'params'),
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