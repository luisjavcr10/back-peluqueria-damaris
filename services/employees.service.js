const {Employee} =  require('./../models')
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

    async find(query){
        try {
            const options = {}
            const {limit, offset} = query;
            if(limit && offset){
                options.limit = parseInt(limit, 10);
                options.offset = parseInt(offset, 10);
            }
            const employees = Employee.findAll(options);
            return employees
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