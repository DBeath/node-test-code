var fs = require('fs');

var directory = process.argv[2];
var ext = process.argv[3];
var path = RegExp('\\.' + ext + '$');

file = fs.readdir(directory, function(err, files){
	for (i = 0; i < files.length; i++){
		if (path.test(files[i])){
			console.log(files[i]);
		}
	}
});