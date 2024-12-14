const Joi = require("joi");

const idEmployee = Joi.number().integer();
const idUser = Joi.number().integer();
const nameEmployee = Joi.string().min(10).max(100);
const phone =Joi.string().min(9).max(15);
const address = Joi.string().min(10).max(255);

class EmployeeSchema {
    static create() {
        return Joi.object({
            idUser : idUser.required(),
            name : nameEmployee.required(),
            phone : phone.optional(),
            address : address.optional()
        });
    }

    static update() {
        return Joi.object({
            idUser : idUser.optional(),
            name : nameEmployee.optional(),
            phone : phone.optional(),
            address : address.optional()
        });
    }

    static get() {
        return Joi.object({
            idEmployee : idEmployee.required()
        });
    }
}


module.exports = EmployeeSchema;
