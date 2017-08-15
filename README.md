# customshells
A library to simplify the creation of shells in Node.js 

```js
const customshell = require('customshells');

let myShell = customshell.createShell();

// OR

const createShell = require('customshells').createShell;

let myShell = createShell();
```

### Chain commands

```js
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at('/foo/bar')
    .new()
    .create();
```

<hr>

### Open an instance of your favorite shell in a new window

```js
myShell.open('node');

myShell.open('powershell');

myShell.open('cmd');
```

<hr>

### Run a module in a new instance of Node.js

```js
myShell
    .node('myModule.js')
    .new()
    .create();
```

<hr>

### Execute a script in a new shell instance

```js
myShell
    .execute('myScript.bat')
    .new()
    .create();
```

<hr>

### Pipe output to file

Will create file at runtime if none exists.

```js
myShell
    .execute('myScript.bat')
    .toFile('/example/output.txt')
    .create();
```

<hr>

### Run your module/script in a new directory

```js
myShell
    .node('myModule.js')
    .at('/example/dir')
    .create();
```

<hr>

### Recursively run scripts through directories 

```js
myShell
    .tree('/example/dir');
```

<hr>

### Return a reference to the process

```js
let myRef = myShell.create();

console.log(myRef.pid);
```

<hr>

### Add your own options

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

### Change the way output is streamed to a file

See a list of flags <a href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">here.</a>

```js

myShell
    .toFile('myOutput.txt', 'FLAG');
```

<hr> 

### Nothing happens until create()

```js
myShell
    .create();
```