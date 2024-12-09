const Product = require('../models/products.model');

class ProductService {

    constructor(){}

    async create(data){
        try {
            const newCategory = await Product.create({
                name : data.name,
                description : data.description,
                idCategory : data.idCategory ,
                price : data.price,
                stock : data.stock,
                arrivalDate : data.arrivalDate,
                expirationDate : data.expirationDate,
                state : data.state
            });
            return newCategory;
        } catch (error) {
            console.error('Error al crear el producto:', error.message);
            throw error;
        } 
    }

    async find(){
        try {
            const products =  await Product.findAll();
            return products;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw new Error('No se pudieron obtener los productos');
        }
    }

    async findById(id){
        try {
            const product = Product.findByPk(id);
            if(!product){
                throw new Error(`El producto con id: ${id} no se encontró`)
            }
            return product;
        } catch (error) {
            console.error('Error al buscar el producto:', error.message);
            throw error;
        }
    }

    async update(id, changes){
        try {
            const product = await Product.findByPk(id);
            if(!product){
                throw new Error(`El producto con id: ${id} no se encontró`)
            }
            const updatedProduct = await product.update(changes);
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error.message);
            throw error;
        }
    }

    async delete(id){
        try {
            const product = await Product.findByPk(id);
            if(!product){
                throw new Error(`El producto con id: ${id} no se encontró`)
            }
            await Product.destroy(id);
            return {
                message : `Producto con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            console.log('Error al eliminar el producto', error.message);
            throw error;
        }
    }

}

module.exports = ProductService;
