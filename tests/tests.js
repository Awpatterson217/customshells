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

let at = '\\test';
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at(at)
    //.new()
    .create();

/*
let myRef = myShell
                .node('myModule.js')
                .create();
console.log(myRef.pid);
*/

let fs = require('fs');
console.log('Is directory? ' + fs.lstatSync(at).isDirectory());
console.log();
fs.readdir(at, (err, files) => {
  files.forEach(item => {
    //console.log('Is directory? ' + fs.lstatSync(item).isDirectory());
      if(fs.lstatSync(item).isDirectory()){
        console.log('Found: ' + file);
      }
  });
})

/*
fs.stat(path, callback(err, stats){
    
});
*/