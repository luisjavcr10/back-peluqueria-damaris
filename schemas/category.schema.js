const Joi = require('joi');

class CategorySchema {
    static create() {
        return Joi.object({
            name: Joi.string().min(3).max(30).required(),
            description: Joi.string().min(15).max(100).required(),
        });
    }

    static update() {
        return Joi.object({
            name: Joi.string().min(3).max(30).optional(),
            description: Joi.string().min(15).max(100).optional(),
        });
    }

    static get() {
        return Joi.object({
            id: Joi.number().integer().required(),
        });
    }
}

module.exports = CategorySchema;