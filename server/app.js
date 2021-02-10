const express = require("express");
const app = express();
const routes = require('./api');
const morgan = require('morgan');

// --- morgan logging middleware ---
app.use(morgan("dev"));

// --- routes --- 
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})