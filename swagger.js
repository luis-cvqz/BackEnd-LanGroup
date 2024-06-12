const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        tittle: 'Backend Node.js API',
        description: 'API de proyecto LANGROUP'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc);