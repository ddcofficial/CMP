require('dotenv').config({ path: '../../../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../../../shared/utils/logger');
const errorHandler = require('../../../shared/middleware/errorHandler');
const connectDB = require('./config/database');
const pods = require('./routes/pods');

const app = express();
const port = process.env.POD_SERVICE_PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/pods', pods);

app.use(errorHandler);

// Connect to database
connectDB();

app.listen(port, () => {
  logger.info(`🚀 Pod Service listening on port ${port}`);
});