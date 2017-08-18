# CustomShells
A Node.js library to simplify the use of shells and navigation of file systems.
<br>
<br>
<hr>

```js





```


```js
// An instance of Tree makes handling nested file systems 
// simple by leveraging Node's event-driven model.
let myTree  = new Tree();
// create a customShell object to dynamically run Node.js applications.
let myShell = customShell.createShell();


// Find all CSS and HTML files in a deeply nested file structure.
myTree.getLeaves('example/project/root/', ['.css', '.html']);

// Deal with files asynchronously.
myTree.on('file', (file, dir, extension) =>{

    myShell.toFile('myLogs.txt');  // Pipe output to myLogs.txt

    if(extension === '.html') myShell.node('handleHTML.js', 'file'); // Run a Node.js app

    if(extension === '.css') myShell.node('handleCSS.js', 'file');   // Pass a parameter
        
    myShell
        .at(dir)   // Choose where your Node.js application runs 
        .create(); // Chain commands

});


// OR


myShell
    .node('example/module.js') // Use the tree method to run
    .tree('example/root/dir')  // a Node.js app in every
    .create();                 // nested directory found

```
<br>
<br>
[Read more about the Tree API here](lib/Tree/README.md)
<br>
<br>
[Read more about the CustomShell API here](lib/Tree/README.md)
