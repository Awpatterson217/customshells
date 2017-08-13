const customshells = require('../');
const ps           = require('../').powershell;
const ns           = require('../').nodeshell;

let powerShell    = new ps.PowerShell();
let commandPrompt = new customshells.CommandPrompt();
let nodeShell     = new ns.NodeShell();

// ALL WORK
//powerShell.open();
//commandPrompt.open();
//nodeShell.open();

// CMD WORKS
//powerShell.execute('test.bat');
//commandPrompt.execute('test.bat');
//nodeShell.execute();

// CMD WORKS
//powerShell.toFile('echo', ['This is a test'], 'testOutput.txt');
//commandPrompt.toFile('echo', ['This is a test'], 'testOutput.txt');
//nodeShell.toFile('testOutput.txt');

// WORKS
//nodeShell.httpServer('127.0.0.3');
//nodeShell.serve('server.test.js');

let powerShellObj    =  ps.createPowerShell();
let commandPromptObj =  customshells.createCommandPrompt();
let nodeShellObj     =  ns.createNodeShell();

// ALL WORK
//powerShellObj.open();
//commandPromptObj.open();
//nodeShellObj.open();

// CMD WORKS 
//powerShellObj.execute('test.bat');
//commandPromptObj.execute('test.bat');
//nodeShellObj.execute('test.bat');

// CMD WORKS
//powerShell.toFile('echo', ['This is a test'], 'testOutput.txt');
//commandPrompt.toFile('echo', ['This is a test'], 'testOutput.txt');
//nodeShell.toFile('testOutput.txt');

// WORKS
//nodeShellObj.httpServer('127.0.0.3', '3005');
//nodeShellObj.serve('server.test.js');