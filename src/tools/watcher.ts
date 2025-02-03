import { spawn, exec, ChildProcess } from 'child_process';
import { watch } from 'fs';
import { join, extname } from 'path';

let server: ChildProcess | null = null;

const runFunctions = () => {
  exec('node ./dev/tools/copyFiles.js');
  exec('node ./dev/server/server.js');
};

const startServer = () => {
  if (server) {
    server.kill();
  }

  server = spawn('node', [join(__dirname, '../../dist/server/server.js')], {
    stdio: 'inherit',
  });

  server.on('close', (code) => {
    if (code !== null) {
      console.log(`Server stopped with exit code ${code}`);
    }
  });
};

const compileAndRun = () => {
  exec('tsc', { cwd: join(__dirname, '../../') }, (err, stdout, stderr) => {
    if (err) {
    } else {
      runFunctions();
      startServer();
    }
  });
};

watch(
  join(__dirname, '../../src'),
  { recursive: true },
  (eventType, filename) => {
    if (filename && ['.ts', '.html', '.css'].includes(extname(filename))) {
      console.log(
        `${filename} file changed. Recompiling and restarting server...`
      );
      compileAndRun();
    }
  }
);

// Initial compile and run
compileAndRun();
