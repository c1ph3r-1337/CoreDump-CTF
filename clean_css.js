const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// 1. Double color
css = css.replace(/background: var\(--text\); color: var\(--background\);\n\s+color: var\(--background\);/g, 'background: var(--text);\n  color: var(--background);');

// 2. Borders
css = css.replace('border: none;\n  border-radius: 12px;\n  outline: none;\n  background: transparent;\n  color: var(--text);\n  font-size: 0.95rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n  min-width: 250px;',
`border: 1px solid var(--border);\n  border-radius: 9999px;\n  outline: none;\n  background: transparent;\n  color: var(--text);\n  font-size: 0.95rem;\n  transition: all 0.2s ease;\n  min-width: 250px;`);

css = css.replace('border: none;\n  border-radius: 12px;\n  background: transparent;\n  color: var(--text);\n  font-size: 1rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;',
`border: 1px solid var(--border);\n  border-radius: 9999px;\n  background: transparent;\n  color: var(--text);\n  font-size: 1rem;\n  transition: all 0.2s ease;`);

css = css.replace('display: block;\n  width: 100%;\n  max-width: 400px;\n  margin-bottom: 1rem;',
`display: block;\n  width: 100%;\n  max-width: 400px;\n  margin-bottom: 1rem;\n  border: 1px solid var(--border);\n  border-radius: 9999px;\n  padding: 0.75rem 1rem;\n  background: transparent;\n  color: var(--text);`);

fs.writeFileSync('private/styles.css', css);
console.log('Done cleaning 2');
