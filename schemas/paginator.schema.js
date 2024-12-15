const Joi = require('joi');

const queryPaginatorSchema = Joi.object({
    limit : Joi.number().integer().optional(),
    offset : Joi.number().integer().optional()
});

class PaginatorSchema {
    static query(){
        return queryPaginatorSchema;
    }
}

module.exports = PaginatorSchema;
