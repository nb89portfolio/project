import fs from 'fs';
import path from 'path';

var cacheFilePath = path.join('build', 'cache', 'copy.json');

function loadCache() {
  if (fs.existsSync(cacheFilePath)) {
    var data = fs.readFileSync(cacheFilePath, 'utf-8');
    var cache = JSON.parse(data);
    for (var key in cache) {
      cache[key] = Buffer.from(cache[key].data);
    }
    return cache;
  }
  return {};
}

function saveCache(cache) {
  var cacheToSave = {};
  for (var key in cache) {
    cacheToSave[key] = { data: Array.from(cache[key]) };
  }
  fs.writeFileSync(cacheFilePath, JSON.stringify(cacheToSave, null, 2));
}

function copyFile(src, dest, cache) {
  try {
    if (cache[src]) {
      console.log('Using cached version of ' + src);
      fs.writeFileSync(dest, cache[src]);
    } else {
      var data = fs.readFileSync(src);
      cache[src] = data;
      fs.writeFileSync(dest, data);
    }
  } catch (error) {
    console.error('Error copying file:', error);
  }
}

function copyFilesRecursively(srcDir, destDir, cache) {
  try {
    var files = fs.readdirSync(srcDir);

    files.forEach(function (file) {
      var srcFile = path.join(srcDir, file);
      var destFile = path.join(destDir, file);
      var stat = fs.statSync(srcFile);

      if (stat.isDirectory()) {
        if (!fs.existsSync(destFile)) {
          fs.mkdirSync(destFile);
        }
        copyFilesRecursively(srcFile, destFile, cache);
      } else if (
        path.extname(file) === '.html' ||
        path.extname(file) === '.css'
      ) {
        copyFile(srcFile, destFile, cache);
        console.log(file + ' copied to ' + destDir);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

function copyFiles(srcDir, destDir) {
  var cache = loadCache();
  copyFilesRecursively(srcDir, destDir, cache);
  saveCache(cache);
}

copyFiles('src', path.join('build', 'output'));
console.log('Files copied successfully.');
