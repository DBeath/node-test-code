var request = require('request');
var cheerio = require('cheerio');

var url = 'https://davidbeath.com';

request.get(url, function (err, response, body) {
  var $ = cheerio.load(body);

  console.log($('title').text());
  console.log($('link').attr('type'));
  $('link').each(function (i, elem) {
    if ($(this).attr('type') == 'application/rss+xml') {
      console.log('Found RSS ' + $(this).attr('href'));
    };
    console.log($(this).attr('href'));
  });
});