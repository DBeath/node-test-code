var nock = require('nock');
var http = require('http');
var request = require('request');

var scope = nock('http://test.com').post('/test').reply(200, 'Hello World');

// http.get('http://test.com/test', function (res) {
// 	body = '';
// 	res.on('data', function (data) {
// 		body += data.toString();
// 	});
// 	res.on('end', function () {
// 		console.log(res.statusCode);
// 		console.log(body);
// 	});
// });

var req = request.post('http://test.com/test', function (err, res, body) {
	console.log(res.statusCode);
	console.log(body);
});