var topic = 'http://test.com';
var topic2 = 'http://testing2.com/feed';
var topic3 = 'http://testing3.com';

var pending = {};

pending[topic] = true;
pending[topic2] = false;

console.log(pending);

if (pending[topic]) {
	console.log(pending[topic]);
}

if (pending[topic2]) {
	console.log(pending.topic2);
}

console.log();
console.log('finished object');
console.log();

var pending2 = [];

pending2.push(topic);
pending2.push(topic2);

console.log(pending2);

var index = pending2.indexOf(topic3);
console.log(index);
if (index > -1) {
	console.log('true');
	console.log(pending2[index]);
} else {
	console.log('false');
}