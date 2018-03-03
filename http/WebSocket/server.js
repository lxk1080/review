const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3000, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('lisrening... port 3000')
})

io.on('connection', function(socket) {
    socket.on('send', function (data) {
        console.log(data.text);
    });

    socket.emit('reply', { text: 'en, i am server' });

    setTimeout(function () {
        socket.emit('reply', { text: 'what is your name' });
    }, 2000)

    setTimeout(function () {
        socket.emit('reply', { text: 'what do you want ?' });
    }, 5000)

    setTimeout(function () {
        socket.emit('reply', { text: 'answer me !' });
    }, 8000)

    setTimeout(function () {
        socket.emit('reply', { text: 'Okay, bye bye !' });
    }, 10000)
})