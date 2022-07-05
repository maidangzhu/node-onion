const fs = require('fs');
fs.readFile('./a.txt', 'utf8', function(err, data) {
	console.log(err);
	console.log(data);
});
