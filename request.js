var request = require('request');
var http = require('http');
var bl = require('bl');
var crypto = require('crypto');
var urllib = require('url');

var response_body = "This is a response.";
var secret = 'TopSecret';
var topic = 'http://test.com';
var encrypted_secret = crypto.createHmac("sha1", secret).update(topic).digest("hex");
var hub_encryption = crypto.createHmac('sha1', encrypted_secret).update(response_body).digest('hex');

var url = 'http://localhost:8000';
var headers = {
	'X-Hub-Signature': 'sha1='+hub_encryption,
	'X-PubSubHubbub-Callback': 'http://localhost:8000/callback',
	'link': 'rel=hub"http://localhost/hub";rel=self"http://test.com"',
	'Content-Type': 'application/x-www-form-urlencoded'
}

var form = {
    'hub.callback': 'http://test.com',
    'hub.mode': 'subscribe',
    'hub.topic': 'http://feed.com/feed',
    'hub.verify': 'sync',
    'format': 'json'
}

var options = {
	url: url,
	headers: headers,
	body: response_body,
	form: form
}

var notification = function (){
	return request.post(options);
}

var error = new Error('message');
var server = http.createServer(function (req, res) {
	var params = urllib.parse(req.url, true, true).query;
	console.log(params);
	console.log(req.headers);

	hmac = crypto.createHmac('sha1', crypto.createHmac("sha1", secret).update(topic).digest("hex"));
	console.log(hmac);

	if(req.headers['content-type'] === 'text/plain'){
		console.log('header success');
	}

	req.pipe(bl(function (err, data) {
		if (err) throw err;
		data = data.toString();
		hmac.update(data);
		console.log(data);
		console.log(hmac.digest("hex").toLowerCase());
	}));
});

server.listen(8000, function () {
	console.log(urllib.format(options));
	request.get(options);
});

