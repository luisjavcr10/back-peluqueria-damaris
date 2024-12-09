const Category = require('./../models/categories.model');

class CategoriesService {

    constructor(){
        this.categories =[];
    }

    async create (data){
        try {
            const newCategory = await Category.create({
                name : data.name,
                description: data.description,
            })
            return newCategory;
        } catch (error) {
            console.error('Error al crear la categoría:', error.message);
            throw error;
        }
    }

    async find(){
        try {
            const categories = await Category.findAll();
            return categories;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            throw new Error('No se pudieron obtener las categorías');
        }
        
    }

    async findById(id){
        try {
            const category = await Category.findByPk(id);
            if(!category){
                throw new Error (`Categoría con ID ${id} no encontrada`);
            }
            return category;
        } catch (error) {
            console.error('Error al buscar la categoría:', error.message);
            throw error;
        }
    }

    async update(id,changes){
        try {
            const category = await Category.findByPk(id);
            if(!category){
                throw new Error (`Categoría con ID ${id} no encontrada`);
            }
            const updatedCategory = await category.update(changes);
            return updatedCategory;
        } catch (error) {
            console.error('Error al actualizar la categoría:', error.message);
            throw error;
        }

    }

    async delete(id){
        try {
            const category = await Category.findByPk(id);
            if(!category){
                throw new Error (`Categoría con ID ${id} no encontrada`);
            }
            await category.destroy();
            return {
                message : `Categoria con el id: ${id} eliminada correctamente`
            }
        } catch (error) {
            console.error('Error al eliminar la categoría:', error.message);
            throw error;
        }

    }

}

module.exports = CategoriesService;