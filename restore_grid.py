import re

grid_html = """
  <!-- CHALLENGES SECTION -->
  <section id="challenges-section" class="info-section" style="display: none; padding-top: 30px;">
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

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

content = content.replace("<!-- USERS SECTION -->", grid_html + "\n\n<!-- USERS SECTION -->")

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
