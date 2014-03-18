var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
	io.sockets.emit('this');
	socket.on('test', function (data) {
		console.log(data);
	});
});