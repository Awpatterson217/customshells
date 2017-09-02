# CustomShells
 A library to simplify the use of shells in Node.js
<br>
<br>
<a href="https://badge.fury.io/js/customshells"><img src="https://badge.fury.io/js/customshells.svg" alt="npm version" height="18"></a>
<a href="https://github.com/Awpatterson217/customshells/blob/master/LICENSE.MIT"><img src="https://img.shields.io/npm/l/express.svg" alt="npm version" height="18"></a>
<a href="https://github.com/Awpatterson217/customshells/blob/master/LICENSE.APACHE2"><img src="https://img.shields.io/hexpm/l/plug.svg" alt="npm version" height="18"></a>
<br>
<hr>
<br>

```js
npm install customshells
```

<br>
<a href="https://github.com/Awpatterson217/customshells/blob/master/lib/customshell/README.md">
CustomShell API Documentation
</a>
<br>
<hr>

### Example Usage:

```js
const customshell = require('customshells');

let myShell = customshell.createShell();

    // Run a node module
    // at every node in 
    // a directory tree.

    // Pipe all output
    // to 'example/output.txt'.

myShell
    .node('example/module.js')
    .toFile('example/output.txt')
    .tree('example/root/dir')
    .create();   

```

<br>
Contributors Welcome!
