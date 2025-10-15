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

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('✅ MongoDB connected');
  app.listen(port, () => {
    logger.info(`🚀 Auth Service listening on port ${port}`);
  });
}).catch(err => {
  logger.error('❌ MongoDB connection error', err);
  process.exit(1);
});