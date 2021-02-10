const express = require('express');

const app = express();
const morgan = require('morgan');
const routes = require('./api');

// --- morgan logging middleware ---
app.use(morgan('dev'));

// --- routes ---
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
