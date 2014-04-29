var request = require('request');

var form = {
  'hub.mode': 'retrieve',
  'hub.topic': 'http://feeds.feedburner.com/JamesFallows',
  'format': 'json',
  'count': 1
};

auth = {
  'user': 'dbeath',
  'pass': 'feeder@ieget684',
  'sendImmediately': true
}

var postParams = {
  url: 'https://push.superfeedr.com',
  form: form,
  encoding: 'utf-8',
  auth: auth
};

console.log(postParams);
var req = request.get(postParams, function (err, res, body) {
  console.log('Received response');
  console.log(res.statusCode);
  console.log(res.headers);
  console.log(res.body);
});

// body = Buffer.toString(req.body);
// console.log(body);