// Import modules
const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));

// Router
const router = require('./router');
app.use(router);

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});