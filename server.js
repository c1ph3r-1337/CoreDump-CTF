const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
  store: new FileStore({ path: './sessions', logFn: function(){} }),
  secret: 'someRandomSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// -----------------------
// Load Users
// -----------------------
const usersFilePath = path.join(__dirname, 'users.json');
let users = [];
try {
  if (fs.existsSync(usersFilePath)) {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(usersData);
  }
} catch (err) {
  console.error("Error reading users.json:", err);
}

// -----------------------
// Load Teams
// -----------------------
const teamsFilePath = path.join(__dirname, 'teams.json');
let teams = [];
try {
  if (fs.existsSync(teamsFilePath)) {
    const teamsData = fs.readFileSync(teamsFilePath, 'utf8');
    teams = JSON.parse(teamsData);
  }
} catch (err) {
  console.error("Error reading teams.json:", err);
}

// -----------------------
// User Endpoints
// -----------------------

app.post('/api/register', (req, res) => {
  const { username: trimmedUser, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  const trimmedUser = username.trim();
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already in use.' });
  if (users.find(u => u.username.toLowerCase() === trimmedUser.toLowerCase())) return res.status(400).json({ error: 'Username already in use.' });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username: trimmedUser,
    email,
    password: hashedPassword,
    teamId: null,
    solvedChallenges: []
  };
  users.push(newUser);
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users.json:", err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  io.emit('usersUpdate');
  res.json({ message: 'User registered successfully!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'User not found.' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: 'Invalid password.' });
  }
  req.session.userId = user.id;
  res.json({ message: 'Login successful!' });
});


app.get('/api/challenges', (req, res) => {
  const flagsFilePath = path.join(__dirname, 'private', 'flags.json');
  if (!fs.existsSync(flagsFilePath)) return res.json({});
  const flagsData = JSON.parse(fs.readFileSync(flagsFilePath, 'utf8'));
  const safeData = {};
  for (const key in flagsData) {
    safeData[key] = { text: flagsData[key].text, points: flagsData[key].points || 500 };
  }
  res.json(safeData);
});

app.post('/api/admin/challenges', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const currentUser = users.find(u => u.id === req.session.userId);
  if (!currentUser || currentUser.id !== 'user_admin_1') return res.status(403).json({ error: 'Forbidden' });
  
  const { category, text, flag, points } = req.body;
  if (!category || !text) return res.status(400).json({ error: 'Category and text required.' });
  
  const flagsFilePath = path.join(__dirname, 'private', 'flags.json');
  let flagsData = {};
  if (fs.existsSync(flagsFilePath)) {
    flagsData = JSON.parse(fs.readFileSync(flagsFilePath, 'utf8'));
  }
  
  let oldPoints = null;
  if (!flagsData[category]) {
    flagsData[category] = {};
  } else {
    oldPoints = flagsData[category].points !== undefined ? Number(flagsData[category].points) : 500;
  }
  
  const newPoints = parseInt(points) || 500;
  flagsData[category].text = text;
  flagsData[category].points = newPoints;
  
  if (flag) {
    flagsData[category].hash = bcrypt.hashSync(flag, 10);
  }
  
  fs.writeFileSync(flagsFilePath, JSON.stringify(flagsData, null, 2));
  
  // Retroactively adjust scores if points changed
  if (oldPoints !== null && oldPoints !== newPoints) {
    const pointDiff = newPoints - oldPoints;
    let teamsChanged = false;
    
    teams.forEach(team => {
      const teamSolvedIt = team.members.some(memberId => {
        const member = users.find(u => u.id === memberId);
        return member && Array.isArray(member.solvedChallenges) && member.solvedChallenges.includes(category);
      });
      
      if (teamSolvedIt) {
        team.score += pointDiff;
        if (!team.scoreHistory) {
          team.scoreHistory = [{ timestamp: Date.now() - 1000, score: team.score - pointDiff }];
        }
        team.scoreHistory.push({ timestamp: Date.now(), score: team.score });
        teamsChanged = true;
      }
    });
    
    if (teamsChanged) {
      fs.writeFileSync(path.join(__dirname, 'teams.json'), JSON.stringify(teams, null, 2));
      io.emit('teamsUpdate');
    }
  }

  io.emit('challengesUpdate');
  res.json({ message: 'Challenge updated successfully.' });
});

