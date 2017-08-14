const customshell = require('../');
const createShell = require('../').createShell;

let myShell    = customshell.createShell();
let myShellTwo = createShell();

//myShell.toFile('myOutput.txt');
//myShell.execute('myscript.bat');
//myShell.at('C:\\src\\customshells\\tests\\test');
//myShell.new();
//myShell.create();

// WORKS
myShell.open('cmd');
myShell.open('cmd');
myShell.open('cmd');
myShell.open('cmd');
//myShell.open('node');
//myShell.open('powershell');

// WORKS
//myShellTwo.open('cmd');
//myShellTwo.open('node');
//myShellTwo.open('powershell');

/*
myShellTwo
    .toFile('myOutputTwo.txt')
    .node('myModule.js')
    .at('C:\\src\\customshells\\tests\\test')
    .new()
    .create();
*/

