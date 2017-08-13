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
<h4>Open an instance of Command Prompt in a new window</h4>
<br><br>
commandPrompt.open();
<hr>
<h4>Execute a script</h4>
<br><br>
Opens bash then executes script.
<br><br>
UNIX only: child_process.execFile() is faster, it does not open an instance of shell/bash before execution.
<br><br>
commandPrompt.execute('example.bat');
<hr>
<h4>Pipe output to file</h4>
<br><br>
commandPrompt.toFile('echo', ['parameters'], 'output.txt');
</b>
