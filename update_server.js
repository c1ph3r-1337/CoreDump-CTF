const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const updateEndpoints = `
// Update Username Endpoint
app.post('/api/profile/update', authenticateToken, (req, res) => {
  const { newUsername } = req.body;
  if (!newUsername || newUsername.trim() === '') {
    return res.status(400).json({ error: 'Username cannot be empty.' });
  }
  let users = loadData(usersFilePath);
  
  // Check if username is already taken
  if (users.find(u => u.username.toLowerCase() === newUsername.trim().toLowerCase() && u.id !== req.user.id)) {
    return res.status(400).json({ error: 'Username already taken.' });
  }

  const userIndex = users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found.' });

  users[userIndex].username = newUsername.trim();
  saveData(usersFilePath, users);
  res.json({ message: 'Username updated successfully.', username: users[userIndex].username });
});

// Update Team Name Endpoint
app.post('/api/team/update', authenticateToken, (req, res) => {
  const { newTeamName } = req.body;
  if (!newTeamName || newTeamName.trim() === '') {
    return res.status(400).json({ error: 'Team name cannot be empty.' });
  }

  let users = loadData(usersFilePath);
  const currentUser = users.find(u => u.id === req.user.id);
  if (!currentUser || !currentUser.teamId) {
    return res.status(400).json({ error: 'You are not in a team.' });
  }

  let teams = loadData(teamsFilePath);
  // Check if team name is already taken
  if (teams.find(t => t.teamName.toLowerCase() === newTeamName.trim().toLowerCase() && t.id !== currentUser.teamId)) {
    return res.status(400).json({ error: 'Team name already taken.' });
  }

  const teamIndex = teams.findIndex(t => t.id === currentUser.teamId);
  if (teamIndex === -1) return res.status(404).json({ error: 'Team not found.' });

  teams[teamIndex].teamName = newTeamName.trim();
  saveData(teamsFilePath, teams);
  res.json({ message: 'Team name updated successfully.', teamName: teams[teamIndex].teamName });
});

app.get('/private/styles.css',`;

code = code.replace(/app\.get\('\/private\/styles\.css',/g, updateEndpoints);

fs.writeFileSync('server.js', code);
console.log('Server endpoints added');
