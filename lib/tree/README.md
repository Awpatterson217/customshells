# Tree 
Add recursion to your application
<br>
<br>
<hr>

```js
const Tree = require('customshells').Tree;

let myTree  = new Tree();
```

### Recursively return all directories with <code>getBranch()</code>

Methods belonging to <code>Tree</code> run independently of <code>.create()</code> 

Formats path with <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync(dir)</a>.

```js
// Optionally, pass an array of directories to ignore
myTree.getBranch('example/root', ['example/dir/to/ignore']);
```

Tree implements the Node.js <a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a> API. 

```js
myTree.on('dir', directory =>{
    // Fires each time getBranch() finds a directory
});

myTree.on('gathered', (errors, directories) =>{
    // Fired when getBranch() is finished searching
    // If it exists, errors is an array of Objects { dir, msg }
    // directories is an array of matching directories
});

myTree.on('error', err =>{
    // Handle errors
});
```

### Recursively match files by extension with <code>getLeaves()</code>

```js
// Optionally, pass an array of directories to ignore
myTree.getLeaves('example/root', ['.js', '.css'], ['example/dir/to/ignore']);
```

```js
myTree.on('file', (file, extension) =>{
    // Returns files and their extensions one at a time
});

myTree.on('dirFound', directory =>{
    // Fires each time getLeaves() finds a directory
});

myTree.on('autumn', (errors, files, extensionsMatched) =>{
    // Fired when getLeaves() is finished searching
    // If it exists, errors is an array of Objects { dir, msg }
    // Files is an array of matching files
    // If it exists extensionsMatched is an array of extensions
    // matched successfully by getLeaves()
});

myTree.on('error', err =>{
    // Handle errors
});
```