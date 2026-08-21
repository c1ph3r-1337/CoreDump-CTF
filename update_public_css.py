import re

with open('/home/harry/Projects/ctf/public/styles.css', 'r') as f:
    css = f.read()

# Add legacy mappings to :root
root_mappings = """
  /* Legacy mappings so rest of CSS doesn't break instantly */
  --primary: var(--accent);
  --primary-dark: var(--accent-bright);
  --background: var(--bg-primary);
  --card-bg: var(--glass-bg);
  --text: var(--text-primary);
  --border: var(--glass-border);
}"""
css = css.replace('}', root_mappings, 1)

# Update .container to match .glass-panel
container_css = """/* Container for toggling Sign In / Sign Up */
.container {
  display: flex;
  width: 900px;
  height: 600px;
  background: rgba(13, 17, 18, 0.62);
  backdrop-filter: blur(14px) saturate(75%);
  -webkit-backdrop-filter: blur(14px) saturate(75%);
  border: 1px solid rgba(190, 200, 195, 0.13);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.025);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: 0.6s ease-in-out;
}"""
css = re.sub(r'/\* Container for toggling Sign In / Sign Up \*/.*?\}', container_css, css, flags=re.DOTALL)

# Update .input-field input
input_css = """.input-field {
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  background: rgba(5, 8, 9, 0.55);
  border: 1px solid rgba(180,190,185,0.16);
  color: #dce0dc;
  backdrop-filter: blur(8px);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}"""
css = re.sub(r'\.input-field \{.*?\}', input_css, css, flags=re.DOTALL)

# Update focus
input_focus_css = """.input-field:focus-within {
  border-color: rgba(180,200,106,0.45);
  outline: none;
  box-shadow: 0 0 0 1px rgba(180,200,106,0.08);
}"""
css = re.sub(r'\.input-field:focus-within \{.*?\}', input_focus_css, css, flags=re.DOTALL)

# Update buttons
btn_css = """.btn {
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  background: rgba(180, 200, 106, 0.10);
  border: 1px solid rgba(180, 200, 106, 0.35);
  color: #b8ca72;
  transition: all 0.2s ease;
}

.btn:hover {
  background: rgba(180, 200, 106, 0.17);
  border-color: rgba(200, 220, 120, 0.55);
  box-shadow: 0 0 20px rgba(180, 200, 106, 0.08);
}

.btn:active {
  transform: scale(0.96);
}"""
css = re.sub(r'/\* Buttons \*/.*?\.btn:active \{.*?\}', '/* Buttons */\n' + btn_css, css, flags=re.DOTALL)

with open('/home/harry/Projects/ctf/public/styles.css', 'w') as f:
    f.write(css)
