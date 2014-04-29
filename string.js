var string ="this\nis\na\ntest,testing2,\ntesting3";
var split = string.split(/[\s,]+/);

console.log(string);
console.log();
for(var i = 0; i < split.length; i++) {
	console.log(split[i]);
};

console.log();
for (var i in split) {
	console.log(split[i]);
}