const User = require('./../models/users.model');
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

    async find(){
        try {
            return await User.find();
        } catch (error) {
            tthis._handleError(error,'No se pudo encontrar los servicios');
        }
    };

    async findById(id){
        try {
            const user = User.findById(id);
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
            return await User.findByIdAndUpdate(id, changes, { new: true });
        } catch (error) {
            this._handleError(error,'No se pudo actualizar el servicio');
        }
    };

    async delete(id){
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            this._handleError(error,'No se pudo eliminar el servicio');
        }
    };
}

module.exports = UserService;