const Joi = require('joi');

class PaginatorSchema {
    static query (){
        return Joi.object({
            limit : Joi.number().integer().optional(),
            offset : Joi.number().integer().optional()
        });
    }
}

module.exports = PaginatorSchema;
