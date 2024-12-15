const Joi = require('joi');

// Esquema para validar "saleData"
const saleDataSchema = Joi.object({
    idUser: Joi.number().integer().required(),
    total: Joi.number().precision(2).positive().required(),
    nameCustomer: Joi.string().min(3).max(100).required(),
});

// Esquema para validar un solo elemento en "saleDetailsData"
const saleDetailsItemSchema = Joi.object({
    id : Joi.number().integer(),
    type: Joi.string().valid('producto', 'servicio').required(),
    idProduct: Joi.number().integer().allow(null).when('type', {
        is: 'producto',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    idService: Joi.number().integer().allow(null).when('type', {
        is: 'servicio',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    quantity: Joi.number().integer().positive().required(),
    unitPrice: Joi.number().precision(2).positive().required(),
    subtotal: Joi.number().precision(2).positive().required(),
});

// Esquema para validar el JSON completo
const saleSchema = Joi.object({
    saleData: saleDataSchema.required(),
    saleDetailsData: Joi.array()
        .items(saleDetailsItemSchema)
        .min(1)
        .required(),
});

// Esquema para obtener una venta por su ID
const getSalesSchema = Joi.object({
    id: Joi.number().integer().required(),
});

class SalesSchema {
    static getSaleDataSchema() {
        return saleDataSchema;
    }

    static getSaleDetailsItemSchema() {
        return saleDetailsItemSchema;
    }

    static getSaleSchema() {
        return saleSchema;
    }

    static getGetSalesSchema() {
        return getSalesSchema;
    }
}

// Exportar la clase en lugar de los esquemas directamente
module.exports = SalesSchema;
