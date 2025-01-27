const {Product, Category} = require('./../models')
const boom = require('@hapi/boom');

class ProductService {

    constructor(){}

    _handleError(error, message) {
        if (!boom.isBoom(error)) {
            console.error('Error inesperado:', error.message);
            throw boom.internal(message, { originalError: error.message });
        }
        throw error; 
    }

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
            this._handleError(error, 'Error al crear el producto');
        } 
    }

    async find(query){
        try {
            const options = {
                include: [{
                    model: Category,
                    as: 'category',
                    attributes : ['idCategory','name', 'description']
                }]
            }
            const {limit, offset} = query;
            if(limit && offset){
                options.limit = parseInt(limit, 10);
                options.offset = parseInt(offset, 10);
            }
            const products =  await Product.scope('noIdCategory','noState','orderByPrice').findAll(options);
            return products;
        } catch (error) {
            this._handleError(error, 'Error al obtener productos');
        }
    }

    async findById(id){
        try {
            const product = Product.scope('noIdCategory','noState').findByPk(id,{
                include : [{
                    model: Category,
                    as: 'category',
                    attributes : ['idCategory','name', 'description']
                }]
            });
            if(!product){
                throw boom.notFound(`El producto con id: ${id} no se encontró`);
            }
            return product;
        } catch (error) {
            this._handleError(error, 'Error al buscar el producto');
        }
    }

    async findByCategory(idCategory) {
        try {
            const options = {
                include : [{
                    model: Category,
                    as: 'category',
                    attributes : ['name', 'description']
                }],
                where:{idCategory}
            }
            const products = Product.findAll(options)
            if(!products){
                throw boom.notFound('Esta categoria no tiene productos registrados');       
            }
            return products;
        } catch (error) {
            this._handleError(error,'Error al buscar la categoria');
        }
    }

    async update(id, changes){
        try {
            const product = await Product.findByPk(id);
            if(!product){
                throw boom.notFound(`El producto con id: ${id} no se encontró`);
            }
            const updatedProduct = await product.update(changes);
            return updatedProduct;
        } catch (error) {
            this._handleError(error, 'Error al actualizar el producto');
        }
    }

    async delete(id){
        try {
            const product = await Product.findByPk(id);
            if(!product){
                throw boom.notFound(`El producto con id: ${id} no se encontró`);
            }
            await product.destroy();
            return {
                message : `Producto con el id: ${id} eliminado correctamente`
            }
        } catch (error) {
            this._handleError(error, 'Error al eliminar el producto');
        }
    }

}

module.exports = ProductService;
