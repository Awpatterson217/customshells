"use strict";

const customshell = require('../');

// WORKS
const shell = customshell.create();

const root       = 'testFolders'; 
const link       = 'testFolders/folderEight';
const nodeOut    = 'nodeOut.txt';
const cmdOut     = 'cmdOut.txt';
const myModule   = 'myModule.js';
const myScript   = 'myScript.bat';
const int        = 12;
const ignorees   = ['C:/src/customshells'];

// NODE
//shell
    //.reset()
    //.toFile(nodeOut)
    //.at(link)
    //.node(myModule)
    //.run();

// EXECUTE 
//shell
    //.reset()
    //.toFile(cmdOut)
    //.at(link)
    //.execute(myScript)
    //.run();

// NODE TREE
//shell
    //.reset()
    //.toFile(nodeOut)
    //.node(myModule)
    //.tree(root)
    //.run();

// EXECUTE TREE
//shell
    //.reset()
    //.toFile(cmdOut)
    //.tree(root)
    //.execute(myScript)
    //.run();


//const child = shell
                //.at(link) 
                //.toFile('mylogs.txt') 
                //.setOptions()                    
                //.run(); 

//const myRef = shell
                //.node('myModule.js')
                //.run();

//console.log(myRef.pid);


/*    RANDOM

console.log("process.cpuUsage keys" + Object.keys(process.cpuUsage));
console.log(process.cpuUsage.user);
console.log(process.cpuUsage.system);
console.log("process.env: " + process.env);
console.log("process.execPath: " + process.execPath);
if (process.getegid) {
    console.log(`Current gid: ${process.getegid()}`);
}
if (process.geteuid) {
console.log(`Current uid: ${process.geteuid()}`);
}
console.log("require.main: " + require.main);
console.log("require.main.filename: " + require.main.filename);
console.log("module: " + Object.keys(module));
console.log("process: " + process);
console.log("process keys: " + Object.keys(process));
console.log("process._events keys: " + Object.keys(process._events));
console.log("process.domain: " + process.domain);
setImmediate(function() {
   self.emit('test', 'TEST!');
});

*/
