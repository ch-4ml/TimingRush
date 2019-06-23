// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Template Engine
app.set('view engine', 'ejs');
// Template File Location
app.set('/', __dirname + '/public');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

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