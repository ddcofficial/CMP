require('dotenv').config({ path: '../../../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const logger = require('../../../shared/utils/logger');
const errorHandler = require('../../../shared/middleware/errorHandler');
const connectDB = require('./config/database');
const auth = require('./routes/auth');

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CMP Auth Service API',
      version: '1.0.0',
      description: 'API documentation for the Call My Pods Authentication Service',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./src/routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Mount routers
app.use('/api/v1/auth', auth);

app.use(errorHandler);

// Connect to database
connectDB();

app.listen(port, () => {
  logger.info(`🚀 Auth Service listening on port ${port}`);
});