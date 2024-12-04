const fs = require('fs');
const path = require('path');

const sourceDir = './src';
const targetDir = './dist';
const excludeDirs = ['excludeDir1', 'excludeDir2'];
const cacheFile = './dump/copy.json';

let cache = {};
if (fs.existsSync(cacheFile)) {
  cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
}

const copyFiles = (src, dest) => {
  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      if (!excludeDirs.includes(file)) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath);
        }
        copyFiles(srcPath, destPath);
      }
    } else if (file.endsWith('.css') || file.endsWith('.html')) {
      const fileStat = fs.statSync(srcPath);
      const lastModified = fileStat.mtimeMs;

      if (cache[srcPath] !== lastModified) {
        fs.copyFileSync(srcPath, destPath);
        cache[srcPath] = lastModified;
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
  });
};

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

copyFiles(sourceDir, targetDir);

fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));

console.log('Files copied successfully!');
