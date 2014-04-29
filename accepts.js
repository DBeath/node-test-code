var accepts = require('accepts');
var http = require('http');

http.createServer(function (req, res) {
	var accept = accepts(req);
	console.log(accept.types());
}).listen(4000);

