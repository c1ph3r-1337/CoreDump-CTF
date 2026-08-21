from bs4 import BeautifulSoup
import sys

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

scripts = soup.find_all('script')
with open('extracted.js', 'w') as f:
    for s in scripts:
        if s.string:
            f.write(s.string + "\n")
