var string = 'application/json; charset=UTF-8';
var invalid = 'application/html; charset=UTF-8';

var re = new RegExp('application/json');
if (re.test(invalid)) {
	console.log('contains');
} else {
	console.log('does not contain');
}