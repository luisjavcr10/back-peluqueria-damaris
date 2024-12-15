const express = require('express');
const router = express.Router();
const EmployeeService = require('../services/employees.service');
const service = new EmployeeService();
const {ValidatorHandler} = require('../middlewares');
const {EmployeeSchema, PaginatorSchema} = require('./../schemas');


router.get('/', 
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async (req, res, next) => {
    try {
        const employees = await service.find(req.query);
        res.status(200).json(employees);
    } catch (error) {
        const httpError = new Error('Error al obtener los empleados');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', 
    ValidatorHandler.handle(EmployeeSchema.get(),'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await service.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        const httpError = new Error('Error al encontrar el empleado');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    ValidatorHandler.handle(EmployeeSchema.create(),'body'),
    async (req, res, next) => {
    try {
        const body = req.body;
        const newEmployee = await service.create(body);
        res.status(201).json(newEmployee);
    } catch (error) {
        const httpError = new Error('Error al crear el empleado');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', 
    ValidatorHandler.handle(EmployeeSchema.get(),'params'),
    ValidatorHandler.handle(EmployeeSchema.update(),'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedEmployee = await service.update(id, changes);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        const httpError = new Error('Error al actualizar el empleado');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id',
    ValidatorHandler.handle(EmployeeSchema.get(),'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.status(204).json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el empleado');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;