app.post('/api/admin/challenges/delete', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const currentUser = users.find(u => u.id === req.session.userId);
  if (!currentUser || currentUser.id !== 'user_admin_1') return res.status(403).json({ error: 'Forbidden' });
  
  const { category } = req.body;
  if (!category) return res.status(400).json({ error: 'Category required.' });
  
  const flagsFilePath = path.join(__dirname, 'private', 'flags.json');
  if (fs.existsSync(flagsFilePath)) {
    let flagsData = JSON.parse(fs.readFileSync(flagsFilePath, 'utf8'));
    const challengeObj = flagsData[category];
    
    if (challengeObj) {
      const pointsToDeduct = challengeObj.points !== undefined ? Number(challengeObj.points) : 500;
      
      // Remove points from teams that solved it
      let teamsChanged = false;
      teams.forEach(team => {
        const teamSolvedIt = team.members.some(memberId => {
          const member = users.find(u => u.id === memberId);
          return member && Array.isArray(member.solvedChallenges) && member.solvedChallenges.includes(category);
        });
        
        if (teamSolvedIt) {
          team.score -= pointsToDeduct;
          if (!team.scoreHistory) {
            team.scoreHistory = [{ timestamp: Date.now() - 1000, score: team.score + pointsToDeduct }];
          }
          team.scoreHistory.push({ timestamp: Date.now(), score: team.score });
          teamsChanged = true;
        }
      });
      
      // Remove challenge from all users' solved lists
      let usersChanged = false;
      users.forEach(user => {
        if (Array.isArray(user.solvedChallenges) && user.solvedChallenges.includes(category)) {
          user.solvedChallenges = user.solvedChallenges.filter(c => c !== category);
          usersChanged = true;
        }
      });
      
      // Save data
      delete flagsData[category];
      fs.writeFileSync(flagsFilePath, JSON.stringify(flagsData, null, 2));
      
      if (usersChanged || teamsChanged) {
        fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
        fs.writeFileSync(path.join(__dirname, 'teams.json'), JSON.stringify(teams, null, 2));
        io.emit('usersUpdate');
        io.emit('teamsUpdate');
      }
    }
  }
  io.emit('challengesUpdate');
  res.json({ message: 'Challenge deleted successfully.' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

// -----------------------
// Team Endpoints
// -----------------------

app.get('/api/teams', (req, res) => {
  const teamsWithNames = teams.map(team => {
    const membersNames = team.members
      .map(memberId => {
        const memberUser = users.find(u => u.id === memberId);
        return memberUser ? memberUser.username : null;
      })
      .filter(Boolean);
    if (typeof team.score !== 'number') team.score = 0;
    if (!team.solvedChallenges || typeof team.solvedChallenges !== 'object') {
      team.solvedChallenges = {};
    }
    return { ...team, membersNames };
  });
  res.json(teamsWithNames);
});

app.get('/api/myteam', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(403).json({ error: 'Not logged in' });
  const currentUser = users.find(u => u.id === userId);
  if (!currentUser || !currentUser.teamId) return res.json({ message: 'No team found for this user.' });
  const myTeam = teams.find(t => t.id === currentUser.teamId);
  if (!myTeam) return res.json({ message: 'No team found for this user.' });
  
  const flagsFilePath = path.join(__dirname, 'private', 'flags.json');
  let flagsData = {};
  if (fs.existsSync(flagsFilePath)) flagsData = JSON.parse(fs.readFileSync(flagsFilePath, 'utf8'));
  
  const membersNames = [];
  const memberDetails = myTeam.members.map(memberId => {
    const mUser = users.find(u => u.id === memberId);
    if (!mUser) return null;
    membersNames.push(mUser.username);
    
    let userPoints = 0;
    const solved = (mUser.solvedChallenges || []).map(cat => {
      const pts = flagsData[cat] && flagsData[cat].points !== undefined ? Number(flagsData[cat].points) : 500;
      userPoints += pts;
      return { category: cat, points: pts };
    });
    return {
      username: mUser.username: trimmedUser,
      totalPoints: userPoints,
      solvedChallenges: solved
    };
  }).filter(Boolean);
  
  if (typeof myTeam.score !== 'number') myTeam.score = 0;
  if (!myTeam.solvedChallenges || typeof myTeam.solvedChallenges !== 'object') {
    myTeam.solvedChallenges = {};
  }
  res.json({ team: { ...myTeam, membersNames, memberDetails } });
});

app.get('/api/profile', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const currentUser = users.find(u => u.id === req.session.userId);
  if (!currentUser) return res.status(404).json({ error: 'User not found.' });
  let teamName = null;
  if (currentUser.teamId) {
    const myTeam = teams.find(t => t.id === currentUser.teamId);
    if (myTeam) teamName = myTeam.teamName;
  }
  res.json({ username: currentUser.username: trimmedUser, teamName, isAdmin: currentUser.id === 'user_admin_1' });
});

app.post('/api/team/create', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(403).json({ error: 'Not logged in' });
  let { teamName, password } = req.body;
  if (!teamName || !teamName.trim() || !password) return res.status(400).json({ error: 'Team name and password required.' });
  teamName = teamName.trim();
  const existingTeam = teams.find(t => t.teamName.trim().toLowerCase() === teamName.toLowerCase());
  if (existingTeam) return res.status(400).json({ error: 'Team already exists.' });
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newTeam = {
    id: Date.now().toString(),
    teamName,
    password: hashedPassword,
    members: [userId],
    score: 0,
    solvedChallenges: {},
    scoreHistory: [{ timestamp: Date.now(), score: 0 }]
  };
  teams.push(newTeam);
  try {
    fs.writeFileSync(teamsFilePath, JSON.stringify(teams, null, 2));
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing team or users file:", err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  user.teamId = newTeam.id;
  io.emit('teamsUpdate');
  io.emit('usersUpdate');
  res.json({ message: 'Team created successfully!', team: newTeam });
});

app.post('/api/team/join', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(403).json({ error: 'Not logged in' });
  const { teamName, password } = req.body;
  if (!teamName || !password) return res.status(400).json({ error: 'Team name and password required.' });
  const team = teams.find(t => t.teamName.toLowerCase() === teamName.toLowerCase());
  if (!team) return res.status(404).json({ error: 'Team not found.' });
  if (!bcrypt.compareSync(password, team.password)) return res.status(400).json({ error: 'Incorrect team password.' });
  if (!team.members.includes(userId)) {
    team.members.push(userId);
    try {
      fs.writeFileSync(teamsFilePath, JSON.stringify(teams, null, 2));
    } catch (err) {
      console.error("Error writing teams.json:", err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.teamId = team.id;
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users.json:", err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  io.emit('teamsUpdate');
  io.emit('usersUpdate');
  res.json({ message: `Joined team ${team.teamName} successfully.`, team });
});

app.post('/api/challenge/flag', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const { category, flag } = req.body;
  if (!category || !flag) return res.status(400).json({ error: 'Category and flag required.' });
  const flagsFilePath = path.join(__dirname, 'private', 'flags.json');
  if (!fs.existsSync(flagsFilePath)) return res.status(500).json({ error: 'Flags file not found.' });
  const flagsData = JSON.parse(fs.readFileSync(flagsFilePath, 'utf8'));
  const challengeObj = flagsData[category];
  if (!challengeObj) return res.status(404).json({ error: 'Challenge not found for this category.' });
  const storedHash = challengeObj.hash;
  if (!storedHash) return res.status(404).json({ error: 'Challenge not found for this category.' });
  
  const userId = req.session.userId;
  const currentUser = users.find(u => u.id === userId);
  if (!currentUser || !currentUser.teamId) return res.status(400).json({ error: 'You are not in a team.' });
  const team = teams.find(t => t.id === currentUser.teamId);
  if (!team) return res.status(400).json({ error: 'Team not found.' });
  
  const alreadySolved = team.members.some(memberId => {
    const member = users.find(u => u.id === memberId);
    return member && Array.isArray(member.solvedChallenges) && member.solvedChallenges.includes(category);
  });
  
  if (alreadySolved) {
    return res.json({ message: 'This challenge has already been solved by a team member.' });
  }
  
  if (!Array.isArray(currentUser.solvedChallenges)) {
    currentUser.solvedChallenges = [];
  }
  currentUser.solvedChallenges.push(category);
  const pointsEarned = challengeObj.points !== undefined ? Number(challengeObj.points) : 500;
  team.score += pointsEarned;
  if (!team.scoreHistory) {
    team.scoreHistory = [{ timestamp: Date.now() - 1000, score: team.score - pointsEarned }];
  }
  team.scoreHistory.push({ timestamp: Date.now(), score: team.score });
  
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    fs.writeFileSync(teamsFilePath, JSON.stringify(teams, null, 2));
  } catch (err) {
    console.error("Error writing files:", err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  
  io.emit('teamsUpdate');
  io.emit('usersUpdate');
  return res.json({ message: 'Correct flag! 500 points added to your team.' });
});

// -----------------------
// Protected Routes & Static Files
// -----------------------


// -----------------------
// Update Endpoints
// -----------------------

// Update Username Endpoint
app.post('/api/profile/update', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const { newUsername } = req.body;
  if (!newUsername || newUsername.trim() === '') {
    return res.status(400).json({ error: 'Username cannot be empty.' });
  }
  
  // Check if username is already taken
  if (users.find(u => u.username.trim().toLowerCase() === newUsername.trim().toLowerCase() && u.id !== req.session.userId)) {
    return res.status(400).json({ error: 'Username already taken.' });
  }

  const userIndex = users.findIndex(u => u.id === req.session.userId);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found.' });

  users[userIndex].username = newUsername.trim();
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  io.emit('usersUpdate');
  res.json({ message: 'Username updated successfully.', username: users[userIndex].username });
});

// Update Team Name Endpoint
app.post('/api/team/update', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  const { newTeamName } = req.body;
  if (!newTeamName || newTeamName.trim() === '') {
    return res.status(400).json({ error: 'Team name cannot be empty.' });
  }

  const currentUser = users.find(u => u.id === req.session.userId);
  if (!currentUser || !currentUser.teamId) {
    return res.status(400).json({ error: 'You are not in a team.' });
  }

  // Check if team name is already taken
  if (teams.find(t => t.teamName.trim().toLowerCase() === newTeamName.trim().toLowerCase() && t.id !== currentUser.teamId)) {
    return res.status(400).json({ error: 'Team name already taken.' });
  }

  const teamIndex = teams.findIndex(t => t.id === currentUser.teamId);
  if (teamIndex === -1) return res.status(404).json({ error: 'Team not found.' });

  teams[teamIndex].teamName = newTeamName.trim();
  fs.writeFileSync(teamsFilePath, JSON.stringify(teams, null, 2));
  io.emit('teamsUpdate');
  res.json({ message: 'Team name updated successfully.', teamName: teams[teamIndex].teamName });
});


// Leave Team Endpoint
app.post('/api/team/leave', (req, res) => {
  if (!req.session.userId) return res.status(403).json({ error: 'Not logged in' });
  
  const currentUser = users.find(u => u.id === req.session.userId);
  if (!currentUser || !currentUser.teamId) {
    return res.status(400).json({ error: 'You are not in a team.' });
  }

  const teamIndex = teams.findIndex(t => t.id === currentUser.teamId);
  if (teamIndex !== -1) {
    const team = teams[teamIndex];
    team.members = team.members.filter(m => m !== req.session.userId);
    // Optional: if team is empty, you could delete it, but let's keep it simple and just remove member
  }

  currentUser.teamId = null;

  fs.writeFileSync(teamsFilePath, JSON.stringify(teams, null, 2));
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  io.emit('teamsUpdate');
  io.emit('usersUpdate');

  res.json({ message: 'Left team successfully.' });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/');
  const currentUser = users.find(u => u.id === req.session.userId);
  let html = fs.readFileSync(path.join(__dirname, 'private', 'dashboard.html'), 'utf8');
  if (currentUser && currentUser.id === 'user_admin_1') {
    html = html.replace('<li id="adminNavLi" style="display:none;">', '<li id="adminNavLi">');
  }
  res.send(html);
});

app.get('/dashboard-styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'private', 'styles.css'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => { res.redirect('/'); });
});

app.use(express.static('public'));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
