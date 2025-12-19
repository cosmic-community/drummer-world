const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const outDir = path.join(process.cwd(), '.next', 'server', 'app');
  
  if (!fs.existsSync(outDir)) {
    console.log('Build output directory not found. Skipping console capture injection.');
    return;
  }

  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (!content.includes('dashboard-console-capture.js') && content.includes('</head>')) {
          content = content.replace('</head>', `${scriptTag}</head>`);
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Injected console capture into: ${filePath}`);
        }
      }
    });
  }
  
  processDirectory(outDir);
  console.log('Console capture script injection complete.');
}

injectConsoleCapture();