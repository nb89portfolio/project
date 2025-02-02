"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const script = 'npm run dev';
const runScript = () => {
    (0, child_process_1.exec)(script, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
        }
        else {
            console.log(`Output: ${stdout}`);
        }
    });
};
(0, fs_1.watch)((0, path_1.join)('./src'), { recursive: true }, (eventType, filename) => {
    if (filename && ['.ts', '.html', '.css'].includes((0, path_1.extname)(filename))) {
        console.log(`${filename} file changed. Running script...`);
        runScript();
    }
});
runScript();
