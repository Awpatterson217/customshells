# Create an instance of NodeShell
<br />
const nodeshell = require('customshells').nodeshell;
<br />
let nodeShell = new nodeshell.NodeShell();
<br />
or:
<br />
let nodeShell =  nodeshell.createNodeShell();
# Open an instance of of Node.js in a new window
nodeShell.open();
# Run a module in a new instance of Node.js 
nodeShell.serve('file');
# Pipe output to file
nodeShell.toFile(module, ...parameters, 'example/output.txt');
# Open a server in a new instance of Node.js
nodeShell.httpServer(optionalHost, optionalPort);


