// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Template Engine
app.set('view engine', 'ejs');
// Template File Location
app.set('/', __dirname + '/views');

// Middleware
app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Router
const router = require('./router/router');
app.use(router);

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Socket
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = req.session.nickname;              //3-1
  io.to(socket.id).emit('change name', name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name, text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});
