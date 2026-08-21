import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Fix showSection to handle admin tab
new_show = """  <script>
    function showSection(sectionId) {
      document.querySelectorAll('.info-section').forEach(sec => sec.style.display = 'none');
      const target = document.getElementById(sectionId);
      if(target) target.style.display = 'block';
      
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const activeLinks = document.querySelectorAll(`.nav-link[onclick*="${sectionId}"]`);
      activeLinks.forEach(l => l.classList.add('active'));
      
      if (sectionId === 'admin-section' && typeof fetchAdminChallenges === 'function') {
        fetchAdminChallenges();
      }
    }"""
content = content.replace("  <script>\n    function showSection(sectionId) {\n      document.querySelectorAll('.info-section').forEach(sec => sec.style.display = 'none');\n      const target = document.getElementById(sectionId);\n      if(target) target.style.display = 'block';\n      \n      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));\n      const activeLinks = document.querySelectorAll(`.nav-link[onclick*=\"${sectionId}\"]`);\n      activeLinks.forEach(l => l.classList.add('active'));\n    }", new_show)

# Make sure all initial data is fetched
fetch_data = """      // Fetch initial data
      fetchChallenges();
      fetchProfile();
      fetchTeamScores();
      fetchTeams();
      fetchMyTeam();
      fetchUsers();
"""
content = content.replace("      // Fetch initial data\n      fetchChallenges();", fetch_data)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
