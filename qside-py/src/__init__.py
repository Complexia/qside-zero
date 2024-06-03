import sys
import os

# Get the parent directory (project directory)
project_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(project_dir)

# Add the project directory to the Python path
sys.path.append(parent_dir)
print(parent_dir)