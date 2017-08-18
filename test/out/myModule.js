
const path = require('path');
const fs   = require('fs');

//fs.createWriteStream(null, {fd: 4}).write('Sending a message back.');

let command = process.argv;
console.log('command: ' + command);
console.log('\n');

console.log("process.cwd(): " + process.cwd());
console.log("__dirname: " + __dirname);
console.log("fs.stat(process.cwd): " + fs.statSync(process.cwd()));

console.log("HELLO FROM TEST");