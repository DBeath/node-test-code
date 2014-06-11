var moment = require('moment');

var now = moment().format('X');

//console.log(moment().format('X'));



//console.log(moment(now).format('YYYY MM DD'));

console.log(moment.unix(now).format('YYYY MM DD'));

console.log(moment('28-08-1987', 'YYYY MM DD'));

console.log('--------------------------');
console.log(moment().unix());

console.log(moment().subtract('d', 1).unix());

var unix = moment().unix();
console.log('Unix time is '+ unix);
var day = moment.unix(unix);
console.log('Date is '+day);
