import * as fs from 'fs';
import * as path from 'path';

// Simple JSX parser
function parseJSX(code: string): string {
  return code
    .replace(/<([a-zA-Z]+)>(.*?)<\/\1>/g, (match, p1, p2) => {
      return `React.createElement("${p1}", null, "${p2}")`;
    })
    .replace(/<([a-zA-Z]+)\s+([^>]+)>(.*?)<\/\1>/g, (match, p1, p2, p3) => {
      const props = p2
        .split(/\s+/)
        .map((prop: { split: (arg0: string) => [any, any] }) => {
          const [key, value] = prop.split('=');
          return `${key}: ${value.replace(/"/g, '')}`;
        })
        .join(', ');
      return `React.createElement("${p1}", { ${props} }, "${p3}")`;
    });
}

// Read JSX file
function readJSXFile(filePath: string): string | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    return null;
  }
}

// Example usage
const jsxFilePath = path.join(__dirname, 'App.jsx');
const jsxCode = readJSXFile(jsxFilePath);

if (jsxCode) {
  const parsedCode = parseJSX(jsxCode);
  console.log(parsedCode);
}

export { parseJSX, readJSXFile };
