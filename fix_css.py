with open('/home/harry/Projects/ctf/private/styles.css', 'r') as f:
    content = f.read()

content = content.replace('margin-top: 15px;', 'margin-top: 30px;')

with open('/home/harry/Projects/ctf/private/styles.css', 'w') as f:
    f.write(content)
