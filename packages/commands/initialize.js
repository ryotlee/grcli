const chalk = require('chalk');
const log = console.log
const inquirer = require('inquirer');
const shell = require('shelljs');
const os = require('os');
const fs = require('fs');
const path = require('path');
const CLUI = require('clui');
const Spinner = CLUI.Spinner;

var questions = [{
 	type: 'input',
 	message: '项目名称',
 	default: 'grunt-requirejs-project',
 	name: 'name'
   },{
 	type: 'input',
 	message: '项目描述',
 	default: '一个requirejs的项目',
 	name: 'description'
   },{
 	type: 'input',
 	message: '开发者',
 	default: os.userInfo().username,
 	name: 'author'
   }
]

// 项目初始化
function init(pname, cb) {
  if (pname) {
     createProject({
        name: pname,
        description: '一个requirejs的项目',
        author: os.userInfo().username
     }, cb)
  } else {
    inquirer.prompt(questions)
    .then(answers => {
       createProject(answers, cb)
    });
  }
}

function createProject(p, cb) {
  console.log("init project", p)
    // start
     let projectName = p['name'];
     let spinnerInstance = new Spinner(`Starting initialized ${projectName}...  `, ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
     spinnerInstance.start();
     //
     fs.mkdir(path.resolve('./', projectName), { recursive: true }, (err) => {
       if (err) throw err;
       shell.cp('-Rf', path.resolve(__dirname, '../grs/*'), path.resolve('./', projectName));
       spinnerInstance.stop()

        log(chalk.green(
            'init success !!! then run ' +
            chalk.blue.underline.bold(`cd ${projectName} && npm install`) +
            ' to start your project!'
        ));
        cb && cb(projectName)
     });
}

module.exports = {
  exec: init
}
