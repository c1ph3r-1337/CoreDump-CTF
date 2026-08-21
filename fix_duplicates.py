import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Remove the old challenges section block
content = re.sub(r'<!-- CHALLENGES SECTION -->.*?</section>', '', content, flags=re.DOTALL)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
