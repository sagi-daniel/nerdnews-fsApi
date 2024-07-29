const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nerdnews - API Dokumentáció',
      version: '1.0.0',
      description: 'Egy egyszerű Express API dokumentációja a Swagger segítségével',
      contact: {
        name: 'Nerdnews',
        url: 'https://nerdnews.hu',
        email: 'hello@nerdnews.hu',
      },
    },
  },
  apis: ['./api/src/controllers/**/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
