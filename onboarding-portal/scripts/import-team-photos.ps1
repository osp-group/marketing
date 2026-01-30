param(
  [string]$Source = "C:\\Users\\OSP\\Desktop\\fotos perfil colaboradores",
  [string]$Dest = (Join-Path $PSScriptRoot "..\\public\\team")
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

function Get-DepartmentKey {
  param([System.IO.FileInfo]$Img)
  $pathLower = $Img.DirectoryName.ToLowerInvariant()
  $nameLower = $Img.BaseName.ToLowerInvariant()

  # Name-based split for Comercial vs Marketing
  if ($nameLower -match 'marketing') { return 'Marketing' }
  if ($nameLower -match 'vendas|comercial') { return 'Comercial' }

  # File name-based mapping (more specific - check suffixes first)
  if ($nameLower -match '_dpt_fiscal') { return 'DPT_Fiscal' }
  if ($nameLower -match '_dpt_pessoal') { return 'DPT_Pessoal' }
  if ($nameLower -match '_dpt_contabil') { return 'DPT_Contabil' }
  if ($nameLower -match '_relacionamento_adm') { return 'Relacionamento_ADM' }
  if ($nameLower -match '_sucesso_do_cliente') { return 'Sucesso_Do_Cliente' }
  if ($nameLower -match '_moby') { return 'Moby' }
  if ($nameLower -match '_rh') { return 'RH' }

  # Folder-based mapping (fallback)
  if ($pathLower -match 'contabil') { return 'DPT_Contabil' }
  if ($pathLower -match 'pessoal|dp') { return 'DPT_Pessoal' }
  if ($pathLower -match 'fiscal|tribut') { return 'DPT_Fiscal' }
  if ($pathLower -match 'relacionamento.*adm') { return 'Relacionamento_ADM' }
  if ($pathLower -match 'sucesso.*cliente') { return 'Sucesso_Do_Cliente' }
  if ($pathLower -match 'moby') { return 'Moby' }
  if ($pathLower -match '\brh\b') { return 'RH' }
  if ($pathLower -match 'marketing') { return 'Marketing' }
  if ($pathLower -match 'comercial|vendas') { return 'Comercial' }
  return 'Misc'
}

$images = Get-ChildItem $Source -Recurse -File -Include *.jpg,*.jpeg,*.png,*.webp
if (-not $images) {
  Write-Warning "No images found under $Source"
}

$manifest = @()

foreach ($img in $images) {
  $dept = Get-DepartmentKey -Img $img
  $deptDest = Join-Path $Dest $dept
  if (-not (Test-Path $deptDest)) { New-Item -ItemType Directory -Path $deptDest -Force | Out-Null }

  $target = Join-Path $deptDest $img.Name
  Copy-Item -Path $img.FullName -Destination $target -Force

  $rel = Join-Path $dept $img.Name
  
  # Parse filename pattern: NOME_CARGO_DEPARTAMENTO - Separate name and roleoby|RH|M
  $baseName = $img.BaseName
  
  # Remove department suffix (DPT_Pessoal, DPT_Fiscal, DPT_Contabil, etc.)
  $cleanedName = $baseName -replace '_(DPT_Pessoal|DPT_Fiscal|DPT_Contabil|Sucesso_Do_Cliente|Relacionamento_ADM|Marketing|Comercial|Misc)$', ''
  
  # Split NOME_CARGO into separate fields
  $parts = $cleanedName -split '_'
  $name = if ($parts.Length -ge 1) { $parts[0] } else { $cleanedName }
  $role = if ($parts.Length -ge 2) { ($parts[1..($parts.Length-1)] -join ' ') } else { '' }
  
  $manifest += [PSCustomObject]@{
    name = $name
    role = $role
    department = $dept
    path = ($rel -replace "\\", "/")
  }
}

$manifestJson = $manifest | ConvertTo-Json -Depth 3
Set-Content -Path (Join-Path $Dest 'team.json') -Value $manifestJson -Encoding UTF8

# Print summary
$grouped = $manifest | Group-Object -Property department | Sort-Object -Property Count -Descending
foreach ($g in $grouped) { Write-Host ($g.Name + ": " + $g.Count) }

Write-Host "Imported" ($manifest.Count) "photos to" $Dest
exit 0
