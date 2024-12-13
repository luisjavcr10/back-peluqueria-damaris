const Joi = require('joi');

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const queryPaginatorSchema = Joi.object({
    limit : limit.optional(),
    offset : offset.optional()
})

module.exports = queryPaginatorSchema;
