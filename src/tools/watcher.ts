import { exec } from 'child_process';
import { watch } from 'fs';
import { join, extname } from 'path';

const script = 'npm run dev';

const runScript = () => {
  exec(script, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(`Output: ${stdout}`);
    }
  });
};

watch(join('./src'), { recursive: true }, (eventType, filename) => {
  if (filename && ['.ts', '.html', '.css'].includes(extname(filename))) {
    console.log(`${filename} file changed. Running script...`);
    runScript();
  }
});

runScript();
