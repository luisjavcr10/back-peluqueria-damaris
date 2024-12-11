const Service = require('./../models/services.model');
const boom = require('@hapi/boom');

class ServiceService {
    constructor(){}

    _handleError(error, message) {
        if (!boom.isBoom(error)) {
            console.error('Error inesperado:', error.message);
            throw boom.internal(message, { originalError: error.message });
        }
        throw error; 
    }

    async create (data){
        try {
            const newService = await Service.create({
                    name : data.name,
                    description: data.description,
                    price : data.price,
                    state : data.state
            });
            return newService;
        } catch (error) {
            this._handleError(error,'Error al crear el servicio');
        }
    };

    async find (){
        try {
            const services = await Service.findAll();
            return services;
        } catch (error) {
            this._handleError(error,'Error al obtener servicios');
        }
    };

    async findById (id){
        try {
            const service = Service.findByPk(id);
            if(!service){
                throw boom.notFound(`El servicio con id: ${id} no fue encontrado.`);
            }
            return service;
        } catch (error) {
            this._handleError(error,'Error al buscar el servicio');
        }
    };

    async update (id,changes){
        try {
            const service = await Service.findByPk(id);
            if(!service){
                throw boom.notFound(`El servicio con id: ${id} no fue encontrado.`);
            }
            const updatedService = await Service.update(changes);
            return updatedService;
        } catch (error) {
            this._handleError(error,'Error al actualizar el servicio');
        }
    };

    async delete (id){
        try {
            const service = await Service.findByPk(id);
            if(!service){
                throw boom.notFound(`El servicio con id: ${id} no fue encontrado.`);
            }
            await service.destroy(id);
            return {
                message : `Servicio con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            this._handleError(error,'Error al eliminar el servicio');
        }
    };

};

module.exports = ServiceService;