const customshell = require('../');
const createShell = require('../').createShell;

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

/*
myShell
    .toFile('myOutputTwo.txt')
    .node('myModule.js')
    .at('C:\\src\\customshells\\tests\\test')
    .new()
    .create();
*/
/*
let myRef = myShell
                .node('myModule.js')
                .create();
console.log(myRef.pid);
*/
