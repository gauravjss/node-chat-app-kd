const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    // socket.emit from Admin text Welcome to the Chat App
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'))
    // socket.broadcast.emit Admin text New User Joined
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'))

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
    })

    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
    }
)