var io = require('socket.io');
var socket = io.connect();
socket.on('connect', function () {
	socket.emit('test', 'testing 1 2 3');
});