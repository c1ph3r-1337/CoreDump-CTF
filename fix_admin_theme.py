import re

with open('/home/harry/Projects/ctf/private/dashboard.html', 'r') as f:
    content = f.read()

# Replace the outer div style
old_div_style = "div.style.cssText = 'display:flex; flex-direction:column; justify-content:space-between; padding:1.25rem; background:rgba(255,255,255,0.03); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.6); border-radius:4px; min-height: 140px; box-shadow: inset 0 0 10px rgba(255,255,255,0.05);';"
new_div_style = "div.style.cssText = 'display:flex; flex-direction:column; justify-content:space-between; padding:1.25rem; background:var(--glass-bg); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border:1px solid var(--glass-border); border-radius:4px; min-height: 140px;';"
content = content.replace(old_div_style, new_div_style)

# Replace the buttons
old_buttons = """<div style="display:flex; gap:0.5rem; margin-top:auto;"><button onclick="editChallenge('${category}')" style="flex:1; padding:0.5rem; background:transparent; color:var(--text); border:1px solid var(--border); border-radius:9999px; cursor:pointer; font-weight:500; transition:all 0.2s; text-align:center;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Edit</button><button onclick="deleteChallenge('${category}')" style="flex:1; padding:0.5rem; background:transparent; color:var(--text); border:1px solid var(--border); border-radius:9999px; cursor:pointer; font-weight:500; transition:all 0.2s; text-align:center;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Delete</button></div>"""

new_buttons = """<div style="display:flex; gap:0.5rem; margin-top:auto;"><button onclick="editChallenge('${category}')" style="flex:1; padding:0.5rem; background:rgba(255,255,255,0.05); color:var(--text-primary); border:none; border-radius:9999px; cursor:pointer; font-weight:500; letter-spacing: 1px; transition:all 0.2s; text-align:center;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">EDIT</button><button onclick="deleteChallenge('${category}')" style="flex:1; padding:0.5rem; background:rgba(255,255,255,0.05); color:var(--text-primary); border:none; border-radius:9999px; cursor:pointer; font-weight:500; letter-spacing: 1px; transition:all 0.2s; text-align:center;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">DELETE</button></div>"""
content = content.replace(old_buttons, new_buttons)

with open('/home/harry/Projects/ctf/private/dashboard.html', 'w') as f:
    f.write(content)
