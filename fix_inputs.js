const fs = require('fs');
let css = fs.readFileSync('public/styles.css', 'utf8');

css = css.replace(/\.input-field \{\n  width: 100%;\n  background: transparent;\n  padding: 12px 16px;\n  border-radius: 9999px;\n  border: 1px solid var\(--border\);\n  transition: border-color 0\.2s ease, box-shadow 0\.2s ease;\n\}/g,
`.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  padding: 12px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}`);

fs.writeFileSync('public/styles.css', css);
console.log('Inputs fixed');
