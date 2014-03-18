var req = {
    'headers': {
        'link': '<http://test.com>; rel="self", <http://pubsubhubbub.appspot.com/>; rel="hub" '
    }
}
var topic = "",
    hub = "";

console.log(req);

(req.headers && req.headers.link || "").
      replace(/<([^>]+)>\s*(?:;\s*rel=['"]([^'"]+)['"])?/gi, function(o, url, rel){
        switch((rel || "").toLowerCase()){
            case "self":
                topic = url;
                break;
            case "hub":
                hub = url;
                break;
        }
    });

console.log('topic: '+topic);
console.log('hub: '+hub);