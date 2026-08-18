const fs = require('fs');
let css = fs.readFileSync('public/styles.css', 'utf8');

// 1. Force pure dark body background
css = css.replace(/body \{\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: var\(--background\);\n  color: var\(--text\);\n  line-height: 1\.6;\n\}/g, 
`body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #09090b !important;
  color: var(--text);
  line-height: 1.6;
}`);

// 2. Fix panels container
css = css.replace(/\.panels-container \{\n  width: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  transition: 0\.6s;\n  background: linear-gradient\(135deg, var\(--primary\), var\(--secondary\)\);\n  color: var\(--text\);\n\}/g, 
`.panels-container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  transition: 0.6s;
  background: transparent;
  border-left: 1px solid var(--border);
  color: var(--text);
}`);

// 3. Fix the toggle buttons inside the panels to be white-on-black or outline
css = css.replace(/\.panels-container \.btn\.transparent \{\n  background: none;\n  border: 2px solid var\(--text\);\n  color: var\(--text\);\n  padding: 10px 20px;\n  border-radius: 9999px;\n  cursor: pointer;\n  transition: 0\.3s;\n  font-weight: 500;\n\}/g,
`.panels-container .btn.transparent {
  background: var(--text);
  border: none;
  color: var(--background);
  padding: 12px 24px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
}`);

css = css.replace(/\.panels-container \.btn\.transparent:hover \{\n  background: rgba\(255, 255, 255, 0\.1\);\n\}/g,
`.panels-container .btn.transparent:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}`);

fs.writeFileSync('public/styles.css', css);
console.log('Panels fixed');
