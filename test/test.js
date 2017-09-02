"use strict";

const customshell = require('../');

// WORKS
let myShell = customshell.createShell();

const root       = 'out'; 
const Extensions = ['.js', '.css']; 
const link       = 'testFolder';
const nodeOut    = 'nodeOut.txt';
const cmdOut     = 'cmdOut.txt';
const myModule   = 'server.js';
const myScript   = 'myScript.bat';
const int        = 12;
const ignorees   = ['C:/src/customshells'];

// NODE
//myShell
    //.reset()
    //.toFile(cmdOut)
    //.at(link)
    //.node(myModule)
    //.create();

// RUN 
myShell
    .reset()
    .toFile(cmdOut)
    .tree('testFolders')
    .run(myScript)
    .create();

// NODE TREE
//myShell
    //.reset()
    //.toFile(nodeOut)
    //.node(myModule)
    //.tree(root)
    //.create();

// RUN TREE
//myShell
    //.reset()
    //.toFile(cmdOut)
    //.run(myScript)
    //.tree(root)
    //.create();


//let child = myShell
                //.at(link) 
                //.toFile('mylogs.txt') 
                //.setOptions()                    
                //.create(); 

//let myRef = myShell
                //.node('myModule.js')
                //.create();

console.log(myRef.pid);

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
