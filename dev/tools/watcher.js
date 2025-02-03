"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
let server = null;
const runFunctions = () => {
    (0, child_process_1.exec)('node ./dev/tools/copyFiles.js');
    (0, child_process_1.exec)('node ./dev/server/server.js');
};
const startServer = () => {
    if (server) {
        server.kill();
    }
    server = (0, child_process_1.spawn)('node', [(0, path_1.join)(__dirname, '../../dist/server/server.js')], {
        stdio: 'inherit',
    });
    server.on('close', (code) => {
        if (code !== null) {
            console.log(`Server stopped with exit code ${code}`);
        }
    });
    console.log('Server started.');
};
const compileAndRun = () => {
    (0, child_process_1.exec)('tsc', { cwd: (0, path_1.join)(__dirname, '../../') }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error @ compile: ${stderr}`);
        }
        else {
            console.log(stdout);
            runFunctions();
            startServer();
        }
    });
};
(0, fs_1.watch)((0, path_1.join)(__dirname, '../../src'), { recursive: true }, (eventType, filename) => {
    if (filename && ['.ts', '.html', '.css'].includes((0, path_1.extname)(filename))) {
        console.log(`${filename} file changed. Recompiling and restarting server...`);
        compileAndRun();
    }
});
// Initial compile and run
compileAndRun();
