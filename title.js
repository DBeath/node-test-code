var topic = 'http://test.com';
var title = '';
var doc = {
	'status': 'test'
};

var text = doc.title || topic;

console.log(text);