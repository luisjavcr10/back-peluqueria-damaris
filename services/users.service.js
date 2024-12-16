const {User, Role} = require('./../models');
const boom = require('@hapi/boom');

class UserService {

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
            if (!data.idRole) {
                throw new Error('El idRole es requerido');
            }
            const user = new User(data);
            await user.save();
            return user;
        } catch (error) {
            this._handleError(error,'No se pudo crear el servicio');
        }
    };

    async find(query){
        try {
            const options = {
                include : [{
                    model : Role,
                    as : 'role',
                    attributes : ['name','description']
                }]
            }
            const {limit, offset} = query;
            if(limit && offset){
                options.limit = parseInt(limit, 10);
                options.offset = parseInt(offset, 10);
            }
                options.limit = limit;
            const users =  await User.scope('noIdRole','noActive').findAll(options);
            return users; 
        } catch (error) {
            this._handleError(error,'No se pudo encontrar los servicios');
        }
    };

    async findById(id){
        try {
            const user = await User.scope('noIdRole','noActive').findByPk(id,{
                include : [{
                    model : Role,
                    as : 'role',
                    attributes : ['name','description']
                }]
            });
            if(!user){
                throw boom,boom.notFound(`User con Id: ${id} no encontrado`);
            }
            return user;
        } catch (error) {
            this._handleError(error,'No se pudo encontrar el servicio');
        }
    };

    async update(id, changes){
        try {
            const user = await User.findByPk(id);
            if(!user){
                throw boom,boom.notFound(`User con Id: ${id} no encontrado`);
            }
            const updatedUser = await user.update(changes);
            return updatedUser;
        } catch (error) {
            this._handleError(error,'No se pudo actualizar el servicio');
        }
    };

    async delete(id){
        try {
            const user = await User.findByPk(id);
            if(!user){
                throw boom,boom.notFound(`User con Id: ${id} no encontrado`);
            }
            await user.destroy();
            return {
                message: `Usuario con el id: ${id} eliminado correctamente`
            };
        } catch (error) {
            this._handleError(error,'No se pudo eliminar el servicio');
        }
    };

    async findByEmail(email){
        try {
            const user = User.findOne({
                where: {email}
            })
            return user;
        } catch (error) {
            this._handleError(error,'No se pudo encontrar el usuario');
        }
    }

    async getRole (id){
        try {
            const user = await User.findByPk(id);      
            if (!user) {
                throw boom.notFound(`User con Id: ${id} no encontrado`);
            }
            const role = await Role.findByPk(user.idRole);
            if (!role) {
                throw boom.notFound(`Role con Id: ${user.idRole} no encontrado`);
            }
            return role.name;
        } catch (error) {
            this._handleError(error,'No se pudo obtener el role');
        }
        
    }
}

module.exports = UserService;