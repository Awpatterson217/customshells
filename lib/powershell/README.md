# Create an instance of PowerShell
<b>
<br /><br>
const powershell = require('customshells').powershell;
<br /><br><br>
let powerShell = new powershell.PowerShell();
<br /><br>
or:
<br /><br>
let powerShell =  powershell.createPowerShell();
<hr>
<h3>Open an instance of PowerShell in a new window</h3>
<br /><br>
powerShell.open();
</b>
