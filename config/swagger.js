const swaggerJSDoc = require('swagger-jsdoc');


// Configuración básica para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
            title: 'API Peluqueria', // Nombre de tu API
            version: '1.0.0', // Versión de la API
            description: 'Documentación de mi API usando Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', 
            },
        ],
    },
    apis: ['./../routes/categories.router.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
