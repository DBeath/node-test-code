var http = require('http');
var urllib = require('url');
var request = require('request');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
	var params = urllib.parse(req.url, true, true);
	console.log(params);
	console.log(req);
}).listen(8000);

//request.post('http://localhost:8000').form({'hub.topic': 'http://test.com/feed'});

var post_domain = 'localhost';
var post_port = 8000;

var post_data = querystring.stringify({
	'hub.topic': 'http://test.com/feed',
	'hub.mode': 'subscribe'
});

var post_options = {
	host: post_domain,
	port: post_port,
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': post_data.length
	}
};

var post_req = http.request(post_options, function (res) {
	// res.setEncoding('utf8');
	// res.on('data', function (chunk) {
	// 	console.log('Response: ' + chunk);
	// });
});

post_req.write(post_data);
post_req.end();