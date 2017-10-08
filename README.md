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
CustomShells API Documentation
</a>
<br>
<hr>

### Example Usage:

```js
const customshells = require('customshells');

let myShell = customshells.createShell();

    // Run a Node.js module
    // at every node in 
    // a directory tree.

    // Pipe all output
    // to 'example/output.txt'.

myShell
    .node('myModule.js')
    .tree('example/root/node')
    .toFile('example/output.txt')
    .create();   

```

<br>
Contributors Welcome!
