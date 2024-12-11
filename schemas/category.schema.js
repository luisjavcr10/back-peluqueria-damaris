const Joi = require('joi');

idCategory = Joi.number().integer();
nameCategory = Joi.string().min(3).max(30);
description = Joi.string().min(15).max(100);

const createCategorySchema = Joi.object({
    name : nameCategory.required(),
    description : description.required()
});

const updatedCategorySchema = Joi.object({
    name : nameCategory.optional(),
    description : description.optional()
});

const getCategorySchema = Joi.object({
    id: idCategory.required()
});

module.exports = {
    createCategorySchema,
    updatedCategorySchema,
    getCategorySchema
}