require('./../models');// soluciono el problema con las relaciones ventas y detalles, carga los modelos e index.js antes de todos los modelos.
const Sale = require('./../models/sales.model');
const SalesDetails = require('./../models/salesDetails.model');
const sequelize = require('./../config/db');


class SalesService {
    constructor(){}

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
            throw error;
        }
    }

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
            throw error;
        }
    }
}

module.exports=SalesService;