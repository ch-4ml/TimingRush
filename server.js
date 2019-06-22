// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Router
const router = require('./router/router');
app.use(router);

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});