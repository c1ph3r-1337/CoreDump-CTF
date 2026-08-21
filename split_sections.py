import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Extract the layout grid
match = re.search(r'(\s*<div class="layout-grid">.*?\n    </div>\n)', content, re.DOTALL)
if match:
    grid_html = match.group(1)
    
    # Remove it from where it is
    content = content.replace(grid_html, '')
    
    # Create the challenges section
    challenges_section = f"""
  <!-- CHALLENGES SECTION -->
  <section id="challenges-section" class="info-section" style="display: none; padding-top: 30px;">{grid_html}  </section>
"""
    
    # Insert it right before <!-- Old sections preserved but hidden -->
    insert_point = "  <!-- Old sections preserved but hidden -->"
    content = content.replace(insert_point, challenges_section + "\n" + insert_point)
    
    with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
        f.write(content)
else:
    print("Could not find layout-grid")
