import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Inject showSection function at the very beginning of the MAIN SCRIPT
inject = """  <script>
    function showSection(sectionId) {
      document.querySelectorAll('.info-section').forEach(sec => sec.style.display = 'none');
      const target = document.getElementById(sectionId);
      if(target) target.style.display = 'block';
      
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const activeLinks = document.querySelectorAll(`.nav-link[onclick*="${sectionId}"]`);
      activeLinks.forEach(l => l.classList.add('active'));
    }
"""

content = content.replace("  <script>", inject, 1)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
