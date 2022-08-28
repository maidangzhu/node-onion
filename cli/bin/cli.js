#! /usr/bin/env node
const { program } = require('commander');
const myHelp = require('../lib/core/help');
const myCommander = require('../lib/core/myCommander');

myHelp(program);
myCommander(program);

program.parse(process.argv);
