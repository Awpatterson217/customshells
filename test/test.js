const customshell = require('../');
const createShell = require('../').createShell;
const Tree      = require('../lib/Tree');

let myShellTwo = createShell();
let myShell = customshell.createShell();

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

/* WORKS
let link = 'test';

myShell
    .toFile('myCMDOutput.txt')
    .execute('myScript.bat')
    .at(link)
    .new()
    .create();

myShell
    .reset()
    .toFile('myNodeOutput.txt')
    .at(link)
    .node('myModule.js')
    .new()
    .create();

let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);
*/

let myTree = new Tree();

let root = ''; 
//branch.scanFolder(root);


let ignorees = ['folderOne'];
myTree.getBranch(root, ignorees);

myTree.on('complete', (numOfDir, numOfDirMissed, reasonsMissed) => {
    console.log("Directories: "        + numOfDir);
    console.log("Missed directories: " + numOfDirMissed);
    console.log("reasonsMissed: "      + reasonsMissed);
});

/*
fs.stat(path, callback(err, stats){
    
});
*/