const express = require('express');
const router = express.Router();

const EmployeeService = require('./../services/employees.service');
const service = new EmployeeService();

router.get('/', async (req, res, next) => {
    try {
        const employees = await service.find();
        res.json(employees);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await service.findById(id);
        res.json(employee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newEmployee = await service.create(body);
        res.json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedEmployee = await service.update(id, changes);
        res.json(updatedEmployee);
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
