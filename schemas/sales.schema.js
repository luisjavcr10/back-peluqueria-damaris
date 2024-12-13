const Joi = require('joi');

const idSales = Joi.number().integer();
const idUser = Joi.number().integer();
const total = Joi.number().precision(2);
const date = Joi.date().iso();
const nameCustomer = Joi.string().min(5).max(50);


const salesDetailSchema = Joi.object({
    id: Joi.number().integer().required(),
    idSales: idSales.required(),
    type: Joi.string().valid('servicio', 'producto').required(),
    idProduct: Joi.number().integer().allow(null),
    idService: Joi.number().integer().allow(null),
    quantity: Joi.number().integer().required(),
    unitPrice: Joi.number().precision(2).required(),
    subtotal: Joi.number().precision(2).required()
});

const createSalesSchema = Joi.object({
    idUser: idUser.required(),
    total: total.required(),
    date: date.required(),
    nameCustomer: nameCustomer.required(),
    details: Joi.array().items(salesDetailSchema).required()
});

const getSalesSchema = Joi.object({
    id: idSales.required()
});

module.exports = {
    createSalesSchema,
    getSalesSchema
};

