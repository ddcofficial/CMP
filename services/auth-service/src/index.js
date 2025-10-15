require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3001;

app.use(express.json());

// Basic route
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

const errorHandler = require('../../../shared/middleware/errorHandler');
const logger = require('../../../shared/utils/logger');

app.use(errorHandler);

const connectDB = require('./config/database');
const auth = require('./routes/auth');

// Connect to database
connectDB();

// Mount routers
app.use('/api/v1/auth', auth);

app.listen(port, () => {
  logger.info(`🚀 Auth Service listening on port ${port}`);
});