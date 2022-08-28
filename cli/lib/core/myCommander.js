const myAction = require('../core/action');

const myCommander = function(program) {
	program
	.command('create <project> [others...]')
	.alias('crt')
	.description('创建项目')
	.action(myAction)
}

module.exports = myCommander;