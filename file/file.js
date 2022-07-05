/*
 * @Author: 麦当 borisdunk@sina.com
 * @Date: 2022-06-28 20:50:48
 * @LastEditors: 麦当 borisdunk@sina.com
 * @LastEditTime: 2022-06-28 21:01:44
 * @FilePath: /node-learning/file.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
const fs = require('fs');

fs.readFile('./a.txt', 'utf8', function(err, data) {
	if (!err) {
		const newData = data + '888888';
		fs.writeFile('./a.txt', newData, function(err) {
			if (!err) {
				console.log('追加成功');
			}
		})
	}
});
