import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Edit Navbar TEAM to MY TEAM
content = content.replace('onclick="showSection(\'team-section\'); return false;" id="teamPageLink">TEAM</a>', 'onclick="showSection(\'team-section\'); return false;" id="teamPageLink">MY TEAM</a>')

# Add spacing in team section
# find <section id="myTeamSection">
old_team = '<div id="noTeamActions" style="display: none;">'
new_team = '<div id="noTeamActions" style="display: none; margin-bottom: 2rem;">'
content = content.replace(old_team, new_team)

old_team_sec = '<section id="joinTeamSection" style="display: none;">'
new_team_sec = '<section id="joinTeamSection" style="display: none; margin-top: 2rem;">'
content = content.replace(old_team_sec, new_team_sec)

old_create_sec = '<section id="createTeamSection" style="display: none;">'
new_create_sec = '<section id="createTeamSection" style="display: none; margin-top: 2rem;">'
content = content.replace(old_create_sec, new_create_sec)

# Wipe data button rust color
content = content.replace('var(--warning)', '#b7410e')

# Admin list border white
old_admin = "div.style.cssText = 'display:flex; flex-direction:column; justify-content:space-between; padding:1.25rem; background:var(--card-bg); border:1px solid var(--border); border-radius:16px; min-height: 140px;';"
new_admin = "div.style.cssText = 'display:flex; flex-direction:column; justify-content:space-between; padding:1.25rem; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.6); border-radius:4px; min-height: 140px; box-shadow: inset 0 0 10px rgba(255,255,255,0.05);';"
content = content.replace(old_admin, new_admin)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
