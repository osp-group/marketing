# Script para converter Markdown para DOCX
$ErrorActionPreference = "Stop"

$markdownFile = "Roteiros_Videos_Solucoes_OSP.md"
$docxFile = "Roteiros_Videos_Solucoes_OSP.docx"

# Verificar se Word está instalado
try {
    Write-Host "Tentando criar documento Word..." -ForegroundColor Yellow
    
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    
    Write-Host "Microsoft Word encontrado!" -ForegroundColor Green
    
    # Criar novo documento
    $doc = $word.Documents.Add()
    
    # Ler conteúdo do Markdown
    $content = Get-Content $markdownFile -Raw -Encoding UTF8
    
    # Adicionar todo o conteúdo como texto
    $selection = $word.Selection
    $selection.TypeText($content)
    
    # Configurar fonte padrão
    $doc.Content.Font.Name = "Segoe UI"
    $doc.Content.Font.Size = 11
    
    # Salvar documento
    $fullPath = Join-Path (Get-Location) $docxFile
    $doc.SaveAs([ref]$fullPath, [ref]16)
    
    # Fechar
    $doc.Close()
    $word.Quit()
    
    # Liberar objetos COM
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
    
    Write-Host ""
    Write-Host "Documento Word criado com sucesso!" -ForegroundColor Green
    Write-Host "Arquivo: $fullPath" -ForegroundColor Cyan
    Write-Host ""
    
    Start-Process $docxFile
    
} catch {
    Write-Host ""
    Write-Host "Erro ao usar Word. Criando arquivo compativel (.rtf)..." -ForegroundColor Yellow
    Write-Host "Erro detalhado: $_" -ForegroundColor DarkGray
    Write-Host ""
    
    # Criar documento Word usando OpenXML manualmente
    $docxFile = "Roteiros_Videos_Solucoes_OSP.docx"
    
    # Ler conteúdo
    $mdContent = Get-Content $markdownFile -Raw -Encoding UTF8
    
    # Criar estrutura básica DOCX (é um ZIP com XML)
    $tempFolder = Join-Path $env:TEMP "docx_temp_$(Get-Random)"
    New-Item -ItemType Directory -Path $tempFolder -Force | Out-Null
    New-Item -ItemType Directory -Path "$tempFolder\_rels" -Force | Out-Null
    New-Item -ItemType Directory -Path "$tempFolder\word" -Force | Out-Null
    New-Item -ItemType Directory -Path "$tempFolder\word\_rels" -Force | Out-Null
    
    # [Content_Types].xml
    $contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
"@
    $contentTypes | Out-File "$tempFolder\[Content_Types].xml" -Encoding utf8
    
    # _rels/.rels
    $rels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
"@
    $rels | Out-File "$tempFolder\_rels\.rels" -Encoding utf8
    
    # Escapar XML
    $xmlContent = $mdContent -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
    
    # Processar para parágrafos
    $paragraphs = ""
    foreach ($line in ($xmlContent -split "`r`n|`n")) {
        if ($line.Trim() -ne "") {
            $paragraphs += "<w:p><w:r><w:t xml:space='preserve'>$line</w:t></w:r></w:p>"
        } else {
            $paragraphs += "<w:p/>"
        }
    }
    
    # word/document.xml
    $documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
$paragraphs
</w:body>
</w:document>
"@
    $documentXml | Out-File "$tempFolder\word\document.xml" -Encoding utf8
    
    # Comprimir para DOCX
    $fullPath = Join-Path (Get-Location) $docxFile
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
    }
    
    Add-Type -Assembly System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($tempFolder, $fullPath)
    
    # Limpar
    Remove-Item $tempFolder -Recurse -Force
    
    Write-Host "Documento Word (.docx) criado com sucesso!" -ForegroundColor Green
    Write-Host "Arquivo: $fullPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Abrindo documento..." -ForegroundColor Yellow
    
    Start-Process $fullPath
}
