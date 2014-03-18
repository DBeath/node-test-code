var Feed = require('./db.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
	console.log('connected');
	new Feed({title: 'test', author: 'David Beath', body: 'This is a test'}).save(function (err, feed) {
		if (err) return console.error(err);
		console.log(feed);
	});
});