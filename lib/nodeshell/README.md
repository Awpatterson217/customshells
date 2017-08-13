# Create an instance of NodeShell
<b>
<br /><br>
const nodeshell = require('customshells').nodeshell;
<br /><br><br>
let nodeShell = new nodeshell.NodeShell();
<br /><br>
or:
<br /><br>
let nodeShell =  nodeshell.createNodeShell()
<hr>
<h3>Open an instance of of Node.js in a new window</h3>
<br /><br>
nodeShell.open();
<hr>
<h3>Run a module in a new instance of Node.js</h3> 
<br /><br>
nodeShell.serve('file');
<hr>
<h3>Pipe output to file</h3>
<br /><br>
nodeShell.toFile(module, ...parameters, 'example/output.txt');
<hr>
<h3>Open a server in a new instance of Node.js</h3>
<br /><br>
nodeShell.httpServer(optionalHost, optionalPort);
</b>