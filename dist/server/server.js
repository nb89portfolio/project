import http from "http";
import fs from "fs";
http
    .createServer((request, response) => {
    fs.readFile("../client/home.html", (error, data) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
    });
})
    .listen(4000);
//# sourceMappingURL=server.js.map