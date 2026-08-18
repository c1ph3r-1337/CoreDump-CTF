const fs = require('fs');
let css = fs.readFileSync('public/styles.css', 'utf8');

css = css.replace(/\.container\.sign-up-mode \.panels-container \{\n  order: 1;\n\}/g,
`.container.sign-up-mode .panels-container {
  order: 1;
  border-left: none;
  border-right: 1px solid var(--border);
}`);

fs.writeFileSync('public/styles.css', css);
console.log('Fixed divider');
