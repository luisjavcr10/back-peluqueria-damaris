const express = require('express');
const router = express.Router();

const SalesService = require('../services/sales.service');
const service = new SalesService();

router.post('/', async(req,res)=>{
    const {saleData, saleDetailsData} = req.body;
    
    try {
        const newSale = await service.createSalesWithDetails(saleData,saleDetailsData);
        res.status(201).json({
            message: 'Venta creada exitosamente',
            sale: newSale
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear la venta',
            error: error.message
        });
    }
});

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

module.exports = router;