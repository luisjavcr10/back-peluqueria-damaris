const {Sales, SalesDetails, User} = require('./../models')
const UserService = require('./../services/users.service');
const userService = new UserService();
const EmployeeService = require('./../services/employees.service');
const employeeService = new EmployeeService();
const sequelize = require('./../config/db');
const boom = require('@hapi/boom');


class SalesService {
    constructor(){}

    _handleError(error, message) {
        if (!boom.isBoom(error)) {
            console.error('Error inesperado:', error.message);
            throw boom.internal(message, { originalError: error.message });
        }
        throw error; 
    }

    async find(query){
            try {
                const options = {
                    include: [{
                        model: SalesDetails,
                        as : 'details',
                        attributes : ['type','idProduct','idService','quantity','unitPrice','subtotal']
                    },{
                        model: User,
                        as : 'user',
                        attributes : ['name']  
                    }]
                }
                const {limit, offset} = query;
                if(limit && offset){
                    options.limit = parseInt(limit, 10);
                    options.offset = parseInt(offset, 10);
                }
                const sales = await Sales.findAll(options);
                
                return sales;
            } catch (error) {
                this._handleError(error,'No se encontraron las ventas')
            }
    };

    async findById(id){
        try {
            const sale = await Sales.findByPk(id,{
                include : [{
                    model : SalesDetails,
                    as : 'details'
                }]
            })
            return sale;
        } catch (error) {
            this._handleError(error,'No se encontraró la venta')
        }

    }

    async findByUser(idEmployee){
        try {
            const employee = await employeeService.findById(idEmployee);
            const user = await userService.findById(employee.idUser);
            const idUser = user.idUser;
            const sales = await Sales.findAll({
                where : {idUser}
            });
            return sales;
        } catch (error) {
            this._handleError(error,'No se encontraron ventas para este usuario')
        }
    }

    async createSalesWithDetails (saleData, saleDetailsData){
        const t = await sequelize.transaction();

        try {
            const newSale = await Sales.create(saleData,{transaction:t});

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

}

module.exports=SalesService;