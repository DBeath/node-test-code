var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/mongoose_test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var feed1 = new Feed({
    topic: 'http://test.com',
    status: 'subscribed'
  });

  feed1.save(function (err, feed) {
    if (err) return console.log(err);
    console.log(feed);
  });

  var feed2 = new Feed({
    topic: 'http://test2.com',
    status: 'testing'
  });

  feed2.save(function (err, feed) {
    if (err) return console.log(err);
    console.log(feed);
  })
});

var feedSchema = new Schema({
  topic: {type: String, unique: true, required: true},
  added: {type: Date, default: Date.now },
  status: String
});

var Feed = mongoose.model('Feed', feedSchema);

Feed.schema.path('status').validate(function (value) {
  return /subscribed|unsubscribed|pending/i.test(value);
}, 'Invalid Status');

Feed.schema.path('topic').index({unique: true});

Feed.schema.plugin(uniqueValidator);