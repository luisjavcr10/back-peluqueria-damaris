const {Category} = require('./../models');
const boom = require('@hapi/boom');

class CategoriesService {

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
        try {
            const newCategory = await Category.create({
                name: data.name,
                description: data.description,
            });
            return newCategory;
        } catch (error) {
            this._handleError(error, 'Error al crear la categoría');
        }
    }

    async find(query) {
        try {
            const options = {}
            const {limit, offset} = query;
            if(limit && offset){
                options.limit = parseInt(limit, 10);
                options.offset = parseInt(offset, 10);
            }
            const categories = await Category.findAll(options);
            return categories;
        } catch (error) {
            this._handleError(error, 'Error al obtener las categorías');
        }
    }

    async findById(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw boom.notFound('Categoría no encontrada');
            }
            return category;
        } catch (error) {
            this._handleError(error, 'Error al buscar la categoría');
        }
    }

    async update(id, changes) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw boom.notFound('Categoría no encontrada');
            }
            const updatedCategory = await category.update(changes);
            return updatedCategory;
        } catch (error) {
            this._handleError(error, 'Error al actualizar la categoría');
        }
    }

    async delete(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw boom.notFound('Categoría no encontrada');
            }
            await category.destroy();
            return {
                message: `Categoría con el id: ${id} eliminada correctamente`
            };
        } catch (error) {
            this._handleError(error, 'Error al eliminar la categoría');
        }
    }
}

module.exports = CategoriesService;