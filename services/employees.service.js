const sequelize = require('../config/db');
const {Employee, User, Role} =  require('./../models')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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
 
    async create(data) {
        const t = await sequelize.transaction();
        try {
            const cryptPassword = await bcrypt.hash(data.passwordHash, 10);
            const newUser = await User.create({
                name: data.name,
                email: data.email,
                passwordHash: cryptPassword,
                idRole: data.idRole
            }, { transaction: t });
            const newEmployee = await Employee.create({
                idUser: newUser.idUser,
                name: data.name,
                phone: data.phone,
                adress: data.adress,
            }, { transaction: t });
            await t.commit();
            return newEmployee;
        } catch (error) {
            this._handleError(error, 'Error al crear el empleado:');
        }
    }

    async find(query){
        try {
            const options = {
                include : [{
                    model : User,
                    as :'user' ,
                    attributes : ['name','email','passwordHash','idRole'],
                    include : [{
                        model: Role,
                        as : 'role',
                        attributes : ['name','description']
                    }]
                }]
            }
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
            const employee = await Employee.findByPk(id);
            if (!employee) {
                throw boom.notFound('Empleado no encontrado');
            }
            return employee;
        } catch (error) {
            this._handleError(error, 'Error al buscar el empleado');
        }
    };

    async update(id, changes){
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                throw boom.notFound('Empleado no encontrado');
            }
            const updatedEmployee = await employee.update();
            return updatedEmployee;
        } catch (error) {
            this._handleError(error,'Error al actualizar el empleado', );
        }
    };

    async delete(id){
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                throw boom.notFound('Empleado no encontrado');
            }
            await employee.destroy();;
            return {
                message : `Empleado con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            this._handleError(error,'Error al eliminar el empleado' );
        }
    };
}

module.exports = EmployeeService;