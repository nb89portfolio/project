import { readdir, copyFile, mkdir } from 'fs';
import { join, extname } from 'path';

const srcDir = './src';
const destDir = './dev';

const copyFiles = (src: string, dest: string) => {
  readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const srcPath = join(src, file.name);
      const destPath = join(dest, file.name);

      if (file.isDirectory()) {
        mkdir(destPath, { recursive: true }, (err) => {
          if (err) {
            console.error(`Error creating directory: ${err.message}`);
            return;
          }
          copyFiles(srcPath, destPath);
        });
      } else if (
        extname(file.name) === '.html' ||
        extname(file.name) === '.css'
      ) {
        copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.error(`Error copying file: ${err.message}`);
          } else {
            console.log(`Copied: ${srcPath} to ${destPath}`);
          }
        });
      }
    });
  });
};

mkdir(destDir, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error creating destination directory: ${err.message}`);
    return;
  }
  copyFiles(srcDir, destDir);
});
