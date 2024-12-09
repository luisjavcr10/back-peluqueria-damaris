const Role  = require('./../models/roles.model');

class RoleService{
    async create(data){
        try {
            const newRole = await Role.create({
                name : data.name,
                description : data.description,
            })
            return newRole;
        } catch (error) {
            console.error('Error al crear el rol:', error.message);
            throw error;
        }
    };

    async find(){
        try {
            const roles = await Role.findAll();
            return roles;
        } catch (error) {
            console.error('Error al obtener roles:', error);
            throw new Error('No se pudieron obtener los roles');
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
            console.error('Error al buscar el rol:', error.message);
            throw error;
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
            console.error('Error al actualizar el rol:', error.message);
            throw error;
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
            console.log('Error al eliminar el rol', error.message);
            throw error;
        }
    };
            
}

module.exports = RoleService;