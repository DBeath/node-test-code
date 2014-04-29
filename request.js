var request = require('request');
var http = require('http');
var bl = require('bl');
var crypto = require('crypto');
var urllib = require('url');
var moment = require('moment');

var thisNow = moment().unix();
var topic = 'http://test.com';
var topicTitle = 'Test Feed';
var itemTitle = 'This is a test';
var itemStatus = 'Test';
var item2Title = 'This is the second item';
var response_body = JSON.stringify(
  {
    "title": topicTitle,
    "status": {
      "lastFetch": thisNow,
      "http": 200
    },
    "items": [
    {
      "title": itemTitle,
      "published": thisNow,
      "status": itemStatus
    },
    {
      "title": item2Title,
      "status": itemStatus
    }
    ]
  }
);

var jsonbody = JSON.parse(response_body);

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
// var server = http.createServer(function (req, res) {
// 	console.log(req);
// 	var params = urllib.parse(req.url, true, true).query;
// 	console.log(params);
// 	console.log(req.headers);

// 	hmac = crypto.createHmac('sha1', crypto.createHmac("sha1", secret).update(topic).digest("hex"));
// 	console.log(hmac);

// 	if(req.headers['content-type'] === 'text/plain'){
// 		console.log('header success');
// 	};

// 	try {
// 		hmac.update(body);
// 	} catch (err) {
// 		console.log('Could not update hmac');
// 		console.log(err);
// 	};

// 	// req.pipe(bl(function (err, data) {
// 	// 	if (err) throw err;
// 	// 	data = data.toString();
// 	// 	hmac.update(data);
// 	// 	console.log(data);
// 	// 	console.log(hmac.digest("hex").toLowerCase());
// 	// }));
// });

// server.listen(8000, function () {
// 	console.log(urllib.format(options));
// 	request.post(options);
// });

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(response_body);
}).listen(3000);

request.post('http://localhost:3000', function (err, res, body) {
  var hmac = crypto.createHmac('sha1', crypto.createHmac("sha1", secret).update(topic).digest("hex"));

  console.log(body);
  try {
    hmac.update(body);
  } catch(err) {
    console.log(err);
  };

  if (hmac.digest('hex').toLowerCase() != hub_encryption) {
    console.log('not correct signature');
  } else {
    console.log('correct signature');
  }

  process.exit();
})

