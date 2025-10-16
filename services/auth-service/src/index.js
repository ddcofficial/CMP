require('dotenv').config({ path: '../../../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../../../shared/utils/logger');
const errorHandler = require('../../../shared/middleware/errorHandler');
const connectDB = require('./config/database');
const auth = require('./routes/auth');

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/auth', auth);

app.use(errorHandler);

// Connect to database
connectDB();

app.listen(port, () => {
  logger.info(`🚀 Auth Service listening on port ${port}`);
});