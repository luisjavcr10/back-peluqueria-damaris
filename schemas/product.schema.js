const Joi = require("joi");

const idProduct = Joi.string().min(3).max(50);
const nameProduct = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(10).max(255);
const idCategory = Joi.number().integer();
const price = Joi.number().precision(2);
const stock = Joi.number().integer();
const arrivalDate = Joi.date().iso();
const expirationDate = Joi.date().iso();
const state = Joi.boolean();
const image = Joi.string().max(1000000);


class ProductSchema {
    static create() {
        return Joi.object({
            name : nameProduct.required(),
            description : descripcion.optional(),
            image : image.required(),
            idCategory : idCategory.required(),
            price : price.required(),
            stock : stock.optional(),
            arrivalDate : arrivalDate.required(),
            expirationDate : expirationDate.required(),
            state : state.optional()
        });
    }

    static update() {
        return Joi.object({
            name : nameProduct.optional(),
            description : descripcion.optional(),
            image : image.optional(),
            idCategory : idCategory.optional(),
            price : price.optional(),
            stock : stock.optional(),
            arrivalDate : arrivalDate.optional(),
            expirationDate : expirationDate.optional(),
            state : state.optional()
        });
    }

    static get() {
        return Joi.object({
            id : idProduct.required()
        });
    }
}

module.exports = ProductSchema;