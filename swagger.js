import swaggerAutogen from 'swagger-autogen'

const outputFile = "./swagger.json"
const endpointFiles = ['./src/main.js']
const doc = {
    info: {
        title: "API de Aplicacion de Futbol",
        descripcion: "Documentación de las rutas del backend"
    },
    host: 'localhost:5001',
    schemes: ['http'],
    tags: [
        { name: "Autenticación" },
        { name: "Jugadores" },
        { name: "Evaluaciones" },
        { name: "Tipo de Evaluaciones" }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Introduce el token en este formato: Bearer <tu-token>'
        }
    },
}

swaggerAutogen()(outputFile, endpointFiles, doc)

