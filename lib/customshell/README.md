# customshells
Use the customshells API to automate tasks, run Node.js modules, and execute scripts more easily without sacrificing flexibility.
<br>
<br>
<hr>

```js
const customshells = require('customshells');

const shell = customshells.create();
```

<hr>

### Chainable methods

```js
shell
    .toFile('myOutput.txt')
    .node('myModule.js')
    .at('foo/bar')
    .run();
```

<hr>

### Open shell instances in a new window with <code>open()</code>

Runs independently of <code>.run()</code> 

```js

shell.open('node');


shell.open('python');

// Windows only
shell.open('powershell'); 

// Windows only
shell.open('cmd');
```

<hr>

### Run a Node.js module with <code>node()</code>

```js
shell
    .node('myModule.js', 'optionally', 'pass', 'parameters')
    .run();
```

<hr>

### Run a script with <code>exe()</code>

```js
shell
    .exe('myScript.bat', 'optionally', 'pass', 'parameters')
    .run();
```

<hr>

### Run a Node.js module/script recursively through directories with <code>tree()</code>

Pass an empty string to begin in the current working directory: <code>''</code>
<br>
<br>
Use absolute paths: <code>.tree('C:/Users/user/example')</code>
<br>
<br>
Or relative paths: <code>.tree('../example/path')</code>
<br>
<br>
Avoid beginning paths with: <code>/</code> or <code>\\</code>
<br>
<br>
Formats path with <a href="https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options">fs.realpathSync()</a>.

```js
shell
    .execute('myScript.bat')
    .tree('example/dir')
    .run();

// Optionally pass an array 
// of directories to ignore
.tree('example/dir', [
    'example/directories',
    'to/ignore'
])
```

<hr>

### Run a Node.js module/script in a new working directory with <code>at()</code>

```js
shell
    .node('myModule.js')
    .at('./example/dir')
    .run();
```

<hr>

### Pipe output to file with <code>toFile()</code>

Will append file or create file at runtime.


Formats path with <a href="https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_relative_from_to">path.relative()</a>.


*Note: Writes synchronously.

```js
shell
    .execute('myScript.bat')
    .toFile('example/output.txt')
    .run();
```

**Change the way output is streamed to a file**

Default flag: <code> 'a' </code>

See a list of flags <a href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">here</a>.

```js

shell
    .toFile('myOutput.txt', 'FLAG');
```

<hr>

### Return a reference to the process

```js
const child = shell
                .setOptions({ 
                    stdio: [
                        process.stdin, 
                        process.stdout, 
                        process.stderr, 
                        'pipe', 
                        'pipe'
                    ]
                })
                .node('myModule.js')
                .run();

child.stdio[3].write('Send messages to child process');

child.stdio[4].pipe(process.stdout); // Recieve messages from 
                                     // child process
```

**Respond to events**

See a list of events <a href="https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_events">here</a>.

```js
const child = shell
                .node('myModule.js')
                .run();

child.on('exit', (code) => {
  console.log('About to exit with code: ' + code);
});
```

<hr>

### Set options with <code>setOptions()</code>

See a list of options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">here</a>.

```js
newOptions = {
    uid: 10,
    gid: 20,
    env: {
        my: 'keyPairs'
    }
}

shell
    .setOptions(newOptions);
```

<hr>

### Reset customShell with <code>reset()</code>

```js

shell
    .reset()
    .node('myModule.js')
    .run();
```

<hr>

### Nothing happens until <code>run()</code>

```js
shell
    .run();
```

Returns an instance of <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess">ChildProcess</a>. 
<br>
<br>
Uses the <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options"><code>child_process.spawn()</code></a> method.
<br>
<br>
Creates processes asynchronously.
