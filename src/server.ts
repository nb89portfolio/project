import { createServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';

const PORT = 3000;

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readFile(join(__dirname, '../dist', 'client.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.end(data);
      }
    });
  } else if (req.url === '/client.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    readFile(join(__dirname, '../dist', 'client.js'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading client.js');
      } else {
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
