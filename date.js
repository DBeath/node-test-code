var moment = require('moment');

var unix = moment().unix();
console.log(unix);

var date = new Date(moment.unix(1402089189));
console.log(date);
console.log(date.toGMTString());
