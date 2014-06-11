var qs = require('querystring');

var output = qs.stringify({author:'James Fallows'});

console.log(output);

var value = 'author';
var string = 'James Fallows';
var output2 = qs.stringify({value: string});

console.log(output2);

