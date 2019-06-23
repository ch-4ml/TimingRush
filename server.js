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

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});