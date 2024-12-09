const Service = require('./../models/services.model');

class ServiceService {
    constructor(){}

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
            console.error('Error al crear el servicio:', error.message);
            throw error;
        }
    };

    async find (){
        try {
            const services = await Service.findAll();
            return services;
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw new Error('No se pudieron obtener los servicios');
        }
    };

    async findById (id){
        try {
            const service = Service.findByPk(id);
            if(!service){
                throw new Error(`El servicio con id: ${id} no fue encontrado.`)
            }
            return service;
        } catch (error) {
            console.error('Error al buscar el servicio:', error.message);
            throw error;
        }
    };

    async update (id,changes){
        try {
            const service = await Service.findByPk(id);
            if(!service){
                throw new Error(`El servicio con id: ${id} no fue encontrado.`)
            }
            const updatedService = await Service.update(changes);
            return updatedService;
        } catch (error) {
            console.error('Error al actualizar el servicio:', error.message);
            throw error;
        }
    };

    async delete (id){
        try {
            const service = await Service.findByPk(id);
            if(!service){
                throw new Error(`El servicio con id: ${id} no fue encontrado.`)
            }
            await service.destroy(id);
            return {
                message : `Servicio con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            console.log('Error al eliminar el servicio', error.message);
            throw error;
        }
    };

};

module.exports = ServiceService;