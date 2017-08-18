# CustomShells
A Node.js library to simplify the use of shells and navigation of file systems.
<br>
<br>
<a href="https://badge.fury.io/js/customshells"><img src="https://badge.fury.io/js/customshells.svg" alt="npm version" height="18"></a>
<a href="https://github.com/Awpatterson217/customshells/blob/master/LICENSE.MIT"><img src="https://img.shields.io/npm/l/express.svg" alt="npm version" height="18"></a>
<a href="https://github.com/Awpatterson217/customshells/blob/master/LICENSE.APACHE2"><img src="https://img.shields.io/hexpm/l/plug.svg" alt="npm version" height="18"></a>
<br>
<hr>
<br>

```js
npm install customshells
```

<br>
<a href="https://github.com/Awpatterson217/customshells/blob/master/lib/customshell/README.md">
CustomShell API Documentation
</a>
<br>
 <a href="https://github.com/Awpatterson217/customshells/blob/master/lib/tree/README.md">
Tree API Documentation
</a>
<br>
<hr>

### Example Usage:

```js

let myTree  = new Tree();
let myShell = customShell.createShell();


// Find all CSS and HTML files in a nested file structure
myTree.getLeaves('example/project/root/', [
    '.css',
    '.html'
    ]);

// Deal with files asynchronously
myTree.on('file', (file, dir, extension) =>{

    // Pipe output to myLogs.txt
    myShell.toFile('myLogs.txt');  

    // Run Node.js applications dynamically
    if(extension === '.html') 
        myShell.node('handleHTML.js', file); 

    // Optionally, pass a parameter
    if(extension === '.css') 
        myShell.node('handleCSS.js', file);   
        
    myShell
        .at(dir)   // Dynamically choose where it runs
        .create(); // Chain commands

});

                   // OR

        // Use the tree method to run
        // a Node.js app in every
        // nested directory found

myShell
    .node('example/module.js')
    .tree('example/root/dir')
    .create();   

```


