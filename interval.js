var i = 0;

var interval = setInterval(function () {
  i += 1;
  console.log('Times run: %s', i);
  if (i >= 20) {
    clearInterval(interval);
    console.log('Finished');
  };
}, 200);