with open('/home/harry/Projects/ctf/private/styles.css', 'r') as f:
    content = f.read()

# Add blur to user/team items
old_user_team = """.user-item, .team-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);"""
new_user_team = """.user-item, .team-item {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);"""
content = content.replace(old_user_team, new_user_team)

# Add blur to standings
old_standing = """.standing-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);"""
new_standing = """.standing-item {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);"""
content = content.replace(old_standing, new_standing)

with open('/home/harry/Projects/ctf/private/styles.css', 'w') as f:
    f.write(content)
