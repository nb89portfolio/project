import { createServer } from 'http';
import { promises as fs } from 'fs';
import { resolve } from 'path';

const PORT = 3000;

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const templatePath = resolve('src', 'index.html');
      let template = await fs.readFile(templatePath, 'utf-8');
      const content = '<h1>Hello, Server-Side Rendering!</h1>';
      template = template.replace('{{content}}', content);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(template);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else if (req.url === '/client.js') {
    try {
      const clientJsPath = resolve('src', 'client.js');
      const clientJs = await fs.readFile(clientJsPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(clientJs);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
