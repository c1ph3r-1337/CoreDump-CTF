import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Add margin-bottom to tabs div
content = content.replace('<div class="tabs">', '<div class="tabs" style="margin-bottom: 2rem; margin-top: 1rem;">')

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
