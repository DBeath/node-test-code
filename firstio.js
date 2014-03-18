var fs = require('fs');

var filepath = process.argv[2];

file = fs.readFileSync(filepath);

string = file.toString();

console.log(string.split('\n').length - 1);