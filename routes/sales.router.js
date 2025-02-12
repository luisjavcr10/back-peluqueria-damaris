const express = require('express');
const router = express.Router();
const passport = require('passport');

const SalesService = require('../services/sales.service');
const service = new SalesService();
const {ValidatorHandler} = require('../middlewares');
const {checkRoles} = require('./../middlewares/auth.handler');
const {SalesSchema, PaginatorSchema} = require('../schemas');
 
router.get('/', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(PaginatorSchema.query(),'query'),
    async(req,res, next)=>{
    try {
        const sales = await service.find(req.query);
        res.status(200).json({
            message: 'Ventas obtenidas exitosamente',
            sales
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id',
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    ValidatorHandler.handle(SalesSchema.getGetSalesSchema(),'params'),
    async (req, res, next) =>{
    try {
        const {id} = req.params;
        const sale = await service.findById(id);
        res.status(200).json({
            message : 'Venta obtenida exitosamente',
            sale
        })
    } catch (error) {
        next(error);
    }
});

router.get('/employee/:id', 
    passport.authenticate('jwt', {session : false}), 
    checkRoles('ADMINISTRADOR','Empleado'),
    async(req,res,next)=>{
    try {
        const {id} = req.params;
        const sales = await service.findByUser(id);
        return res.json(sales)
    } catch (error) {
        next(error);
    }
});

router.post('/', 
    passport.authenticate('jwt', {session : false}), 
    ValidatorHandler.handle(SalesSchema.getSaleSchema(), 'body'),
    async(req,res,next)=>{
    try {
        const {saleData,saleDetailsData} = req.body;
        const newSale = await service.createSalesWithDetails(saleData,saleDetailsData);
        res.status(201).json({
            message: 'Venta registrada exitosamente',
            sale: newSale
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;