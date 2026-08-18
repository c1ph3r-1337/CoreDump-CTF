const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// Replace weird duplications
css = css.replace(/background: var\(--text\); color: var\(--background\);\n  color: var\(--background\);/g, 'background: var(--text);\n  color: var(--background);');

fs.writeFileSync('private/styles.css', css);
