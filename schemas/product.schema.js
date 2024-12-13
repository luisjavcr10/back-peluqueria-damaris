const Joi = require("joi");

const idProduct = Joi.number().integer();
const nameProduct = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(10).max(255);
const idCategory = Joi.number().integer();
const price = Joi.number().precision(2);
const stock = Joi.number().integer();
const arrivalDate = Joi.date().iso();
const expirationDate = Joi.date().iso();
const state = Joi.boolean();


const createdProductSchema = Joi.object({
    name : nameProduct.required(),
    descripcion : descripcion.optional(),
    idCategory : idCategory.required(),
    price : price.required(),
    stock : stock.optional(),
    arrivalDate : arrivalDate.required(),
    expirationDate : expirationDate.required(),
    state : state.optional()
});

const updatedProductSchema = Joi.object({
    name : nameProduct.optional(),
    descripcion : descripcion.optional(),
    idCategory : idCategory.optional(),
    price : price.optional(),
    stock : stock.optional(),
    arrivalDate : arrivalDate.optional(),
    expirationDate : expirationDate.optional(),
    state : state.optional()
});

const getProductSchema = Joi.object({
    id : idProduct.required()
});

module.exports = {
    createdProductSchema,
    updatedProductSchema,
    getProductSchema
}