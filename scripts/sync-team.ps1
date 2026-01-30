param(
  [string]$Source = "C:\\Users\\OSP\\Downloads\\OSPMarketing\\onboarding-portal\\public\\team",
  [string]$Dest = (Join-Path $PSScriptRoot "..\public\team")
)

Write-Host "Source:" $Source
Write-Host "Dest:" $Dest

if (-not (Test-Path $Source)) {
  Write-Error "Source folder not found: $Source"
  exit 1
}

if (-not (Test-Path $Dest)) {
  New-Item -ItemType Directory -Path $Dest -Force | Out-Null
}

# Copy all files recursively
$rc = robocopy $Source $Dest /E /MT:8 /R:3 /W:2 /NFL /NDL /NJH /NJS /NP
$code = $LASTEXITCODE

if ($code -ge 8) {
  Write-Error "Robocopy failed with exit code $code"
  exit $code
}

Write-Host "Sync complete with exit code $code"
exit 0
