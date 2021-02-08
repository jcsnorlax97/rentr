require("dotenv").config();
const express = require("express");
const app = express();
const routes = require('./api');

// --- routes --- 
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})