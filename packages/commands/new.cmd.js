const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const util = require('../utils/index')

function writeMyData(name, filePath, xPath, cb) {
	var templateStr = `define([], function() {
	    function init() {
	        console.log("init...")
	    }

	    return {
	       init: init
	    }
	})`
	fs.writeFile(filePath, templateStr, (err) => {
	  if (err) throw err;
		updateRequireFile(name, filePath, xPath);
	  cb && cb()
	});
}

function updateRequireFile(key, filePath, xPath) {
	// read r.js config
	fs.readFile(path.resolve(filePath, '../../../r.js'), (err, data) => {
		if (err) throw err;
		console.log(data.toString());
		let rConfig = data.toString().match(/[^\(\)]+(?=\))/g)
		if(rConfig && rConfig.length > 0) {
			let configObj = eval("(" + rConfig[0] +")");
			let pk = util.firstUpperCase(key)
			configObj.paths[pk] = xPath;
			let configBody = JSON.stringify(configObj);
			let configStr = `requirejs.config(${configBody})`;
			// write config 
			fs.writeFile(path.resolve(filePath, '../../../r.js'), configStr, (err) => {
				if (err) throw err;
				console.log(chalk.green(`You can write code in ${filePath} \n And then use ${pk} in your project!!!`));
			});
		}
	});
}

module.exports = {
	exec: function (name, filePath, cb) {
		fs.open(filePath, 'wx', (err, fd) => {
		  if (err) {
		    if (err.code === 'EEXIST') {
		      console.log(chalk.red('File ', chalk.underline.bgBlackBright(chalk.white(filePath)), ' already exists!!!'));
		      return;
		    }
		    if (err.code == 'ENOENT') {
		    	writeMyData(filePath, cb);
		    } else {
		    	throw err;
		    }
		  }
		  writeMyData(name, filePath, cb);
		});
	}
}