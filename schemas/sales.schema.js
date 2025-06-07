const Joi = require('joi');

// Esquema para validar "saleData"
const saleDataSchema = Joi.object({
    idSales: Joi.string().min(6).max(50).required(),
    idUser: Joi.number().integer().required(),
    ruc : Joi.string().min(10).max(12),
    totalGravado : Joi.number().precision(2).positive().required(),
    igv : Joi.number().precision(2).positive().required(),
    total: Joi.number().precision(2).positive().required(),
    methodPayment : Joi.string().min(3).max(10),
    idCustomer: Joi.string().min(7).max(12),
    nameCustomer: Joi.string().min(3).max(100).required(),
});

// Esquema para validar un solo elemento en "saleDetailsData"
const saleDetailsItemSchema = Joi.object({
    type: Joi.string().valid('PRODUCTO', 'SERVICIO').required(),
    idProduct: Joi.number().allow(null).when('type', {
        is: 'PRODUCTO',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    idService: Joi.number().allow(null).when('type', {
        is: 'SERVICIO',
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
