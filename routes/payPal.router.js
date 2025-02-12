const express = require('express');
const router = express.Router();
const cors = require("cors");
const config = require('../config/config')
require("dotenv").config();

const PAYPAL_API = config.paypalApi;
const PAYPAL_CLIENT_ID = config.paypalClientId;
const PAYPAL_SECRET = config.paypalSecret;

// Función para obtener el token de PayPal
async function getPayPalAccessToken() {
    try {
        const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
        });

        if (!response.ok) {
            const errorData = await response.text(); // Captura la respuesta de error
            throw new Error(`PayPal API Error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error obteniendo el token de acceso de PayPal:", error.message);
        return null;
    }
}

router.post("/create-order", async (req, res) => {
    const body = req.body;
    try {      
        const accessToken = await getPayPalAccessToken();

        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        res.json({ id: data.id }); // Devuelve el orderID al frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Capturar el pago cuando el usuario aprueba
router.post("/capture-order", async (req, res) => {
    try {
        const { orderID } = req.body;
        const accessToken = await getPayPalAccessToken();

        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        res.json(data); // Devuelve la respuesta de PayPal
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
