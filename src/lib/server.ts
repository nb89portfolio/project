import { createServer, IncomingMessage, ServerResponse } from 'http';

const PORT = 3000;

const requestHandler = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from TypeScript Node.js server!');
};

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
