const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

// Center My Team Section
css = css.replace(/#myTeamSection \{\n  margin-bottom: 2\.5rem;\n  text-align: left;\n\}/g,
`#myTeamSection {
  margin-bottom: 2.5rem;
  text-align: center;
}`);

css = css.replace(/#myTeamSection h2::after \{\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 50%;/g,
`#myTeamSection h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;`);

css = css.replace(/#noTeamActions \{\n  margin-top: 1\.5rem;\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n\}/g,
`#noTeamActions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}`);

// Center Join/Create Forms
css = css.replace(/#joinTeamSection, #createTeamSection \{\n  margin: 2rem 0;\n  padding: 2rem;\n  background: transparent;\n  border-radius: 12px;\n  border: 1px solid var\(--border\);\n  text-align: left;/g,
`#joinTeamSection, #createTeamSection {
  margin: 2rem 0;
  padding: 2rem;
  background: transparent;
  border-radius: 12px;
  border: 1px solid var(--border);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;`);

css = css.replace(/#joinTeamSection h3::after, #createTeamSection h3::after \{\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 50%;/g,
`#joinTeamSection h3::after, #createTeamSection h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;`);

// Fix buttons centering in forms
css = css.replace(/#joinTeamSection button, #createTeamSection button \{\n  margin-right: 1rem;\n  margin-bottom: 1rem;\n\}/g,
`#joinTeamSection button, #createTeamSection button {
  margin: 0.5rem;
}`);

fs.writeFileSync('private/styles.css', css);

// Fix HTML text
let html = fs.readFileSync('private/dashboard.html', 'utf8');
html = html.replace(/<h1>CTUniversity CTF - My Team<\/h1>/g, '<h1>Core Dump 2.0 - My Team</h1>');
fs.writeFileSync('private/dashboard.html', html);

console.log('Team section centered');
