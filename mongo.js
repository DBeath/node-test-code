var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');

var entry = fs.readFileSync('test.json');

MongoClient.connect('mongodb://localhost/test', function (err, db) {
	if(err) throw err;

	var collection = db.collection('test_insert');
	collection.insert(entry, function(err, docs) {
		collection.count(function(err, count){
			console.log(format('count = %s', count));
		});

		collection.find().toArray(function(err, results){
			console.dir(results);

			db.close();
		});
	});
});