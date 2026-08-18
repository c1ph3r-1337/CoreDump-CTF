const fs = require('fs');
let html = fs.readFileSync('private/dashboard.html', 'utf8');

html = html.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--border);');
html = html.replace(/border: 1px solid rgba\(255, 255, 255, 0\.12\);/g, 'border: 1px solid var(--border);');
html = html.replace(/background: rgba\(11, 18, 34, 0\.6\);/g, 'background: transparent;');
html = html.replace(/background: rgba\(11, 18, 34, 0\.4\);/g, 'background: transparent;');
html = html.replace(/box-shadow: 0 4px 12px rgba\(0, 0, 0, 0\.2\);/g, 'box-shadow: none;');

fs.writeFileSync('private/dashboard.html', html);
