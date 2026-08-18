const fs = require('fs');
let html = fs.readFileSync('private/dashboard.html', 'utf8');

// Use regex to remove all tab-btn inline styles
html = html.replace(/\s*#scoreboard-section \.tab-btn \{[\s\S]*?\}/g, '');
html = html.replace(/\s*#scoreboard-section \.tab-btn:hover \{[\s\S]*?\}/g, '');
html = html.replace(/\s*#scoreboard-section \.tab-btn\.active \{[\s\S]*?\}/g, '');

fs.writeFileSync('private/dashboard.html', html);
console.log('Tabs fixed');
