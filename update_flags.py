import json

with open('/home/harry/Projects/ctf/private/flags.json', 'r') as f:
    flags = json.load(f)

# Delete Miscellaneous
if 'Miscellaneous' in flags:
    del flags['Miscellaneous']

# Points mapping: Easy = 200, Medium = 500, Hard = 1000
flags['Forensics']['points'] = 200
flags['Web Exploitation']['points'] = 200
flags['Crypto']['points'] = 200

flags['OSINT']['points'] = 500
flags['Steganography']['points'] = 500

flags['Reverse Engineering']['points'] = 1000
flags['Binary Analysis']['points'] = 1000

with open('/home/harry/Projects/ctf/private/flags.json', 'w') as f:
    json.dump(flags, f, indent=2)
