"use strict";

const customshell = require('../');
const Tree = require('../').Tree;

// WORKS
let myTree = new Tree();

// WORKS
let myShell = customshell.createShell();

const root       = 'out'; 
const Extensions = ['.js', '.css']; 
const link       = 'testFolder';
const nodeOut    = 'out/nodeOut.txt';
const cmdOut     = 'out/cmdOut.txt';
const myModule   = 'myModule.js';
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

/*    
let child = myShell
                .at(link) 
                .toFile('mylogs.txt') 
                .setOptions()                    
                .create(); 

let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);



// Works
//myTree.getBranch(root, ignorees);
//myTree.getLeaves(root, Extensions);

//myTree.fertilize(int); // TODO?

// LEAVES
myTree.on('file', (file, dir, extension) =>{
    console.log("File: "      + file);
    console.log("dir: "       + dir);
    console.log("Extension: " + extension);
});

// LEAVES
myTree.on('dirFound', directory =>{
    console.log("directory: " + directory);
});

// LEAVES
myTree.on('autumn', (errors, files, extensionsMatched) =>{
    console.log("Files found: "           + files);
    console.log("Number of Files found: " + files.length);
    console.log("Extensions Matched: "    + extensionsMatched);
    if(errors.length){
        console.log("Number of errors: "  + errors.length);
        console.log("Reasons for error: " + errors[0].msg);
        console.log("Location of error: " + errors[0].path);
    }
});

// BRANCH
myTree.on('dir', directory =>{
    console.log("directory: " + directory);
});

// BRANCH 
myTree.on('gathered', (errors, directories) => {
    console.log("Directories Found: "           + directories);
    console.log("Number of Directories Found: " + directories.length);    
    if(errors.length){
        console.log("Number of errors: "  + errors.length);
        console.log("Reasons for error: " + errors[0].msg);
        console.log("Location of error: " + errors[0].path);
    }
});

// RANDOM
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
