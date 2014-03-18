var feedparser = require('feedparser');
var fs = require('fs');

var entry = './entry.xml';

fs.createReadStream(entry)
    	.pipe(new feedparser())
    	.on('error', function (error) {
    		console.error(error);
    	})
    	.on('readable', function() {
    		var stream = this, item;
    		while (item = stream.read()) {
    			console.log(item.title);
    		}
    	});