import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# 1. Add data-diff attributes to the tabs and give them an ID so we can attach listeners easily
old_tabs = """        <div class="tabs-container">
          <div class="category active">EASY</div>
          <div class="category">MEDIUM</div>
          <div class="category">HARD</div>
        </div>"""
new_tabs = """        <div class="tabs-container" id="challengeTabs">
          <div class="category active" data-diff="EASY">EASY</div>
          <div class="category" data-diff="MEDIUM">MEDIUM</div>
          <div class="category" data-diff="HARD">HARD</div>
        </div>"""
content = content.replace(old_tabs, new_tabs)

# 2. Update renderChallenges logic
old_render = """      for (const category of allCategories) {
        if (!currentChallenges[category]) continue;
        const info = currentChallenges[category];
        
        if (catContainer) {
          const div = document.createElement('div');
          div.className = 'challenge-card';
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
          `;
          catContainer.appendChild(div);
        }"""

new_render = """      for (const category of allCategories) {
        if (!currentChallenges[category]) continue;
        const info = currentChallenges[category];
        
        const pts = info.points || 500;
        let diff = 'EASY';
        if (pts > 300 && pts <= 600) diff = 'MEDIUM';
        else if (pts > 600) diff = 'HARD';
        
        if (catContainer) {
          const div = document.createElement('div');
          div.className = 'challenge-card';
          div.setAttribute('data-category', category);
          div.setAttribute('data-points', pts);
          div.setAttribute('data-diff', diff);
          div.innerHTML = `
          <div class="c-dot"></div>
          <div class="c-info">
            <div class="c-title">${category}</div>
            <div class="c-subtitle">CTF // <span>${diff}</span> // ${pts} PTS</div>
          </div>
          <div class="c-solves">${Math.floor(Math.random() * 500 + 100)} SOLVES</div>
          <div class="c-arrow">&gt;</div>
          `;
          catContainer.appendChild(div);
        }"""
content = content.replace(old_render, new_render)

# 3. Add filtering function and listeners
filtering_script = """
    function filterChallenges() {
      const activeTab = document.querySelector('#challengeTabs .category.active');
      if (!activeTab) return;
      const targetDiff = activeTab.getAttribute('data-diff');
      
      document.querySelectorAll('#challengeCategoriesContainer .challenge-card').forEach(card => {
        if (card.getAttribute('data-diff') === targetDiff) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const tabs = document.querySelectorAll('#challengeTabs .category');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          filterChallenges();
        });
      });
    });
"""

# Insert the script block before `function renderChallenges()`
content = content.replace("function renderChallenges() {", filtering_script + "\n    function renderChallenges() {")

# Call filterChallenges at the end of renderChallenges
content = content.replace("fetchMyTeam(); \n    }", "fetchMyTeam();\n      filterChallenges();\n    }")

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
