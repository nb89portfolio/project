"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const srcDir = (0, path_1.join)('./', 'src');
const compileAndRun = () => {
    (0, child_process_1.exec)('npx tsc && npm run do', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
        }
        else {
            console.log(stdout);
        }
    });
};
(0, fs_1.watch)(srcDir, { recursive: true }, (eventType, filename) => {
    if (filename === null) {
    }
    else {
        if (filename.endsWith('.ts')) {
            console.log(`${filename} file changed. Recompiling and running...`);
            compileAndRun();
        }
    }
});
compileAndRun();
