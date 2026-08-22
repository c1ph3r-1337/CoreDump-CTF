#!/usr/bin/env python3

import subprocess
from pathlib import Path

venv_path = Path.home() / "myenv"

# Create the virtual environment
subprocess.run(["python3", "-m", "venv", str(venv_path)], check=True)

print(f"Virtual environment created at {venv_path}")
