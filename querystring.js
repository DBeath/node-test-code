var querystring = require('querystring');
var crypto = require('crypto');
var urllib = require('url');
var request = require('request');

var express = require('express');

var response_body = "This is a response.";
var secret = 'TopSecret';
var topic = 'http://test.com';
var encrypted_secret = crypto.createHmac("sha1", secret).update(topic).digest("hex");
var hub_encryption = crypto.createHmac('sha1', encrypted_secret).update(response_body).digest('hex');

var url = 'http://localhost:4000/';
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

var qs = querystring.stringify(form);

console.log(qs);

var fullurl = url+'?'+qs;
console.log(fullurl);
var params = urllib.parse(fullurl, true, true);

console.log(params);

var app = express();

app.all('/', function (req, res) {
	console.log('----------------------------------');
	console.log(req.headers);
  console.log(req.query);
  console.log(req.param('hub.topic'));
});

app.listen(4000);

request.post(options);