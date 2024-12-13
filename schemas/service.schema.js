const Joi = require('joi');

const idService = Joi.number().integer();
const nameService = Joi.string().min(5).max(50);
const description = Joi.string().min(10).max(255);
const price = Joi.number().precision(2);
const state = Joi.boolean();


const createServiceSchema = Joi.object({
    name : nameService.required(),
    description : description.optional(),
    price : price.required(),
    state : state.optional()
});

const updatedServiceSchema = Joi.object({
    name : nameService.optional(),
    description : description.optional(),
    price : price.optional(),
    state : state.optional()
});

const getServiceSchema = Joi.object({
    id : idService.required()
});

module.exports = {
    createServiceSchema,
    updatedServiceSchema,
    getServiceSchema
};