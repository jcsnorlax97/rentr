const express = require('express');

const app = express();
const morgan = require('morgan');
const routes = require('./api');
const apiErrorHandler = require('./error/api-error-handler');

// --- morgan logging middleware ---
app.use(morgan('dev'));

// --- new express-version bodyParser (for POST request body) ---
app.use(express.json());

// --- routes ---
app.use('/', routes);

// --- api error handler ---
app.use(apiErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
