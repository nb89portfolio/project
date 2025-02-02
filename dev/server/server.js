"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const fs_1 = __importDefault(require("fs"));
const hostname = '127.0.0.1';
const port = 3000;
const server = (0, node_http_1.createServer)((req, res) => {
    if (req.url == '/') {
        const readStream = fs_1.default.createReadStream('./src/client/index.html');
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/styles.css') {
        const readStream = fs_1.default.createReadStream('./src/client/styles.css');
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
    if (req.url == '/script.js') {
        const readStream = fs_1.default.createReadStream('./src/client/script.js');
        res.writeHead(200, { 'Content-type': 'text/html' });
        readStream.pipe(res);
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
