# Create an instance of CommandPrompt
<b>
const commandprompt = require('customshells');
<br /><br><br>
let commandPrompt = new commandprompt.CommandPrompt();
<br /><br>
or:
<br /><br>
let commandPrompt =  commandprompt.createCommandPrompt();
<hr>
<h3>Open an instance of Command Prompt in a new window</h3>
<br><br>
commandPrompt.open();
<hr>
<h3>Execute a script</h3>
<br><br>
Opens bash then executes script.
<br><br>
UNIX only: child_process.execFile() is faster, it does not open an instance of shell/bash before execution.
<br><br>
commandPrompt.execute('example.bat');
<hr>
<h3>Pipe output to file</h3>
<br><br>
commandPrompt.toFile('echo', ['parameters'], 'output.txt');
</b>
