const express = require('express');
const router = express.Router();
const SalesService = require('../services/sales.service');
const service = new SalesService();

router.get('/', async(req,res)=>{
    try {
        const sales = await service.find();
        res.status(200).json({
            message: 'Ventas obtenidas exitosamente',
            sales
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener las ventas',
            error: error.message
        });
    }
    
})

router.post('/', async(req,res)=>{
    try {
        const {saleData, saleDetailsData} = req.body;
        const newSale = await service.createSalesWithDetails(saleData,saleDetailsData);
        res.status(201).json({
            message: 'Venta registrada exitosamente',
            sale: newSale
        })
    } catch (error) {
        const httpError = new Error('Error al registrar la venta');
        httpError.status = 400;
        next(httpError);
    }
});

module.exports = router;