# CustomShell
Use the CustomShell API to automate tasks, run node packages, and execute scripts more easily without sacrificing flexibility.

<br>
<br>
<hr>

```js
const customShell = require('customshells');

let myShell = customShell.createShell();
```

### Chainable methods

```js
myShell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at('foo/bar')
    .create();
```

### Open an instance of your favorite shell in a new window with <code>open()</code>

Runs independently of <code>.create()</code> 

```js

myShell.open('node');


myShell.open('python');

// Windows only
myShell.open('powershell'); 

// Windows only
myShell.open('cmd');
```

<hr>

### Run a node module with <code>node()</code>

```js
myShell
    .node('myModule.js')
    .create();
```


### Execute a script with <code>run()</code>

```js
myShell
    .run('myScript.bat')
    .create();
```


### Run a Node.js module/script recursively through directories with <code>tree()</code>

Pass an empty string to begin in the current working directory: <code>.tree('')</code>
<br>
<br>
Use absolute paths: <code>.tree('C:/Users/user/example')</code> &nbsp;  Or relative paths: <code>.tree('../example/path')</code>
<br>
<br>
Avoid beginning paths with: <code>/</code> or <code>\\</code>
<br>
<br>
Formats path with <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync(dir)</a>.

```js
myShell
    .run('myScript.bat')
    .tree('example/dir')
    .create();

// Pass an array of directories to ignore
.tree('example/dir', ['directories/to/ignore'])
```


### Run a Node.js module/script in a new working directory with <code>at()</code>

*Note: Scripts, like .bat or .ps, must be in the same working directory specified by <code>.at()</code>

```js
myShell
    .node('myModule.js')
    .at('./example/dir')
    .create();
```


### Pipe output to file with <code>toFile()</code>

Will append file or create file at runtime.


Formats path with <a href="https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_relative_from_to">path.relative(process.cwd(), 'example/output.txt')</a>.


*Note: Writes synchronously.

```js
myShell
    .run('myScript.bat')
    .toFile('example/output.txt')
    .create();
```


### Change the way output is streamed to a file

Default flag: <code> 'a' </code>

See a list of flags <a href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">here</a>.

```js

myShell
    .toFile('myOutput.txt', 'FLAG');
```


### Return a reference to the process

```js
let child = myShell
                setOptions(
                {stdio: [process.stdin, process.stdout, process.stderr, 'pipe', 'pipe']}
                )
                .node('myModule.js')
                .create();

child.stdio[3].write('Send messages to child process');

child.stdio[4].pipe(process.stdout); // Recieve messages from 
                                     // child process
```

Respond to events.

See a list of events <a href="https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_events">here</a>.

```js
let child = myShell
                .node('myModule.js')
                .create();

child.on('exit', (code) => {
  console.log('About to exit with code: ' + code);
});
```


### Set options with <code>setOptions()</code>

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


### Reset customShell with <code>reset()</code>

```js

myShell
    .reset()
    .node('myModule.js')
    .create();
```


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
