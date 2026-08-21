import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Replace renderUsersList
old_users = """      let filtered = allUsers.filter(user => user.username.toLowerCase().includes(query));
      const totalPages = Math.ceil(filtered.length / usersPageSize);
      if (currentUsersPage > totalPages) currentUsersPage = totalPages || 1;
      const start = (currentUsersPage - 1) * usersPageSize;
      const pageUsers = filtered.slice(start, start + usersPageSize);
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';
      pageUsers.forEach(user => {"""

new_users = """      let filtered = allUsers.filter(user => user.username.toLowerCase().includes(query));
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';
      filtered.forEach(user => {"""
content = content.replace(old_users, new_users)

old_users_pag = "renderUsersPagination(totalPages);"
content = content.replace(old_users_pag, "document.getElementById('usersPagination').style.display = 'none';")

# Replace renderTeams
old_teams = """      let filtered = teamsData.filter(team =>
        team.teamName.toLowerCase().includes(query)
      );
      const totalPages = Math.ceil(filtered.length / pageSize);
      if (currentPage > totalPages) currentPage = totalPages || 1;
      const start = (currentPage - 1) * pageSize;
      const pageTeams = filtered.slice(start, start + pageSize);
      const teamsList = document.getElementById('teamsList');
      if (teamsList) {
        teamsList.innerHTML = '';
        pageTeams.forEach(team => {"""

new_teams = """      let filtered = teamsData.filter(team =>
        team.teamName.toLowerCase().includes(query)
      );
      const teamsList = document.getElementById('teamsList');
      if (teamsList) {
        teamsList.innerHTML = '';
        filtered.forEach(team => {"""
content = content.replace(old_teams, new_teams)

old_teams_pag = "renderPagination(totalPages);"
content = content.replace(old_teams_pag, "document.getElementById('teamsPagination').style.display = 'none';")

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
