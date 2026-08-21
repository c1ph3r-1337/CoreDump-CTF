import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Change the hardcoded modal subtitle to have IDs
old_sub = '<div class="detail-header-subtitle">\n            CRYPTO // <span>EASY</span> // <span id="modalPoints">200</span> POINTS\n          </div>'
new_sub = '<div class="detail-header-subtitle">\n            CTF // <span id="modalDiff">EASY</span> // <span id="modalPoints">200</span> POINTS\n          </div>'
content = content.replace(old_sub, new_sub)

# Inject JS into click handler
old_js = """            const ptEl = document.getElementById('modalPoints');
            if(ptEl) ptEl.textContent = points;"""
new_js = """            const ptEl = document.getElementById('modalPoints');
            if(ptEl) ptEl.textContent = points;
            const diffEl = document.getElementById('modalDiff');
            if(diffEl) diffEl.textContent = box.getAttribute('data-diff');"""
content = content.replace(old_js, new_js)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
