const http      = require('http');
const hostname  = process.argv[2];
const port      = process.argv[3];
const serverMsg = `Server running at http://${hostname}:${port}` + '\n';

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
