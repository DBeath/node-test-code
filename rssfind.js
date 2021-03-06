var request = require('request');
var cheerio = require('cheerio');

var url = 'http://stratechery.com/';

var re = new RegExp(/([cC]omment)/);

request.get(url, function (err, response, body) {
  var $ = cheerio.load(body);

  console.log($('title').text());
  console.log();

  $('link').each(function (i, elem) {

    if ($(this).attr('type') == 'application/rss+xml') {
      var title = $(elem).attr('title');
      if (re.test(title)) {
        console.log('Comments title: ' + $(this).attr('title'));
      }
      if (re.test($(this).attr('href'))) {
        console.log('Comments href: ' + $(this).attr('href'));
      }
      console.log('Found RSS ' + $(this).attr('href'));
      //console.log($(this).attr('title'));
    };
  });
});