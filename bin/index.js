#!/usr/bin/env node
const program = require('commander');
const CmdInit = require('../packages/commands/initialize.js');
const CmdNew = require('../packages/commands/new.cmd.js');

const path = require('path')

var projectName = null

program
  .version('1.0.0')
  .option('-y', 'directly create your project')

program
   .command("init [dir]")
   .description('initialize your project')
   .action(function(dir, cmd) {
     CmdInit.exec(dir, function (pname) {
       console.log(pname,"project created success !!!")
       projectName = pname
     })
   });

program
   .version('1.0.0','-v, --version')
   .command('new <name> [url]')
   .description('create a define js to this app')
   .action(function (name, url, cmd) {
      var xpath = url || `./app/${name}.js`
      var filePath = path.resolve('src',xpath)
   		CmdNew.exec(name, filePath, xpath)
   })

program.parse(process.argv);

