param(
  [string]$SourceFolder
)

# Resolve Desktop folder
$desktop = Join-Path $env:USERPROFILE 'Desktop'

# Find socios folder if not provided
if (-not $SourceFolder -or $SourceFolder.Trim().Length -eq 0) {
  $sociosFolder = Get-ChildItem -Path $desktop -Directory -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '(?i)s[óo]cios' } |
    Select-Object -First 1
  if (-not $sociosFolder) {
    Write-Host 'Sócios folder not found under Desktop.'
    exit 1
  }
  $SourceFolder = $sociosFolder.FullName
}

Write-Host "Using Sócios source: $SourceFolder"

# Target folder in workspace
$workspace = "C:\Users\OSP\Downloads\osp-onboarding-portal"
$target = Join-Path $workspace 'public\assets\partners'
if (!(Test-Path $target)) { New-Item -ItemType Directory -Path $target | Out-Null }

# Collect images
$images = Get-ChildItem -Path $SourceFolder -File -Recurse -Include *.png,*.jpg,*.jpeg,*.webp -ErrorAction SilentlyContinue
if (-not $images -or $images.Count -eq 0) {
  Write-Host 'No images found in Sócios folder.'
  exit 1
}

# Helper to normalize filename
function Normalize-Name($name) {
  $n = $name
  $n = $n -replace '\s+', '_' -replace '[^a-zA-Z0-9._-]', ''
  return $n
}

# Copy images
$copied = @()
foreach ($img in $images) {
  $destName = Normalize-Name $img.Name
  $destPath = Join-Path $target $destName
  Copy-Item $img.FullName $destPath -Force
  $copied += [pscustomobject]@{ Name = $img.Name; Dest = $destName }
}

# Try to detect mapping based on filename tokens
$partnersMap = @()
$partnersMap += [pscustomobject]@{ Key = 'Sergio'; Pattern = '(?i)serg[ií]o'; Match = $null }
$partnersMap += [pscustomobject]@{ Key = 'Guilherme'; Pattern = '(?i)guilherme'; Match = $null }

foreach ($c in $copied) {
  foreach ($pm in $partnersMap) {
    if ($c.Dest -match $pm.Pattern) { $pm.Match = $c.Dest }
  }
}

Write-Host 'Copied Sócios images:'
$copied | Format-Table -AutoSize | Out-String | Write-Host

Write-Host 'Detected partner image mappings:'
$partnersMap | Format-Table -AutoSize | Out-String | Write-Host

# Write a simple manifest to assist manual linking
$manifest = @{
  partners = $partnersMap | ForEach-Object { @{ key = $_.Key; file = $_.Match } }
}
($manifest | ConvertTo-Json -Depth 4) | Set-Content (Join-Path $target 'partners.json')

Write-Host "Manifest written to $target\partners.json"
