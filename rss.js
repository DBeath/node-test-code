var RSS = require('rss');
var moment = require('moment');
var fs = require('fs');

var feed = new RSS({
  title: 'Test title',
  description: 'Test description',
  feed_url: 'http://localhost:4000/rss.xml',
  pubDate: moment()
});

feed.item({
  title: 'Test item',
  description: 'This is a test of the RSS feed module',
  url: 'http://localhost:4000/testitem',
  author: 'Testy McAuthorson',
  date: 'May 31, 2014'
});

var xml = feed.xml();
console.log(xml);

fs.writeFile('rss.xml', xml, function (err) {
  if (err) throw err;
  console.log('Finished writing');
});
