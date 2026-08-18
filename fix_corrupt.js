const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

css = css.replace('.users-search label, .teams-search label {\n#createTeamName:focus, #createTeamPassword:focus {', 
`.users-search label, .teams-search label {
  color: var(--text);
  font-weight: 500;
  font-size: 1rem;
}

.users-search input, .teams-search input,
#joinTeamName, #joinTeamPassword, 
#createTeamName, #createTeamPassword {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 9999px;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  min-width: 250px;
}

.users-search input:focus, .teams-search input:focus,
#joinTeamName:focus, #joinTeamPassword:focus,
#createTeamName:focus, #createTeamPassword:focus {`);

fs.writeFileSync('private/styles.css', css);
