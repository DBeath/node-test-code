var http = require('http');

var server = http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Hello World\n");
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	console.log('Request from ' + ip);
	console.log('req.connection.remoteAddress: ' + req.connection.remoteAddress);
	console.log('req.socket.remoteAddress: ' + req.socket.remoteAddress);
	console.log('req.connection.socket.remoteAddress: ' + req.connection.socket.remoteAddress);
}).listen(1035, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1035');