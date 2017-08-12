const INIT_PS  = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
const SILENT_CMD  = "-WindowStyle Hidden $wscript = new-object -ComObject WScript.Shell;";
const SUPER    = " runAs";

module.exports = INIT_PS