var fs = require('fs');
var moment = require('moment');

var json = JSON.parse(fs.readFileSync('./superfeedr_json.json'));

//console.log(json);

for (var i = 0; i < json.items.length; i++){
	console.log(json.items[i].title);
	console.log(json.items[i].content);
	console.log('---------------------------------');
}

console.log(json.status);
console.log(json.title);
console.log(json.subtitle);

var day = moment.unix(json.updated).format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log(day);