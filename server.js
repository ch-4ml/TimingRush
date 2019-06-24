// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const path = require('path');

// Template Engine
app.set('view engine', 'ejs');
// Template File Location
app.set('/', __dirname + '/views');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Router
const router = require('./router/router');
app.use(router);

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Socket.io 서버
const server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', socket => {
    // 연결된 사용자와 채팅방 정보
    var user;
    var room;

    // 채팅방 입장
    socket.on('joinRoom', function (info) {
        user = info.user;
        // 기존 룸에서 나가기
        if ( room ) {
            socket.leave(room);
            room = null;
        }

        // 채팅방 얻어오기
        room = info.room;
        socket.join(room);
        
        console.log('user ', user, 'join room:', room);
        io.to(room).emit('joinRoomResult', {user:user, room:room})
    });

    // 클라이언트가 보낸 메세지 이벤트
    socket.on('message', function(data) {
        console.log('client message :', data);

        const text = data.message;

        console.log('[' + room + ']', user, '>>', text);
        if ( user && text ) {
            io.to(room).emit('messageReceive', {user:user, message:text})
        }
    });
});

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});
