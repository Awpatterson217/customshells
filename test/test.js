"use strict";

const customshell = require('../');
const Tree = require('../').Tree;

//const Tree        = require('customshells').Tree;
//const customShell = require('customshells');

let myTree  = new Tree();
let myShell = customshell.createShell();

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
//myShell.open('python');
//myShell.open('node');
//myShell.open('powershell');

// WORKS
const root       = '../../commandcenter'; 
const Extensions = ['.js', '.css']; 
const link       = 'testFolder';
const nodeOut    = 'out/nodeOut.txt';
const cmdOut     = 'out/cmdOut.txt';
const myModule   = 'myModule.js';
const myScript   = 'myScript.bat';

//let ignorees = ['folderOne'];

//myShell
    //.toFile(cmdOut)
    //.tree(root, ignorees)
    //.at(link)
    //.execute(myScript)
    //.new()
    //.create();

// WORKS
//myShell
    //.reset()
    //.toFile(nodeOut)
    //.tree(root, ignorees)
    //.at(link)
    //.node(myModule)
    //.new()
    //.create();
/*
// WORKS
let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);
*/

// WORKS
//let myTree = new Tree();


//let ignorees = ['folderOne'];

// Works
//myTree.getBranch(root);

myTree.getLeaves(root, Extensions);

myTree.on('gathered', (numOfDir, numOfDirMissed, reasonsMissed) => {
    console.log("Directories: "        + numOfDir);
    console.log("Missed directories: " + numOfDirMissed);
    console.log("reasonsMissed: "      + reasonsMissed);
});

myTree.on('file', (file, extension) =>{
    console.log("File: "      + file);
    console.log("Extension: " + extension);
});

myTree.on('filePath', (directory) =>{
    //console.log("directory: " + directory);
});

myTree.on('autumn', (numOfFiles, extensionsMatched, numOfDirMissed, reasonsMissed) =>{
    console.log("Files: "                 + numOfFiles);
    console.log("Extensions Matched: "    + extensionsMatched);
    console.log("numOfDirMissed: "        + numOfDirMissed);
    console.log("reasonsMissed: "         + reasonsMissed);
});
