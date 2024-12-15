const Joi = require("joi");

const idEmployee = Joi.number().integer();
const nameEmployee = Joi.string().min(10).max(100);
const phone =Joi.string().min(9).max(15);
const address = Joi.string().min(10).max(255);
const email = Joi.string().min(10).max(100);
const passwordHash = Joi.string().min(10).max(100);
const idRole = Joi.number().integer();

const createEmployeeSchema = Joi.object({
    name : nameEmployee.required(),
    phone : phone.required(),
    address : address.required(),
    email : email.required(),
    passwordHash : passwordHash.required(),
    idRole : idRole.required()
}); 

const updateEmployeeSchema = Joi.object({
    name : nameEmployee.optional(),
    phone : phone.optional(),
    address : address.optional()
});

const getEmployeeSchema = Joi.object({
    id : idEmployee.required()
})

class EmployeeSchema {
    static create() {
        return createEmployeeSchema;
    }

    static update() {
        return updateEmployeeSchema;
    }

    static get() {
        return getEmployeeSchema;
    }
}

module.exports = EmployeeSchema;
 