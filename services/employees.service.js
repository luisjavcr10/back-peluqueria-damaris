const Employee = require('./../models/employees.model');
const boom = require('@hapi/boom');

class EmployeeService {
    constructor(){
    }

    _handleError(error, message) {
        if (!boom.isBoom(error)) {
            console.error('Error inesperado:', error.message);
            throw boom.internal(message, { originalError: error.message });
        }
        throw error; 
    }

    async create(data){
        try {
            if (!data.idUser) {
                throw new Error('El idUser es requerido');
            }
            const employee = new Employee(data);
            await employee.save();
            return employee;
        } catch (error) {
            this._handleError(error,'Error al crear el empleado:' );
        }
    };

    async find(){
        try {
            return await Employee.find();
        } catch (error) {
            this._handleError(error, 'Error al obtener empleados');
        }
    };

    async findById(id){
        try {
            return await Employee.findById(id);
        } catch (error) {
            this._handleError(error, 'Error al buscar el empleado');
        }
    };

    async update(id, changes){
        try {
            return await Employee.findByIdAndUpdate(id, changes, { new: true });
        } catch (error) {
            this._handleError(error,'Error al actualizar el empleado', );
        }
    };

    async delete(id){
        try {
            return await Employee.findByIdAndDelete(id);
        } catch (error) {
            this._handleError(error,'Error al eliminar el empleado' );
        }
    };
}

module.exports = EmployeeService;