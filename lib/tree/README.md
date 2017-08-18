# Tree 
Handles deeply nested directory structures using recursion and the Node.js <a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a>.
<br>
<hr>

**Instantiate Trees with the** <code>new</code> **keyword**

```js
const Tree = require('customshells').Tree;

let myTree  = new Tree();
```

<hr>

**Pass an empty string to begin in the current working directory:** <code>.getBranch('')</code>
<br>
<br>
**Use absolute paths:** <code>.getLeaves('C:/Users/user/example')</code>
**Or relative paths:** <code>.getBranch('../example/path')</code>
<br>
<br>
**Avoid beginning paths with:** <code>/</code> or <code>\\</code>
<br>
<br>
**Formats path with** <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync(dir)</a>.

<hr>

### Recursively return all directories with <code>getBranch()</code>


```js
// Optionally, pass an array of directories to ignore
myTree.getBranch('example/root', ['example/dir/to/ignore']);
``` 

**Events:** 

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

<hr>

### Recursively match files by extension with <code>getLeaves()</code>

```js
// Optionally, pass an array of directories to ignore
myTree.getLeaves('example/root', ['.js', '.css'], ['example/dir/to/ignore']);
```

**Events:** 

```js
myTree.on('file', (file, dir, extension) =>{
    // Fires each time getLeaves() matches an extension to a file
    // Returns full path to file, its parent directory, and its extension as ".extension"
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