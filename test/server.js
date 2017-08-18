const fs      = require('fs');
const http    = require('http');

const hostname      = '127.0.0.1';
const port          = 3000;
const serverMsg     = `Server running at http://${hostname}:${port}` + '\n';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(serverMsg);
});

server.listen(port, hostname, () => {
console.log(serverMsg);
});
