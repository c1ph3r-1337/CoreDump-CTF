const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

css = css.replace(/#joinTeamMessage, #createTeamMessage \{\n  margin-top: 1\.5rem;\n  padding: 1rem;\n  border-radius: 12px;\n  background: rgba\(245, 158, 11, 0\.1\);\n  border: 1px solid var\(--warning\);\n  color: var\(--warning\);\n  font-weight: 500;\n\}/g,
`#joinTeamMessage, #createTeamMessage {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid var(--warning);
  color: var(--warning);
  font-weight: 500;
}

#joinTeamMessage:empty, #createTeamMessage:empty {
  display: none;
}`);

fs.writeFileSync('private/styles.css', css);
console.log('Fixed message box');
