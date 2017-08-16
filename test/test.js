"use strict";

const customshell = require('../');
const Tree = require('../').Tree;

//const Tree        = require('customshells').Tree;
//const customShell = require('customshells');

let myTree  = new Tree();
let myShell = customshell.createShell();

console.log(Tree);
console.log(customshell);

// WORKS
//let myShellTwo = createShell();
//let myShell = createShell();

// WORKS
//myShell.toFile('myOutput.txt');
//myShell.execute('myscript.bat');
//myShell.at('C:\\src\\customshells\\tests\\test');
//myShell.new();
//myShell.create();

// WORKS
//myShell.open('cmd');
//myShell.open('node');
//myShell.open('powershell');

const link = 'test';
/*
// WORKS
myShell
    .toFile('myCMDOutput.txt')
    .execute('myScript.bat')
    .at(link)
    .new()
    .create();

// WORKS
myShell
    .reset()
    .toFile('myNodeOutput.txt')
    .at(link)
    .node('myModule.js')
    .new()
    .create();

// WORKS
let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);
*/

//let myTree = new Tree();

let root = ''; 
//let ignorees = ['folderOne'];

myTree.getBranch(root);

myTree.on('gathered', (numOfDir, numOfDirMissed, reasonsMissed) => {
    console.log("Directories: "        + numOfDir);
    console.log("Missed directories: " + numOfDirMissed);
    console.log("reasonsMissed: "      + reasonsMissed);
});
