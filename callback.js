var callback = 'http://localhost:4000/';

var topic = 'http://test.com/feed';
var hub = 'http://push.superfeedr.com';

var callbackUrl = callback + 
        (callback.replace(/^https?:\/\//i, "").match(/\//)?"":"/") +
        (callback.match(/\?/)?"&":"?") +
        "topic="+encodeURIComponent(topic)+
        "&hub="+encodeURIComponent(hub);

console.log(callbackUrl);