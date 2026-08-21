with open('/home/harry/Projects/ctf/private/styles.css', 'r') as f:
    content = f.read()

old_input = """.info-section input[type="text"],
.info-section input[type="password"] {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);"""
new_input = """.info-section input[type="text"],
.info-section input[type="password"] {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);"""
content = content.replace(old_input, new_input)

old_btn = """.info-section button {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);"""
new_btn = """.info-section button {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);"""
content = content.replace(old_btn, new_btn)

with open('/home/harry/Projects/ctf/private/styles.css', 'w') as f:
    f.write(content)
