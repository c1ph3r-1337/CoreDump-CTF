import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

new_js = """div.className = 'challenge-card';
          div.setAttribute('data-category', category);
          div.setAttribute('data-points', info.points || 500);
          div.innerHTML = `
          <div class="c-dot"></div>
          <div class="c-info">
            <div class="c-title">${category}</div>
            <div class="c-subtitle">CRYPTO // <span>EASY</span> // ${info.points || 500} PTS</div>
          </div>
          <div class="c-solves">${Math.floor(Math.random() * 500 + 100)} SOLVES</div>
          <div class="c-arrow">&gt;</div>
          `;"""

content = re.sub(r"div\.className = 'challenge-box';\s*div\.setAttribute\('data-category', category\);\s*div\.innerHTML = `<div.*?pts</div>`;", new_js, content)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
