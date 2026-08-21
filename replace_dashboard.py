import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# We will replace everything from <body> to <!-- MAIN SCRIPT -->
new_body = """<body>
  <!-- HUD Decorators -->
  <div class="hud-corner hud-tl">SECTOR 7G</div>
  <div class="hud-corner hud-tr">LAT 28.6139° N<br>LON 77.2090° E</div>
  <div class="hud-corner hud-bl">SYS: SECURE CONNECTION<br>VER: 1.07.3</div>
  <div class="hud-corner hud-br">GRID<br>X-07</div>
  
  <div class="hud-bracket bracket-tl"></div>
  <div class="hud-bracket bracket-tr"></div>
  <div class="hud-bracket bracket-bl"></div>
  <div class="hud-bracket bracket-br"></div>

  <!-- 8. Header -->
  <nav class="header">
    <div class="nav-brand">CoreDump 2.0</div>
    <div class="nav-center">
      <a href="#" class="nav-link active" onclick="showSection('dashboard-content'); return false;">Dashboard</a>
      <a href="#" class="nav-link" onclick="showSection('users-section'); return false;">Users</a>
      <a href="#" class="nav-link" onclick="showSection('teams-section'); return false;">Teams</a>
      <a href="#" class="nav-link" onclick="showSection('scoreboard-section'); return false;">Scoreboard</a>
      <a href="#" class="nav-link" onclick="showSection('dashboard-content'); return false;">Challenges</a>
      <a href="#" class="nav-link" onclick="showSection('admin-section'); return false;" id="adminNavBtn" style="display:none;">Admin</a>
    </div>
    <div class="nav-right">
      <div style="display: flex; align-items: center;"><span class="status-dot"></span> STATUS: ONLINE</div>
      <div id="userProfileName" style="margin-left: -15px;">USER: HARNOOR</div>
      <a href="/logout">LOGOUT</a>
    </div>
  </nav>

  <!-- DASHBOARD CONTENT (Hero + Grid) -->
  <section id="dashboard-content" style="display: block; padding-top: 30px;">
    
    <div style="text-align: center;">
      <h1 class="main-title">CYBER OPERATIONS</h1>
      <p class="subtitle">CAPTURE THE FLAG // <span class="active-operation">ACTIVE OPERATION</span></p>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value">24</div>
        <div class="stat-label">CHALLENGES</div>
      </div>
      <div class="stat-card divider">
        <div class="stat-value">1,240</div>
        <div class="stat-label">OPERATORS</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">18,450</div>
        <div class="stat-label">POINTS</div>
      </div>
    </div>

    <div class="layout-grid">
      
      <!-- LEFT PANEL -->
      <div class="glass-panel" style="padding: 30px 40px;">
        <h3 class="subtitle" style="color: var(--accent); margin-bottom: 30px;">CHALLENGES</h3>
        <div class="tabs-container">
          <div class="category active">EASY</div>
          <div class="category">MEDIUM</div>
          <div class="category">HARD</div>
        </div>
        <div class="challenges-list" id="challengeCategoriesContainer">
          <!-- JS will populate here -->
        </div>
      </div>

      <!-- RIGHT PANEL (MODAL) -->
      <div class="challenge-details" id="challengeModal" style="display: none;">
        <button class="close-btn" onclick="document.getElementById('challengeModal').style.display='none'">&times;</button>
        
        <div class="detail-header">
          <div class="detail-header-title">
            <span class="c-dot"></span>
            <span id="modalTitle" style="text-transform: uppercase;">RSA STARTER</span>
          </div>
          <div class="detail-header-subtitle">
            CRYPTO // <span>EASY</span> // <span id="modalPoints">200</span> POINTS
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            INTELLIGENCE
          </div>
          <div class="detail-text" id="challengeDescription">
            I found an interesting RSA implementation. Can you break it and retrieve the flag?
          </div>
        </div>

        <div class="detail-section" id="hintSection">
          <div class="detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            HINT
          </div>
          <div class="detail-text">
            Look into small public exponents.
          </div>
        </div>

        <div class="detail-section" id="resourceContainer" style="display: none;">
          <div class="detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            ATTACHMENTS
          </div>
          <div class="attachment-row">
            <div class="att-name">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              <span id="attachmentName">crypto.zip</span>
            </div>
            <div class="att-meta">
              3.4 KB
              <a id="downloadResourceBtn" href="#" download>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="detail-section" style="margin-bottom: 0;">
          <label class="input-label">FLAG SUBMISSION</label>
          <input type="text" id="flagInput" class="flag-input" placeholder="CTF{________________________________}">
          <button id="submitFlagBtn" class="submit-button">[ SUBMIT FLAG ]</button>
          <p id="flagResult" style="margin-top: 15px; font-family: 'JetBrains Mono', monospace; font-size: 13px;"></p>
        </div>
      </div>
    </div>
  </section>

"""

# Extract the rest of the body (users-section, teams-section, etc.)
# We will find where `<!-- USERS SECTION -->` starts and keep that.
match = re.search(r'(<!-- USERS SECTION -->.*?)<!-- MAIN SCRIPT -->', content, re.DOTALL)
if match:
    old_sections = match.group(1)
else:
    print("Failed to find USERS SECTION")
    old_sections = ""

# Now replace the JS `box.innerHTML = ...` inside fetchChallenges()
js_match = re.search(r'box\.innerHTML = `(.*?)`;', content, re.DOTALL)
if js_match:
    new_js = """box.className = 'challenge-card';
        box.dataset.category = category;
        box.dataset.points = info.points || 500;
        box.innerHTML = `
          <div class="c-dot"></div>
          <div class="c-info">
            <div class="c-title">${category}</div>
            <div class="c-subtitle">CRYPTO // <span>EASY</span> // ${info.points || 500} PTS</div>
          </div>
          <div class="c-solves">${Math.floor(Math.random() * 500 + 100)} SOLVES</div>
          <div class="c-arrow">&gt;</div>
        `;"""
    content = re.sub(r'box\.className = \'challenge-box.*?box\.innerHTML = `.*?`;', new_js, content, flags=re.DOTALL)

# Also update the click handler to update modal points
click_handler_new = """currentCategory = box.getAttribute('data-category');
            modalTitle.textContent = currentCategory;
            const points = box.getAttribute('data-points');
            const ptEl = document.getElementById('modalPoints');
            if(ptEl) ptEl.textContent = points;
"""
content = re.sub(r"currentCategory = box\.getAttribute\('data-category'\);\s*modalTitle\.textContent = currentCategory \+ ' Challenge';", click_handler_new, content)

# Modify attachment name
attach_new = """resContainer.style.display = 'block';
              dlBtn.href = '/downloads/' + currentChallenges[currentCategory].resource;
              const fName = currentChallenges[currentCategory].originalResourceName || currentChallenges[currentCategory].resource;
              dlBtn.setAttribute('download', fName);
              const attName = document.getElementById('attachmentName');
              if(attName) attName.textContent = fName;"""
content = re.sub(r"resContainer\.style\.display = 'block';\s*dlBtn\.href = '/downloads/' \+ currentChallenges\[currentCategory\]\.resource;\s*dlBtn\.setAttribute\('download', currentChallenges\[currentCategory\]\.originalResourceName \|\| currentChallenges\[currentCategory\]\.resource\);", attach_new, content)

# Re-assemble
final_content = content[:content.find('<body>')] + new_body + old_sections + "\n  <!-- MAIN SCRIPT -->\n" + content[content.find('  <script>'):]

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(final_content)

