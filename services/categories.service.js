const Category = require('./../models/categories.model');
const boom = require('@hapi/boom');

class CategoriesService {

    constructor(){
        this.categories = [];
    }

    // Método privado para manejar errores
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

    async find() {
        try {
            const categories = await Category.findAll();
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