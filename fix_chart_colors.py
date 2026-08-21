import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Replace stringToColor
old_color = 'return `hsl(${h}, 70%, 50%)`;'
new_color = 'return `hsla(${h}, 60%, 75%, 0.6)`;'
content = content.replace(old_color, new_color)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
