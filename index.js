const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    //socket.broadcast.emit('Hi there');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        //console.log('message: ' + msg);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});