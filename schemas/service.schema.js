const Joi = require('joi');

const idService = Joi.string().min(3).max(50);
const nameService = Joi.string().min(5).max(50);
const description = Joi.string().min(10).max(255);
const price = Joi.number().precision(2);
const state = Joi.boolean();
const image = Joi.string().max(1000000);

class ServiceSchema {
    static create() {
        return Joi.object({
            name : nameService.required(),
            description : description.optional(),
            price : price.required(),
            state : state.optional(),
            image : image.required(),
        });
    }

    static update() {
        return Joi.object({
            name : nameService.optional(),
            description : description.optional(),
            price : price.optional(),
            state : state.optional(),
            image : image.optional(),
        });
    }

    static get() {
        return Joi.object({
            id : idService.required()
        });
    }
}

module.exports = ServiceSchema;