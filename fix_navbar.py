import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Replace the nav-right section
old_nav_right = r'<div class="nav-right".*?<a href="/logout".*?</a>\s*</div>'
new_nav_right = """<div class="nav-right" style="display: flex; gap: 2rem; align-items: center;">
      <a href="#" class="nav-link" onclick="showSection('team-section'); return false;" id="teamPageLink">TEAM</a>
      <a href="#" class="nav-link" onclick="showSection('profile-section'); return false;">PROFILE</a>
      <a href="/logout" class="nav-link" style="color: var(--text-muted);">LOGOUT</a>
    </div>"""
content = re.sub(old_nav_right, new_nav_right, content, flags=re.DOTALL)

# Also fix the admin link ID
content = content.replace('id="adminNavBtn"', 'id="adminNavLi"')
content = content.replace('Admin</a>', 'ADMIN PORTAL</a>')

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
