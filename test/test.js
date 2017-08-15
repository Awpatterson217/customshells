const customshell = require('../');
const createShell = require('../').createShell;
const Branch      = require('../lib/branches');

let myShellTwo = createShell();
let myShell = customshell.createShell();

//myShell.toFile('myOutput.txt');
//myShell.execute('myscript.bat');
//myShell.at('C:\\src\\customshells\\tests\\test');
//myShell.new();
//myShell.create();

// WORKS
//myShell.open('cmd');
//myShell.open('node');
//myShell.open('powershell');

//let at = '\\test';
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    //.at(at)
    //.new()
    .create();

/*
let myRef = myShell
                .node('myModule.js')
                .create();
console.log(myRef.pid);
*/

let branch = new Branch();

let root = '/' 
branch.scanFolder(root);


branch.on('finished', (numOfFolders, errors) =>{
    console.log("Event Listener: finished");
    console.log("Total number of folders: " + numOfFolders);
    console.log("Total number of inaccessable folders: " + errors);
    let directories = Object.keys(branch.directories);
    directories.forEach( (directory) => {
        // Do something
    });
});


/*
fs.stat(path, callback(err, stats){
    
});
*/