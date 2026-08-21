with open('/home/harry/Projects/ctf/private/dashboard.html.bak', 'r') as f:
    text = f.read()

start = text.find('<body>')
end = text.find('<!-- USERS SECTION -->')
if start != -1 and end != -1:
    print(text[start:end])
