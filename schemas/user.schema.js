const Joi = require("joi");

const idUser = Joi.number().integer();
const name = Joi.string().min(10).max(100);
const email = Joi.string().min(10).max(100);
const passwordHash = Joi.string().min(10).max(100);
const idRole = Joi.number().integer();
const active = Joi.boolean();


const createUserSchema = Joi.object({
    name : name.required(),
    email : email.required(),
    passwordHash : passwordHash.required(),
    idRole : idRole.required(),
    active : active.optional()
});

const updateUserSchema = Joi.object({
    name : name.optional(),
    email : email.optional(),
    passwordHash : passwordHash.optional(),
    idRole : idRole.optional(),
    active : active.optional()
});

const getUserSchema = Joi.object({
    id : idUser.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}
