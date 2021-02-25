const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const apiErrorHandler = require('./error/api-error-handler');

const { setup } = require('./di-setup');

// --- setup dependency injection container ---
// IMPORTANT: THIS MUST BE CALLED BEFORE ROUTEER!!!
setup();
const routes = require('./api');

// ===============
// --- app.use ---
// ===============

// --- morgan logging middleware ---
app.use(morgan('dev'));

// --- cors ---
app.use(cors());

// --- new express-version bodyParser (for POST request body) ---
app.use(express.json());

// --- routes ---
app.use('/', routes);

// --- api error handler ---
app.use(apiErrorHandler);

// =============================
// --- app.listen(port, ...) ---
// =============================

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
