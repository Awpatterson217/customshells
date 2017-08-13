const http      = require('http');
const hostname  = 'localhost';
const port      = 3000;
const serverMsg = `Test is successful, running at http://${hostname}:${port}` + '\n';

const server = http.createServer((req, res) => {
  // EXAMPLE RESPONSE
  // COULD RESPOND WITH JSON DATA TO TEST API
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(serverMsg);
});
server.listen(port, hostname, () => {
  console.log(serverMsg);
});
