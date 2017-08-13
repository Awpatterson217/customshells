# Create an instance of CommandPrompt

```js
const commandprompt = require('customshells');

let commandPrompt = new commandprompt.CommandPrompt();
```

### or:

```js
const commandprompt = require('customshells');

let commandPrompt =  commandprompt.createCommandPrompt();
```

### Open an instance of Command Prompt in a new window

```js
commandPrompt.open();
```

### Execute a script
<br><br>
Opens bash then executes script.
<br><br>
UNIX only: child_process.execFile() is faster, it does not open an instance of shell/bash before execution.

```js
commandPrompt.execute('example.bat');
```

### Pipe output to file

```js
commandPrompt.toFile('echo', ['parameters'], 'output.txt');
```
