#! /usr/bin/env node
const { program } = require('commander');

program.option('-f --frameworks <framework>', '设置框架');
program.parse(process.argv);
