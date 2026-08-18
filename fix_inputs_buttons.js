const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// 1. Fix missing borders on all inputs
css = css.replace(/#joinTeamSection input, #createTeamSection input \{\n  display: block;\n  width: 100%;\n  max-width: 400px;\n  margin-bottom: 1rem;\n\}/g, 
`#joinTeamSection input, #createTeamSection input {
  display: block;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
  background: transparent;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  color: var(--text);
}`);

css = css.replace(/\.modal-content input \{\n  width: 100%;\n  padding: 0\.75rem 1rem;\n  margin-bottom: 1\.5rem;\n  border: none;\n  border-radius: 12px;\n  background: transparent;\n  color: var\(--text\);\n  font-size: 1rem;\n  transition: border-color 0\.2s ease, box-shadow 0\.2s ease;\n\}/g, 
`.modal-content input {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 9999px;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  transition: all 0.2s ease;
}`);

css = css.replace(/\.users-search input, \.teams-search input \{\n  flex: 1;\n  min-width: 250px;\n\}/g, 
`.users-search input, .teams-search input {
  flex: 1;
  min-width: 250px;
  border: 1px solid var(--border);
  background: transparent;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  color: var(--text);
}`);

// 2. Fix buttons text colors
// Remove duplicated color assignments
css = css.replace(/background: var\(--text\); color: var\(--background\);\n  color: var\(--background\);/g, 'background: var(--text);\n  color: var(--background);');

css = css.replace(/\.modal-content button:hover \{ \n  background: var\(--primary-dark\);\n  transform: translateY\(-1px\);\n\}/g, 
`.modal-content button:hover {
  background: var(--primary-dark);
}`);

fs.writeFileSync('private/styles.css', css);
console.log('Fixed inputs and buttons');
