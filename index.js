const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('Available rooms: ' + socket.rooms.size);

    socket.on('disconnecting', () => {
        console.log('Disconnecting');
        console.log(socket.rooms); // the Set contains at least the socket ID
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        console.log('Available rooms: ' + socket.rooms.size);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});