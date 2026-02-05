#!/usr/bin/env python3
"""Fix asset URLs to use getAssetUrl helper for base path support."""

import os

file_path = os.path.join(os.path.dirname(__file__), '..', 'App.tsx')

with open(file_path, 'r') as f:
    content = f.read()

# 1. Add import after TeamPhoto import
old_import = "import { TeamPhoto } from './types';"
new_import = """import { TeamPhoto } from './types';
import { getAssetUrl, BASE_URL } from './utils';"""
content = content.replace(old_import, new_import)

# 2. Replace static logo paths in img src tags
replacements = [
    ('src="/assets/logo/Logotipo OSP branco.png"', 'src={getAssetUrl("/assets/logo/Logotipo OSP branco.png")}'),
    ('src="/assets/logo/Logo OSP branco.png"', 'src={getAssetUrl("/assets/logo/Logo OSP branco.png")}'),
    ('src="/assets/logo/Logo OSP Azul.png"', 'src={getAssetUrl("/assets/logo/Logo OSP Azul.png")}'),
]

for old, new in replacements:
    content = content.replace(old, new)

# 3. Replace hero candidates array - line by line
hero_replacements = [
    ("'/assets/hero/osp-onboarding.webp'", "getAssetUrl('/assets/hero/osp-onboarding.webp')"),
    ("'/assets/hero/osp-onboarding.jpg'", "getAssetUrl('/assets/hero/osp-onboarding.jpg')"),
    ("'/assets/hero/osp-onboarding.jpeg'", "getAssetUrl('/assets/hero/osp-onboarding.jpeg')"),
    ("'/assets/hero/OSP_Image_Background.webp'", "getAssetUrl('/assets/hero/OSP_Image_Background.webp')"),
    ("'/assets/hero/OSP_Image_Background.png'", "getAssetUrl('/assets/hero/OSP_Image_Background.png')"),
    ("'/assets/hero/OSP_Image_Background.jpg'", "getAssetUrl('/assets/hero/OSP_Image_Background.jpg')"),
    ("'/assets/hero/OSP_Image_Background.jpeg'", "getAssetUrl('/assets/hero/OSP_Image_Background.jpeg')"),
]

for old, new in hero_replacements:
    content = content.replace(old, new)

with open(file_path, 'w') as f:
    f.write(content)

print("App.tsx updated successfully!")
