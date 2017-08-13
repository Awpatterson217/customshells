# Create an instance of CommandPrompt
const commandprompt = require('customshells');
<br />
let commandPrompt = new commandprompt.CommandPrompt();
<br />
or:
<br />
let commandPrompt =  commandprompt.createCommandPrompt();
# Open an instance of Command Prompt in a new window
commandPrompt.open();
# Execute a script
Opens bash then executes script.
<br>
UNIX only: child_process.execFile() is faster, it does not open an instance of shell/bash before execution.
<br><br>
commandPrompt.execute('example.bat');
# Pipe output to file
commandPrompt.toFile('echo', ['parameters'], 'output.txt');

