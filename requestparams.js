var request = require('request');
var crypto = require('crypto');
var urllib = require('url');
var http = require('http');
var querystring = require('querystring');
var nock = require('nock');

var topic = 'http://test.com',
  response_body = "This is a response.",
  encrypted_secret = crypto.createHmac("sha1", "topsecret").update(topic).digest("hex");
  hub_encryption = crypto.createHmac('sha1', encrypted_secret).update(response_body).digest('hex');

var callbackUrl = 'http://localhost:4000/pubsub' + 
        (this.callbackUrl.replace(/^https?:\/\//i, "").match(/\//)?"":"/") +
        (this.callbackUrl.match(/\?/)?"&":"?") +
        "topic="+encodeURIComponent(topic)+
        "&hub="+encodeURIComponent(hub);

var options = {
	url: 'http://localhost:8000/test',
	headers: {
		'X-Hub-Signature': 'sha1='+hub_encryption,
		'X-PubSubHubbub-Callback': 'http://localhost:8000/callback',
		'hub.topic': 'http://test.com',
		'link': '<http://test.com>; rel="self", <http://pubsubhubbub.appspot.com/>; rel="hub"',
	},
	body: response_body,
	form: {
        "hub.callback": 'http://test.com',
        "hub.mode": 'subscribe',
        "hub.topic": 'http://feed.com/feed',
        "hub.verify": "sync",
        'format': 'json'
    }
}

// var scope = nock('http://test.com')
// 	.filteringRequestBody(function (path) {
// 		return querystring.parse(path)['hub.callback'];
// 	})
// 	.post('/test', 'http://test.com')
// 	.reply(200, 'Hello world')
// 	.log(console.log);

var req = request.post(options, function (err, res, body) {
	if (err) console.log(err);
	console.log(res.statusCode+' '+body);
});

// console.log(req.headers);
// console.log(req.body.toString());
// console.log(req.url);
// var params = urllib.parse(req.url, true, true);

// console.log(params);
// console.log();

var server = http.createServer(function (req, res) {
	console.log(req.url);

	var params = urllib.parse(req.url, true, true);
	console.log(params);

	var body = '';
	req.on('data', function (chunk) {
		body += chunk.toString();
	});

	req.on('end', function () {
		console.log(querystring.parse(body));
	});

}).listen(8000);