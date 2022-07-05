const fs = require('fs');

fs.writeFileSync('./a.txt', '66666', function(err, data) {
	console.log('err :>> ', err);
	console.log('data :>> ', data);
})