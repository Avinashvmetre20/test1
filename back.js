const fs = require('fs');
const path = require('path');

function backupFile(filePath) {
  try {
    const { dir, name, ext } = path.parse(filePath);
    console.log(filePath)
    const now = new Date();
    const timestamp = now.toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '');
    // console.log(now,timestamp)
    const backupName = `${name}_${timestamp}${ext}`;
    const backupPath = path.join(dir, backupName);
    fs.copyFileSync(filePath, backupPath);

    console.log(` Backup created: ${backupPath}`);
    return backupPath;
  } catch (err) {
    console.error(' Error creating backup:', err.message);
  }
}

backupFile('./size.js')