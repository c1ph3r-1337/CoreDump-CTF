const fs = require('fs');
let html = fs.readFileSync('private/dashboard.html', 'utf8');

const badLogic = `          if (data.error) {
            profileDiv.innerHTML = \`
              <div id="displayUsernameContainer" style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <h3 style="font-size: 2rem; margin: 0;" id="displayUsername">\${data.username}</h3>
                <button id="editUsernameBtn" style="padding:0.4rem; border:1px solid var(--border); background:transparent; color:var(--text); border-radius:50%; cursor:pointer; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center;" title="Edit Username">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
              </div>
              <div id="editUsernameForm" style="display: none; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                 <input type="text" id="newUsernameInput" value="\${data.username}" style="padding:0.5rem 1rem; border-radius:9999px; border:1px solid var(--border); background:transparent; color:var(--text); text-align:center;" />
                 <button id="saveUsernameBtn" style="padding:0.5rem 1rem; border:none; background:var(--text); color:var(--background); border-radius:9999px; cursor:pointer;">Save</button>
                 <button id="cancelUsernameBtn" style="padding:0.5rem 1rem; border:1px solid var(--border); background:transparent; color:var(--text-muted); border-radius:9999px; cursor:pointer;">Cancel</button>
              </div>
              <p style="font-size: 1.2rem;">Team: \${teamText}</p>
              <p id="profileMessage" style="margin-top: 1rem; color: var(--warning);"></p>
            \`;

            document.getElementById('editUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsernameContainer').style.display = 'none';
              document.getElementById('editUsernameForm').style.display = 'flex';
            });
            
            document.getElementById('cancelUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsernameContainer').style.display = 'flex';
              document.getElementById('editUsernameForm').style.display = 'none';
              document.getElementById('profileMessage').textContent = '';
            });

            document.getElementById('saveUsernameBtn').addEventListener('click', () => {
              const newUsername = document.getElementById('newUsernameInput').value.trim();
              if(!newUsername) return;
              fetch('/api/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newUsername })
              }).then(res => res.json()).then(resp => {
                if(resp.error) {
                  document.getElementById('profileMessage').textContent = resp.error;
                } else {
                  fetchProfile(); // reload profile
                }
              }).catch(err => console.error(err));
            });
          } else {
            const teamText = data.teamName ? data.teamName : 'No Team';
            profileDiv.innerHTML = \`
              <h3 style="font-size: 2rem; margin-bottom: 1rem;">\${data.username}</h3>
              <p style="font-size: 1.2rem;">Team: \${teamText}</p>
            \`;
          }`;

const goodLogic = `          if (data.error) {
            profileDiv.innerHTML = \`<p style="color:var(--warning);">\${data.error}</p>\`;
          } else {
            const teamText = data.teamName ? data.teamName : 'No Team';
            profileDiv.innerHTML = \`
              <div id="displayUsernameContainer" style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <h3 style="font-size: 2rem; margin: 0;" id="displayUsername">\${data.username}</h3>
                <button id="editUsernameBtn" style="padding:0.4rem; border:1px solid var(--border); background:transparent; color:var(--text); border-radius:50%; cursor:pointer; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center;" title="Edit Username">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
              </div>
              <div id="editUsernameForm" style="display: none; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                 <input type="text" id="newUsernameInput" value="\${data.username}" style="padding:0.5rem 1rem; border-radius:9999px; border:1px solid var(--border); background:transparent; color:var(--text); text-align:center;" />
                 <button id="saveUsernameBtn" style="padding:0.5rem 1rem; border:none; background:var(--text); color:var(--background); border-radius:9999px; cursor:pointer;">Save</button>
                 <button id="cancelUsernameBtn" style="padding:0.5rem 1rem; border:1px solid var(--border); background:transparent; color:var(--text-muted); border-radius:9999px; cursor:pointer;">Cancel</button>
              </div>
              <p style="font-size: 1.2rem;">Team: \${teamText}</p>
              <p id="profileMessage" style="margin-top: 1rem; color: var(--warning);"></p>
            \`;

            document.getElementById('editUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsernameContainer').style.display = 'none';
              document.getElementById('editUsernameForm').style.display = 'flex';
            });
            
            document.getElementById('cancelUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsernameContainer').style.display = 'flex';
              document.getElementById('editUsernameForm').style.display = 'none';
              document.getElementById('profileMessage').textContent = '';
            });

            document.getElementById('saveUsernameBtn').addEventListener('click', () => {
              const newUsername = document.getElementById('newUsernameInput').value.trim();
              if(!newUsername) return;
              fetch('/api/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newUsername })
              }).then(res => res.json()).then(resp => {
                if(resp.error) {
                  document.getElementById('profileMessage').textContent = resp.error;
                } else {
                  fetchProfile(); // reload profile
                }
              }).catch(err => console.error(err));
            });
          }`;

html = html.replace(badLogic, goodLogic);
fs.writeFileSync('private/dashboard.html', html);
console.log('Fixed logic properly');
