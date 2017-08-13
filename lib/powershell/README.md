# Create an instance of PowerShell
<br />
const powershell = require('customshells').powershell;
<br />
let powerShell = new powershell.PowerShell();
<br />
or:
<br />
let powerShell =  powershell.createPowerShell();
# Open an instance of PowerShell in a new window
powerShell.open();
