import re

with open('/home/harry/Projects/ctf/public/styles.css', 'r') as f:
    css = f.read()

# Fix the * block
css = css.replace("""* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rajdhani', 'Share Tech Mono', monospace;

  /* Legacy mappings so rest of CSS doesn't break instantly */
  --primary: var(--accent);
  --primary-dark: var(--accent-bright);
  --background: var(--bg-primary);
  --card-bg: var(--glass-bg);
  --text: var(--text-primary);
  --border: var(--glass-border);
}""", """* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rajdhani', 'Share Tech Mono', monospace;
}""")

# Put it in root
root_end = """  --success: #aeca65;
  --danger: #b86b6b;
}"""

root_new = """  --success: #aeca65;
  --danger: #b86b6b;

  /* Legacy mappings so rest of CSS doesn't break instantly */
  --primary: var(--accent);
  --primary-dark: var(--accent-bright);
  --background: var(--bg-primary);
  --card-bg: var(--glass-bg);
  --text: var(--text-primary);
  --border: var(--glass-border);
}"""

css = css.replace(root_end, root_new)

with open('/home/harry/Projects/ctf/public/styles.css', 'w') as f:
    f.write(css)
