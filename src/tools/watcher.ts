import { exec } from 'child_process';
import { watch } from 'fs';
import { join } from 'path';

const srcDir = join('./', 'src');

const compileAndRun = () => {
  exec('npx tsc && npm run do', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });
};

watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (filename === null) {
  } else {
    if (filename.endsWith('.ts')) {
      console.log(`${filename} file changed. Recompiling and running...`);
      compileAndRun();
    }
  }
});

compileAndRun();
