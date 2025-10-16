const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

// --- Routes ---
const mainRoutes = require('./routes');
app.use('/api', mainRoutes);


app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});