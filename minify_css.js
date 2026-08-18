const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// Remove gradient header
css = css.replace(/background: linear-gradient\(to right, var\(--primary\), var\(--accent\)\);\n\s+-webkit-background-clip: text;\n\s+background-clip: text;\n\s+-webkit-text-fill-color: transparent;/g, '');

// Tabs background fix
css = css.replace(/background: rgba\(11, 18, 34, 0\.6\);/g, 'background: transparent;');

// Navbar active link
css = css.replace(/background: rgba\(36, 103, 234, 0\.1\);/g, 'background: rgba(255, 255, 255, 0.05);');

// Team items and challenge boxes to be extremely flat
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--border);');
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.06\);/g, 'border: 1px solid var(--border);');

fs.writeFileSync('private/styles.css', css);
