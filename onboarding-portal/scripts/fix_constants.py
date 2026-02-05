#!/usr/bin/env python3
"""Fix asset URLs in constants.tsx to use getAssetUrl helper."""

import os

file_path = os.path.join(os.path.dirname(__file__), '..', 'constants.tsx')

with open(file_path, 'r') as f:
    content = f.read()

# 1. Add import at the top (after the existing import)
old_import = "import { ValueItem, Technology, Employee, Department, OnboardingTask } from './types';"
new_import = """import { ValueItem, Technology, Employee, Department, OnboardingTask } from './types';
import { getAssetUrl } from './utils';"""
content = content.replace(old_import, new_import)

# 2. Replace all '/assets/' paths with getAssetUrl calls
# Handle logo: '/assets/...' -> logo: getAssetUrl('/assets/...')
# Handle image: '/assets/...' -> image: getAssetUrl('/assets/...')

import re

# Pattern to match logo: '/assets/...' or image: '/assets/...'
pattern = r"(logo|image): '(/assets/[^']+)'"
replacement = r"\1: getAssetUrl('\2')"
content = re.sub(pattern, replacement, content)

# 3. Replace /team/ paths in CLIENT_LOGOS array
# These are bare strings in an array like '/team/...'
# Pattern: '/team/...' in array context
team_pattern = r"'(/team/[^']+)'"
team_replacement = r"getAssetUrl('\1')"
content = re.sub(team_pattern, team_replacement, content)

# 4. Replace /team/ paths in image properties of DEPARTMENTS
# Already handled by pattern above if they use image: '/team/...'

with open(file_path, 'w') as f:
    f.write(content)

print("constants.tsx updated successfully!")
