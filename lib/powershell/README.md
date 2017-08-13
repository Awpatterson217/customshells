# Create an instance of PowerShell

```js
const powershell = require('customshells').powershell;

let powerShell = new powershell.PowerShell();
```

### or:

```js
const powershell = require('customshells').powershell;

let powerShell =  powershell.createPowerShell();
```
### Open an instance of PowerShell in a new window

```js
powerShell.open();
```
