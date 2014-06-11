var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');

var id = "testing123.stuff";
var item = JSON.stringify({
	"title": "testing",
	"id": id,
	"status": "testing"
});

var i = JSON.parse(item);

MongoClient.connect('mongodb://localhost/test', function (err, db) {
	if(err) throw err;

	var collection = db.collection('test');
	// collection.insert(entry, function(err, docs) {
	// 	collection.count(function(err, count){
	// 		console.log(format('count = %s', count));
	// 	});

	// 	collection.find().toArray(function(err, results){
	// 		console.dir(results);

	// 		db.close();
	// 	});
	// });

	// collection.update({id: 'stuff'}, i, {upsert:true},function (err, result){
	// 	if (err) return console.log(err);
	// 	console.log(result);
	// 	collection.findOne({id: id}, function (err, item) {
	// 		if (err) return console.log(err);
	// 		console.log(item);
	// 		db.close();
	// 	});
	// });

	collection.findOne({'status':'testing'}, function (err, result) {
		if (err) console.log('Received error: ' + err);
		console.log(result);
	});
});