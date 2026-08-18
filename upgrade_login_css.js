const fs = require('fs');
let css = fs.readFileSync('public/styles.css', 'utf8');

// 1. Root variables
css = css.replace(/--primary: #2467ea;/g, '--primary: #fafafa;');
css = css.replace(/--primary-dark: #1d54c9;/g, '--primary-dark: #d4d4d8;');
css = css.replace(/--secondary: #7c3aed;/g, '--secondary: #a1a1aa;');
css = css.replace(/--accent: #07b2d5;/g, '--accent: #a1a1aa;');
css = css.replace(/--background: #0B1222;/g, '--background: #09090b;');
css = css.replace(/--background-light: #151F32;/g, '--background-light: #09090b;');
css = css.replace(/--card-bg: #0D1526;/g, '--card-bg: rgba(255, 255, 255, 0.02);');
css = css.replace(/--text: #f8fafc;/g, '--text: #fafafa;');
css = css.replace(/--text-muted: #94a3b8;/g, '--text-muted: #a1a1aa;');
css = css.replace(/--border: rgba\(255, 255, 255, 0\.1\);/g, '--border: rgba(255, 255, 255, 0.06);');

// 2. Body background
css = css.replace(/background: linear-gradient\(135deg, var\(--background\), var\(--background-light\)\);/g, 'background: var(--background);');

// 3. Container
css = css.replace(/background: rgba\(30, 41, 59, 0\.7\);/g, 'background: transparent;');
css = css.replace(/box-shadow: var\(--shadow\);/g, 'box-shadow: none;');

// 4. H2 Gradient removal
css = css.replace(/background: linear-gradient\(to right, var\(--primary\), var\(--accent\)\);\n\s+-webkit-background-clip: text;\n\s+background-clip: text;\n\s+-webkit-text-fill-color: transparent;/g, 'color: var(--text);');

// 5. Input fields
css = css.replace(/background: rgba\(15, 23, 42, 0\.3\);/g, 'background: transparent;');
css = css.replace(/border-radius: 8px;/g, 'border-radius: 9999px;');
css = css.replace(/border: 1px solid var\(--border\);/g, 'border: 1px solid var(--border);'); // keep border

// 6. Buttons
css = css.replace(/\.btn \{[\s\S]*?\}/, `.btn {
  width: 100%;
  padding: 12px 24px;
  background: var(--text);
  color: var(--background);
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}`);

css = css.replace(/\.btn:hover \{[\s\S]*?\}/, `.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}`);

css = css.replace(/\.btn:active \{[\s\S]*?\}/, `.btn:active {
  transform: scale(0.96);
}`);

// 7. Toggle panel
css = css.replace(/\.toggle-container \{[\s\S]*?\}/, `.toggle-container {
  width: 50%;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
  text-align: center;
  transition: 0.6s;
  border-left: 1px solid var(--border);
}`);

css = css.replace(/\.toggle-container h2 \{[\s\S]*?\}/, `.toggle-container h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text);
}`);

css = css.replace(/\.toggle-container p \{[\s\S]*?\}/, `.toggle-container p {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
}`);

css = css.replace(/\.toggle-btn \{[\s\S]*?\}/, `.toggle-btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}`);

css = css.replace(/\.toggle-btn:hover \{[\s\S]*?\}/, `.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}`);

css = css.replace(/\.toggle-btn:active \{[\s\S]*?\}/, `.toggle-btn:active {
  transform: scale(0.96);
}`);

fs.writeFileSync('public/styles.css', css);
console.log('Login theme updated');
