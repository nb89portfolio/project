import { createServer } from 'node:http';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if (req.url == '/') {
    const readStream = fs.createReadStream('./src/client/index.html');
    res.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(res);
  }

  if (req.url == '/styles.css') {
    const readStream = fs.createReadStream('./src/client/styles.css');
    res.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(res);
  }

  if (req.url == '/script.js') {
    const readStream = fs.createReadStream('./src/client/script.js');
    res.writeHead(200, { 'Content-type': 'text/html' });
    readStream.pipe(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
