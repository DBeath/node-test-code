var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var entry = fs.readFileSync('entry.json');
var myschema = new Schema({
	data: {},
});
var jsonentry = mongoose.model('Entry', myschema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	jsonentry.save();

	jsonentry
});