# Create an instance of NodeShell

```js
const nodeshell = require('customshells').nodeshell;

let nodeShell = new nodeshell.NodeShell();
```

### or:

```js
const nodeshell = require('customshells').nodeshell;

let nodeShell =  nodeshell.createNodeShell();
```

### Open an instance of of Node.js in a new window

```js
nodeShell.open();
```

### Run a module in a new instance of Node.js

```js
nodeShell.serve('file');
```

### Pipe output to file</h3>

```js
nodeShell.toFile(module, ...parameters, 'example/output.txt');
```

### Open a server in a new instance of Node.js

```js
nodeShell.httpServer(optionalHost, optionalPort);
```
