const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'assets/hex-pack/PNG/Objects');
const outputPath = path.join(__dirname, 'assetsList.json');

function listFiles(dirPath) {
  const filesList = [];
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      filesList.push(...listFiles(filePath));
    } else {
      filesList.push(filePath.replace(__dirname, ''));
    }
  });
  return filesList;
}

const filesList = listFiles(directoryPath);
fs.writeFileSync(outputPath, JSON.stringify(filesList, null, 2));
console.log('Assets list generated:', filesList);
