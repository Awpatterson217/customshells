# customshells
A library to simplify the creation of shells in Node.js 
<br>
<br>
<hr>

### <code>createShell()</code> is a factory function

```js
const customshell = require('customshells');

let myShell = customshell.createShell();

// OR

const createShell = require('customshells').createShell;

let myShell = createShell();
```

### Chain methods

```js
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at('/foo/bar')
    .new()
    .create();
```

### Or do not chain methods

```js
myShell.toFile('myOutput.txt');
myShell.at('C:\\example\\path\\');

myEventEmitter.on('myEvent', function(myData){
    myShell.execute(myData);
});

myShell.create();
```
<hr>

### Open an instance of your favorite shell in a new window with <code>open()</code>

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

### Pipe output to file with <code>toFile()</code>

Will append file or create file at runtime

```js
myShell
    .execute('myScript.bat')
    .toFile('/example/output.txt')
    .create();
```

<hr>

### Change the way output is streamed to a file

See a list of flags <a href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">here.</a>

```js

myShell
    .toFile('myOutput.txt', 'FLAG');
```

<hr> 

### Run your module/script in a new shell window with <code>new()</code>

```js
myShell
    .execute('myScript.bat')
    .toFile('/example/output.txt')
    .new()
    .create();
```

<hr>

### Run your module/script in a new directory with <code>at()</code>

```js
myShell
    .node('myModule.js')
    .at('/example/dir')
    .create();
```

<hr>

### Run scripts recursively through directories with <code>tree()</code>

```js
myShell
    .tree('/example/dir');
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

See a list of events <a href="https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_events">here.</a>

```js
let myRef = myShell
                .node('myModule.js')
                .create();

myRef.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

<hr>

### Add your own options with <code>setOptions()</code>

See a list of options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">here.</a>

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

### Nothing happens until <code>create()</code>

```js
myShell
    .create();
```

Returns an instance of <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess">ChildProcess.</a> 
<br>
<br>
Uses the <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options"><code>child_process.spawn()</code></a> method.
<br>
<br>
Creates processes asynchronously.
