var crypto = require('crypto');

var secret = "mytopsecret",
	topic = "http://test.com/1";

encrypted = crypto.createHmac("sha1", secret).update(topic).digest("hex");
console.log(encrypted);