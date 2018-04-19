const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    // socket.emit from Admin text Welcome to the Chat App
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    })
    // socket.broadcast.emit Admin text New User Joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

      /* socket.broadcast.emit('newMessage', {
           from: message.from,
           text: message.text,
           createdAt: new Date().getTime()
       })*/
    })

    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
    }
)