require('./../models');// soluciono el problema con las relaciones ventas y detalles, carga los modelos e index.js antes de todos los modelos.
const Sale = require('./../models/sales.model');
const SalesDetails = require('./../models/salesDetails.model');
const sequelize = require('./../config/db');
const boom = require('@hapi/boom');
//const e = require('express');


class SalesService {
    constructor(){}

    _handleError(error, message) {
        if (!boom.isBoom(error)) {
            console.error('Error inesperado:', error.message);
            throw boom.internal(message, { originalError: error.message });
        }
        throw error; 
    }

    async find(){
        try {
            const sales = await Sale.findAll({
                include: [{
                    model: SalesDetails,
                    as : 'details'
                }]
            });
            return sales;
        } catch (error) {
            this._handleError(error,'No se encontraron las ventas')
        }
    };

    async createSalesWithDetails (saleData, saleDetailsData){
        const t = await sequelize.transaction();

        try {
            const newSale = await Sale.create(saleData,{transaction:t});

            const detailsPromises = saleDetailsData.map(detail =>{
                return SalesDetails.create({
                    ...detail,
                    idSales : newSale.idSales
                },{transaction:t});
            });
            // Espera a que todos los detalles se inserten
            await Promise.all(detailsPromises);

            await t.commit();

            return newSale;
        } catch (error) {
            await t.rollback();
            this._handleError(error,'Falló el registro')
        }
    };

    async update(id, changes){
        
    };
}

module.exports=SalesService;