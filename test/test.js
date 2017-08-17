"use strict";

const customshell = require('../');
const Tree = require('../').Tree;

//const Tree        = require('customshells').Tree;
//const customShell = require('customshells');

// WORKS
//let myTree = new customshell.Tree();
//let myTreeTwo = new customshell.Tree();

// WORKS
//let myTree  = new Tree();
//let myShell = customshell.createShell();

// WORKS
//let myShellTwo = customshell.createShell();
let myShell = customshell.createShell();

// WORKS
//myShell.toFile('myOutput.txt');
//myShell.execute('myscript.bat');
//myShell.at('C:\\src\\customshells\\tests\\test');
//myShell.new();
//myShell.create();

// WORKS
//myShell.open('cmd');
//myShell.open('python');
//myShell.open('node');
//myShell.open('powershell');

const root       = '../../'; 
const rootTwo       = '../../'; 
const Extensions = ['.js', '.css']; 
const link       = 'testFolder';
const nodeOut    = 'out/nodeOut.txt';
const cmdOut     = 'out/cmdOut.txt';
const myModule   = 'myModule.js';
const myScript   = 'myScript.bat';
const int        = 12;
const ignorees   = ['C:/src/customshells'];

//let output = myShell.use('ls')
//console.log(output);


//myShell
    //.toFile(cmdOut)
    //.tree(root, ignorees)
    //.at(link)
    //.execute(myScript)
    //.new()
    //.create();

// WORKS
myShell
    //.reset()
    .toFile(nodeOut)
    //.tree(root, ignorees)
    //.at(link)
    .node(myModule)
    //.new()
    .create();
/*
// WORKS
let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);
*/

//let ignorees = ['folderOne'];

// Works
//myTree.getBranch(root, ignorees);
//myTree.getLeaves(root, Extensions);
//myTree.fertilize(int);

//myTreeTwo.getBranch(rootTwo);
//myTreeTwo.getLeaves(root, Extensions);

/*
// Works
myTree.on('file', (file, extension) =>{
    console.log("File: "      + file);
    console.log("Extension: " + extension);
});
// Works
myTree.on('dir', directory =>{
    console.log("directory: " + directory);
});
// Works
myTree.on('dirFound', directory =>{
    console.log("directory: " + directory);
});
// Works
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

// Works 
myTree.on('gathered', (errors, directories) => {
    console.log("Directories Found: "           + directories);
    console.log("Number of Directories Found: " + directories.length);    
    if(errors.length){
        console.log("Number of errors: "  + errors.length);
        console.log("Reasons for error: " + errors[0].msg);
        console.log("Location of error: " + errors[0].path);
    }
});

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

// Works
myTreeTwo.on('file', (file, extension) =>{
    console.log("File: "      + file);
    console.log("Extension: " + extension);
});
// Works
myTreeTwo.on('filePath', (directory) =>{
    //console.log("directory: " + directory);
});
// Works
myTreeTwo.on('autumn', (errors, files, extensionsMatched) =>{
    console.log("Files found: "           + files);
    console.log("Number of Files found: " + files.length);
    console.log("Extensions Matched: "    + extensionsMatched);
    if(errors.length){
        console.log("Number of errors: "  + errors.length);
        console.log("Reasons for error: " + errors[0].msg);
        console.log("Location of error: " + errors[0].path);
    }
});

setImmediate(function() {
   self.emit('test', 'TEST!');
});
*/