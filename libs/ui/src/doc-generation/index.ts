import fs from 'fs';
import path from 'path';

const outputDirectory = './src/documentation';

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

export const extractExportedInterfaces = (inputString: string) => {
  const interfaceRegex = /export\s+interface\s+(\w+)\s*(<[^>]+>)?\s*(extends[^{]+)?\s*{([^]*?)};?/gs;

  const commentRegex = /\/\*[\S\s]*?\*\/|\/\/.*/g;
  const cleanSourceCode = inputString.replace(commentRegex, '');
  const exportedInterfaces = [];
  let match = interfaceRegex.exec(cleanSourceCode);

  while (match) {
    const [interfaceContent, name] = match;
    exportedInterfaces.push({ name, interfaceContent });
    match = interfaceRegex.exec(cleanSourceCode);
  }

  return exportedInterfaces;
};

const writeInterfaceToFile = async (filePath: string) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const exportedInterfaces = extractExportedInterfaces(data);

  return Promise.all(
    exportedInterfaces.map(({ name, interfaceContent }) => {
      const docInterface = `
          const ${name} = \`${interfaceContent}\`;
          export { ${name} };
        `;
      const outputFilePath = path.join(outputDirectory, `${name}.documentation.ts`);
      return fs.writeFileSync(outputFilePath, docInterface);
    })
  );
};

const generateIndexFileForDocumentation = () => {
  const documentationFiles = fs.readdirSync(outputDirectory);
  const filesToExport = documentationFiles
    .map((file) => {
      if (file !== 'index.ts') {
        return `export * from './${file.split('.ts')[0]}';`;
      }
      return null;
    })
    .join('\n');
  const exportIndexFile = `
    ${filesToExport}
    `;
  fs.writeFileSync(`${outputDirectory}/index.ts`, exportIndexFile);
};

const findInterfacesInDirectory = (directoryPath: string) => {
  const files = fs.readdirSync(directoryPath);
  const interfaceWritePromises = [];
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findInterfacesInDirectory(filePath);
    } else if (path.extname(file) === '.ts' || path.extname(file) === '.tsx') {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent.includes('interface')) {
        interfaceWritePromises.push(writeInterfaceToFile(filePath));
      }
    }
  }
  Promise.all(interfaceWritePromises)
    .then(() => {
      return generateIndexFileForDocumentation();
    })
    .catch((err) => {
      throw err;
    });
};

findInterfacesInDirectory('src/components');
