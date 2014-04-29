var async = require('async');
var feeds = [];

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
};

scanner = function () {};

scanner.prototype.addfeeds = function () {
  for (var i = 0; i < 20; i++) {
    var feed = 'http://test.com/'+i;
    feeds.push(feed);
  };
};

scanner.prototype.fetch = function (feed, callback) {
  console.log('fetched %s', feed);
  setTimeout(function () {
    callback();
  }, randomIntInc(1,20));
};

scanner.prototype.scan = function (cb) {
  var q = async.queue((function (feed, callback) {
    this.fetch(feed, function () {
      callback();
    });
  }).bind(this), 20);

  q.drain = function () {
    console.log('all items have been processed');
    cb();
  };

  // feeds.forEach(function (item, index, array) {
  //   q.push(item, function (err) {
  //     console.log('finished processing %s', item);
  //   });
  // });

  q.push(feeds, function (err) {
    if (err) return console.log(err);
    return console.log('finished processing');
  });
};

var sc = new scanner;

sc.addfeeds();

console.log('starting');
sc.scan(function () {
  console.log('finished');
  process.exit();
});