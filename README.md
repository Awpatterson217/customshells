# customshells
A library to simplify the creation of shells in Node.js 
<br>
<br>
<hr>

```js
const customShell = require('customshells');

let myShell = customShell.createShell();

// OR

const createShell = require('customshells').createShell;

let myShell = createShell();
```

### Chain methods

```js
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at('foo/bar')
    .new()
    .create();
```

### Do not chain methods

```js
myShell.toFile('myOutput.txt');
myShell.at('C:/example/path/');

myEventEmitter.on('myEvent', function(myData){
    myShell.execute(myData);
});

myShell.create();
```
<hr>

### Open an instance of your favorite shell in a new window with <code>open()</code>

Runs independently of <code>.create()</code> 

```js
myShell.open('node');

myShell.open('powershell');

myShell.open('cmd');
```

<hr>

### Run a node module with <code>node()</code>

```js
myShell
    .node('myModule.js')
    .create();
```

<hr>

### Execute a script with <code>execute()</code>

```js
myShell
    .execute('myScript.bat')
    .create();
```

<hr>

### Recursively return all directories in a directory with <code>getBranch()</code>

Runs independently of <code>.create()</code> 

Will format relative path with <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync(dir)</a>.

```js
const Tree = require('customshells').Tree;

let myTree = new Tree();

// Optionally, pass an array of directories to ignore
myTree.getBranch('example/dir', ['example/dir/to/ignore']);
```

Tree implements the Node.js <a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a> API. 

```js
this.on('dir', directory =>{
    // Returns directories one at a time
});

this.on('gathered', (numOfDir, numOfDirMissed, reasonsMissed) =>{
    // getBranch() has finished
});

this.on('error', err =>{
    // Handle errors
});
```

<hr>

### Run a module/script recursively through directories with <code>tree()</code>

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ***Note: This method is in progress.**

Pass an empty string to begin in the current working directory: <code>.tree('')</code>
<br>
<br>
Use absolute paths: <code>.tree('C:/Users/user/example')</code> &nbsp;  Or relative paths: <code>.tree('../example/path')</code>
<br>
<br>
Avoid beginning paths with: <code>/</code> or <code>\\</code>
<br>
<br>
Will automatically format relative path using <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync(dir)</a>.

```js
myShell
    .execute('myScript.bat')
    .tree('example/dir')
    .create();

// Pass an array of directories to ignore
.tree('example/dir', ['example/dir/to/ignore'])
```

<hr>

### Run a module/script in a new working directory with <code>at()</code>

*Note: Scripts, such as batch files or powershell scripts must be in the working directory specified by <code>.at()</code>

```js
myShell
    .node('myModule.js')
    .at('./example/dir')
    .create();
```

<hr>

### Pipe output to file with <code>toFile()</code>

Will append file or create file at runtime.


Will automatically format relative path using <a href="https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_relative_from_to">path.relative(process.cwd(), 'example/output.txt').</a>


*Note: <code>toFile()</code> is a blocking operation.

*Note: When running a node module, <code>toFile()</code> may silently fail when combined with<code>.new()</code>

```js
myShell
    .execute('myScript.bat')
    .toFile('example/output.txt')
    .create();
```

<hr>

### Change the way output is streamed to a file

Default flag: <code> -a </code>

See a list of flags <a href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">here</a>.

```js

myShell
    .toFile('myOutput.txt', 'FLAG');
```

<hr> 

### Run a module/script in a new shell window with <code>new()</code>

```js
myShell
    .execute('myScript.bat')
    .toFile('example/output.txt')
    .new()
    .create();
```

<hr>

### Return a reference to the process

```js
let myRef = myShell
                .node('myModule.js')
                .create();

console.log(myRef.pid);
```

<hr>

### Respond to events

See a list of events <a href="https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_events">here</a>.

```js
let myRef = myShell
                .node('myModule.js')
                .create();

myRef.on('exit', (code) => {
  console.log('About to exit with code: ' + code);
});
```

<hr>

### Add your own options with <code>setOptions()</code>

See a list of options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">here</a>.

```js
newOptions = {
    uid: 10,
    gid: 20,
    env: {
        my: 'key pairs'
    }
}

myShell
    .setOptions(newOptions);
```

<hr>

### Reset customShell with <code>reset()</code>

```js
myShell
    .reset();

// reset() is chainable

myShell
    .reset()
    .node('myModule.js')
    .create();
```

<hr> 

### Nothing happens until <code>create()</code>

```js
myShell
    .create();
```

Returns an instance of <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess">ChildProcess</a>. 
<br>
<br>
Uses the <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options"><code>child_process.spawn()</code></a> method.
<br>
<br>
Creates processes asynchronously.
