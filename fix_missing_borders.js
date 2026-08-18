const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// Add border to info-section
css = css.replace(/\.info-section \{[\s\S]*?border: none;\n\}/, 
`.info-section {
  background: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin: 2rem auto;
  max-width: 1100px;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: none;
  border: 1px solid var(--border);
}`);

// Add border to modal
css = css.replace(/\.modal-content \{[\s\S]*?border: none;/, 
`.modal-content {
  background: var(--card-bg);
  margin: 10% auto;
  padding: 2rem;
  border: 1px solid var(--border);`);

// Standardize hardcoded borders
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--border);');

fs.writeFileSync('private/styles.css', css);

let html = fs.readFileSync('private/dashboard.html', 'utf8');
html = html.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--border);');
fs.writeFileSync('private/dashboard.html', html);

console.log('Borders applied');
