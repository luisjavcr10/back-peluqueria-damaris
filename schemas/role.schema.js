const Joi = require("joi");

const idRole = Joi.number().integer();
const nameRole = Joi.string().min(5).max(50);
const description = Joi.string().min(10).max(255);

const createRoleSchema = Joi.object({
    name : nameRole.required(),
    description : description.optional()
});

const updateRoleSchema = Joi.object({
    name : nameRole.optional(),
    description : description.optional()
});

const getRoleSchema = Joi.object({
    idRole : idRole.required()
});

module.exports = {
    createRoleSchema,
    updateRoleSchema,
    getRoleSchema
};