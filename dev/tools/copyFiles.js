"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const srcDir = './src';
const destDir = './dev';
const copyFiles = (src, dest) => {
    (0, fs_1.readdir)(src, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }
        files.forEach((file) => {
            const srcPath = (0, path_1.join)(src, file.name);
            const destPath = (0, path_1.join)(dest, file.name);
            if (file.isDirectory()) {
                (0, fs_1.mkdir)(destPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Error creating directory: ${err.message}`);
                        return;
                    }
                    copyFiles(srcPath, destPath);
                });
            }
            else if ((0, path_1.extname)(file.name) === '.html' ||
                (0, path_1.extname)(file.name) === '.css') {
                (0, fs_1.copyFile)(srcPath, destPath, (err) => {
                    if (err) {
                        console.error(`Error copying file: ${err.message}`);
                    }
                    else {
                        console.log(`Copied: ${srcPath} to ${destPath}`);
                    }
                });
            }
        });
    });
};
(0, fs_1.mkdir)(destDir, { recursive: true }, (err) => {
    if (err) {
        console.error(`Error creating destination directory: ${err.message}`);
        return;
    }
    copyFiles(srcDir, destDir);
});
