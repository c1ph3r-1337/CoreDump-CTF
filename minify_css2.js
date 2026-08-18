const fs = require('fs');
let css = fs.readFileSync('private/styles.css', 'utf8');

css = css.replace(/background: rgba\(11, 18, 34, 0\.6\);/g, 'background: transparent; border: 1px solid var(--border);');
css = css.replace(/background: rgba\(11, 18, 34, 0\.4\);/g, 'background: transparent; border: 1px solid var(--border);');
css = css.replace(/background: var\(--background-light\);/g, 'background: transparent;');
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--border);');

// Fix input borders
css = css.replace(/border: none;\n  border-radius: 8px;\n  background: rgba\(11, 18, 34, 0\.4\);/g, 'border: 1px solid var(--border);\n  border-radius: 8px;\n  background: transparent;');

// Fix button box shadows
css = css.replace(/box-shadow: 0 4px 12px rgba\(36, 103, 234, 0\.3\);/g, 'box-shadow: none;');

fs.writeFileSync('private/styles.css', css);
