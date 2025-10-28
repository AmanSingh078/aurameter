const fs = require('fs');
const path = require('path');

// Check if .next directory exists
const nextDir = path.join(__dirname, '.next');
console.log('.next directory exists:', fs.existsSync(nextDir));

if (fs.existsSync(nextDir)) {
  // Check if routes-manifest.json exists
  const routesManifest = path.join(nextDir, 'routes-manifest.json');
  console.log('routes-manifest.json exists:', fs.existsSync(routesManifest));
  
  // List files in .next directory
  const files = fs.readdirSync(nextDir);
  console.log('.next directory contents:', files);
  
  // Check server directory
  const serverDir = path.join(nextDir, 'server');
  if (fs.existsSync(serverDir)) {
    const serverFiles = fs.readdirSync(serverDir);
    console.log('server directory contents:', serverFiles);
  } else {
    console.log('server directory does not exist');
  }
} else {
  console.log('.next directory does not exist');
}