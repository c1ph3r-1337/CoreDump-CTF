const fs = require('fs');
let html = fs.readFileSync('private/dashboard.html', 'utf8');

// Replace Profile logic
const profileReplacement = `profileDiv.innerHTML = \`
              <h3 style="font-size: 2rem; margin-bottom: 1rem;" id="displayUsername">\${data.username}</h3>
              <div id="editUsernameForm" style="display: none; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                 <input type="text" id="newUsernameInput" value="\${data.username}" style="padding:0.5rem 1rem; border-radius:9999px; border:1px solid var(--border); background:transparent; color:var(--text); text-align:center;" />
                 <button id="saveUsernameBtn" style="padding:0.5rem 1rem; border:none; background:var(--text); color:var(--background); border-radius:9999px; cursor:pointer;">Save</button>
                 <button id="cancelUsernameBtn" style="padding:0.5rem 1rem; border:1px solid var(--border); background:transparent; color:var(--text-muted); border-radius:9999px; cursor:pointer;">Cancel</button>
              </div>
              <button id="editUsernameBtn" style="padding:0.5rem 1rem; border:1px solid var(--border); background:transparent; color:var(--text); border-radius:9999px; cursor:pointer; margin-bottom:1rem; transition: all 0.2s;">Edit Username</button>
              <p style="font-size: 1.2rem;">Team: \${teamText}</p>
              <p id="profileMessage" style="margin-top: 1rem; color: var(--warning);"></p>
            \`;

            document.getElementById('editUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsername').style.display = 'none';
              document.getElementById('editUsernameBtn').style.display = 'none';
              document.getElementById('editUsernameForm').style.display = 'flex';
            });
            
            document.getElementById('cancelUsernameBtn').addEventListener('click', () => {
              document.getElementById('displayUsername').style.display = 'block';
              document.getElementById('editUsernameBtn').style.display = 'inline-block';
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
                  loadProfile(); // reload profile
                }
              }).catch(err => console.error(err));
            });`;

html = html.replace(/profileDiv\.innerHTML = `[\s\S]*?`;/, profileReplacement);

// Replace Team logic
const teamReplacement = `myTeamInfo.innerHTML = \`
              <div id="displayTeamName" style="font-size: 1.5rem; margin-bottom: 0.5rem;"><strong>\${data.team.teamName}</strong></div>
              <div id="editTeamNameForm" style="display: none; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                 <input type="text" id="newTeamNameInput" value="\${data.team.teamName}" style="padding:0.5rem 1rem; border-radius:9999px; border:1px solid var(--border); background:transparent; color:var(--text); text-align:center;" />
                 <button id="saveTeamNameBtn" style="padding:0.5rem 1rem; border:none; background:var(--text); color:var(--background); border-radius:9999px; cursor:pointer;">Save</button>
                 <button id="cancelTeamNameBtn" style="padding:0.5rem 1rem; border:1px solid var(--border); background:transparent; color:var(--text-muted); border-radius:9999px; cursor:pointer;">Cancel</button>
              </div>
              <button id="editTeamNameBtn" style="padding:0.25rem 0.75rem; border:1px solid var(--border); background:transparent; color:var(--text); border-radius:9999px; cursor:pointer; font-size: 0.85rem; margin-bottom:1rem; transition: all 0.2s;">Edit Team Name</button>
              <br/><span style="font-size: 1.1rem;">Members: \${members}</span><br/><span style="font-size: 1.1rem;">Score: \${data.team.score || 0} pts</span>
              <p id="teamMessage" style="margin-top: 1rem; color: var(--warning);"></p>
            \`;
            
            document.getElementById('editTeamNameBtn').addEventListener('click', () => {
              document.getElementById('displayTeamName').style.display = 'none';
              document.getElementById('editTeamNameBtn').style.display = 'none';
              document.getElementById('editTeamNameForm').style.display = 'flex';
            });
            
            document.getElementById('cancelTeamNameBtn').addEventListener('click', () => {
              document.getElementById('displayTeamName').style.display = 'block';
              document.getElementById('editTeamNameBtn').style.display = 'inline-block';
              document.getElementById('editTeamNameForm').style.display = 'none';
              document.getElementById('teamMessage').textContent = '';
            });

            document.getElementById('saveTeamNameBtn').addEventListener('click', () => {
              const newTeamName = document.getElementById('newTeamNameInput').value.trim();
              if(!newTeamName) return;
              fetch('/api/team/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newTeamName })
              }).then(res => res.json()).then(resp => {
                if(resp.error) {
                  document.getElementById('teamMessage').textContent = resp.error;
                } else {
                  loadMyTeam(); // reload team
                  fetchTeamScores(); // update global standings to reflect new name
                }
              }).catch(err => console.error(err));
            });`;

html = html.replace(/myTeamInfo\.innerHTML = `<strong>\${data\.team\.teamName}<\/strong><br\/>Members: \${members}<br\/>Score: \${data\.team\.score \|\| 0} pts`;/, teamReplacement);

fs.writeFileSync('private/dashboard.html', html);
console.log('HTML fixed');
