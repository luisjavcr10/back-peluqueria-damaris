const Role  = require('./../models/roles.model');
const boom = require('@hapi/boom');

class RoleService{
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
            const newRole = await Role.create({
                name : data.name,
                description : data.description,
            })
            return newRole;
        } catch (error) {
            this._handleError(error, 'Error al crear el rol');
        }
    };

    async find(){
        try {
            const roles = await Role.findAll();
            return roles;
        } catch (error) {
            this._handleError(error, 'Error al obtener roles');
        }
    };

    async findById(id){
        try {
            const role = await Role.findByPk(id);
            if(!role){
                throw new Error(`El rol con id: ${id} no se encontró`)
            }
            return role;
        } catch (error) {
            this._handleError(error, 'Error al buscar el rol');
        }
    };

    async update(id,changes){
        try {
            const role = await Role.findByPk(id);
            if(!role){
                throw new Error(`El rol con id: ${id} no se encontró`)
            };
            const updatedRole = await role.update(changes);
            return updatedRole;
        } catch (error) {
            this._handleError(error, 'Error al actualizar el rol');
        }
    };

    async delete(id){
        try {
            const role =  await Role.findByPk(id);
            if(!role){
                throw new Error(`El rol con id: ${id} no se encontró`)
            };
            await role.destroy(id);
            return {
                message : `Rol con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            this._handleError(error, 'Error al eliminar el rol');
        }
    };
            
}

module.exports = RoleService;