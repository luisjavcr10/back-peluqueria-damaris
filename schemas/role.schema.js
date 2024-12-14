const Joi = require("joi");

const idRole = Joi.number().integer();
const nameRole = Joi.string().min(5).max(50);
const description = Joi.string().min(10).max(255);

class RoleSchema {
    static create() {
        return Joi.object({
            name : nameRole.required(),
            description : description.optional()
        });
    }

    static update() {
        return Joi.object({
            name : nameRole.optional(),
            description : description.optional()
        });
    }

    static get() {
        return Joi.object({
            idRole : idRole.required()
        });
    }
}

module.exports = RoleSchema;