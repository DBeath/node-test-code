<<<<<<< HEAD

var data = 'this is a test';
var test = function (data) {
	function layer2(d2) {
		console.log(data);
	};
};

test(data);
=======
var callback = 'http://localhost:4000/';

var topic = 'http://test.com/feed';
var hub = 'http://push.superfeedr.com';

var callbackUrl = callback + 
        (callback.replace(/^https?:\/\//i, "").match(/\//)?"":"/") +
        (callback.match(/\?/)?"&":"?") +
        "topic="+encodeURIComponent(topic)+
        "&hub="+encodeURIComponent(hub);

console.log(callbackUrl);
>>>>>>> 73a7bf54234219f28252f67ffeb8fde90c1c550d
