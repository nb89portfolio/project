import { createServer } from 'node:http';
import fs from 'fs';
import path from 'path';

const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const html = fs.readFileSync('./client/index.html');

  res.end(html);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
