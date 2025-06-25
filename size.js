const fs = require('fs');
const path = require('path');

function calculateDirSize(dirPath) {
  let totalSize = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
    //   console.log("aa",dirPath)
    if (entry.isDirectory()) {
      totalSize += calculateDirSize(fullPath);
    } else if (entry.isFile()) {
      const stats = fs.statSync(fullPath);
      totalSize += stats.size;

    }
  }
  console.log("size",totalSize);
}
calculateDirSize("../test1");
