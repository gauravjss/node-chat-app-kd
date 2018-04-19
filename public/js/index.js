var socket = io();
socket.on('connect', function() {
    console.log('Connected to Server');

    /*socket.emit('createMessage', {
        from: 'sammy',
        text: 'Reply from Samy to KD'
    })*/
})

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
})

socket.on('newMessage', function (message) {
    console.log('New Message', message);
})

