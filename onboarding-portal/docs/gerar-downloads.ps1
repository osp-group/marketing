# Script para gerar versões do arquivo de contexto OSP para download
$mdFile = "OSP_Contexto_Para_Agentes_IA.md"
$htmlFile = "OSP_Contexto_Para_Agentes_IA.html"
$docFile = "OSP_Contexto_Para_Agentes_IA.doc"

Write-Host "Gerando versoes para download do contexto OSP..." -ForegroundColor Cyan
Write-Host ""

# Ler conteúdo Markdown
$content = Get-Content $mdFile -Raw -Encoding UTF8

# ===== CRIAR HTML =====
Write-Host "Criando arquivo HTML..." -ForegroundColor Yellow

$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>OSP Contabilidade - Contexto para Agentes de IA</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        h1 {
            color: #0066cc;
            border-bottom: 4px solid #0066cc;
            padding-bottom: 12px;
            margin-top: 40px;
            font-size: 28px;
        }
        h1:first-of-type {
            margin-top: 0;
        }
        h2 {
            color: #0066cc;
            border-bottom: 2px solid #ccc;
            padding-bottom: 8px;
            margin-top: 30px;
            font-size: 22px;
        }
        h3 {
            color: #0088cc;
            margin-top: 25px;
            font-size: 18px;
        }
        h4 {
            color: #555;
            margin-top: 20px;
            font-size: 15px;
        }
        p {
            margin: 10px 0;
        }
        code {
            background-color: #f4f4f4;
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 90%;
            color: #c7254e;
        }
        pre {
            background-color: #f8f8f8;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            border-left: 4px solid #0066cc;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            color: #333;
        }
        ul, ol {
            margin: 15px 0;
            padding-left: 30px;
        }
        li {
            margin: 8px 0;
        }
        strong {
            color: #000;
            font-weight: 600;
        }
        em {
            font-style: italic;
            color: #555;
        }
        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        blockquote {
            border-left: 4px solid #0088cc;
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }
        .highlight {
            background-color: #fff9e6;
            padding: 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }
        .info-box {
            background-color: #e8f4f8;
            padding: 15px;
            border-left: 4px solid #0066cc;
            margin: 20px 0;
        }
        @media print {
            body {
                max-width: 100%;
            }
            h1 {
                page-break-before: always;
            }
            h1:first-of-type {
                page-break-before: avoid;
            }
        }
    </style>
</head>
<body>
"@

# Processar Markdown para HTML
$lines = $content -split "`r`n|`n"
$inCodeBlock = $false
$inList = $false

foreach ($line in $lines) {
    # Code blocks
    if ($line -match '^```') {
        if ($inCodeBlock) {
            $htmlContent += "</code></pre>`n"
            $inCodeBlock = $false
        } else {
            $htmlContent += "<pre><code>"
            $inCodeBlock = $true
        }
        continue
    }
    
    if ($inCodeBlock) {
        $escaped = $line -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
        $htmlContent += "$escaped`n"
        continue
    }
    
    # Headers
    if ($line -match '^# (.+)$') {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $text = $matches[1]
        $htmlContent += "<h1>$text</h1>`n"
    }
    elseif ($line -match '^## (.+)$') {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $text = $matches[1]
        $htmlContent += "<h2>$text</h2>`n"
    }
    elseif ($line -match '^### (.+)$') {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $text = $matches[1]
        $htmlContent += "<h3>$text</h3>`n"
    }
    elseif ($line -match '^#### (.+)$') {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $text = $matches[1]
        $htmlContent += "<h4>$text</h4>`n"
    }
    # Horizontal rules
    elseif ($line -match '^---+$') {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $htmlContent += "<hr />`n"
    }
    # Lists
    elseif ($line -match '^- (.+)$' -or $line -match '^• (.+)$') {
        if (-not $inList) {
            $htmlContent += "<ul>`n"
            $inList = $true
        }
        $text = $matches[1]
        # Processar formatação inline
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        $text = $text -replace '\[(.+?)\]\((.+?)\)', '<a href="$2">$1</a>'
        $htmlContent += "<li>$text</li>`n"
    }
    elseif ($line -match '^\d+\. (.+)$') {
        if ($inList -and $htmlContent -notmatch '<ol>$') {
            $htmlContent += "</ul>`n<ol>`n"
        }
        elseif (-not $inList) {
            $htmlContent += "<ol>`n"
            $inList = $true
        }
        $text = $matches[1]
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        $text = $text -replace '\[(.+?)\]\((.+?)\)', '<a href="$2">$1</a>'
        $htmlContent += "<li>$text</li>`n"
    }
    # Empty line
    elseif ($line.Trim() -eq '') {
        if ($inList) {
            $htmlContent += "</ul>`n"
            $inList = $false
        }
        $htmlContent += "<p></p>`n"
    }
    # Normal text
    else {
        if ($inList) { $htmlContent += "</ul>`n"; $inList = $false }
        $text = $line
        # Processar formatação inline
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $text = $text -replace '\*(.+?)\*', '<em>$1</em>'
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        $text = $text -replace '\[(.+?)\]\((.+?)\)', '<a href="$2">$1</a>'
        
        $htmlContent += "<p>$text</p>`n"
    }
}

if ($inList) {
    $htmlContent += "</ul>`n"
}

$htmlContent += @"
</body>
</html>
"@

$htmlContent | Out-File -FilePath $htmlFile -Encoding UTF8
Write-Host "  HTML criado: $htmlFile" -ForegroundColor Green

# ===== CRIAR DOC =====
Write-Host "Criando arquivo Word (.doc)..." -ForegroundColor Yellow

$docHtml = @"
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>OSP - Contexto para Agentes IA</title>
<style>
body {
    font-family: 'Segoe UI', Calibri, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    margin: 1in;
}
h1 {
    color: #0066cc;
    font-size: 24pt;
    border-bottom: 3px solid #0066cc;
    padding-bottom: 10px;
    page-break-before: always;
}
h1:first-of-type {
    page-break-before: avoid;
}
h2 {
    color: #0066cc;
    font-size: 18pt;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    margin-top: 20pt;
}
h3 {
    color: #0088cc;
    font-size: 14pt;
    margin-top: 15pt;
}
h4 {
    color: #555;
    font-size: 12pt;
    margin-top: 10pt;
}
p {
    margin: 6pt 0;
}
code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    font-family: 'Courier New', monospace;
    font-size: 10pt;
}
pre {
    background-color: #f4f4f4;
    padding: 10pt;
    border-left: 4px solid #0066cc;
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    white-space: pre-wrap;
}
ul, ol {
    margin: 10pt 0;
    padding-left: 30pt;
}
li {
    margin: 3pt 0;
}
strong {
    font-weight: bold;
}
hr {
    border: none;
    border-top: 2px solid #ccc;
    margin: 15pt 0;
}
</style>
</head>
<body>
$htmlContent
</body>
</html>
"@

$docHtml | Out-File -FilePath $docFile -Encoding UTF8
Write-Host "  Word criado: $docFile" -ForegroundColor Green

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Arquivos criados com sucesso!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Formatos disponiveis:" -ForegroundColor White
Write-Host "  1. $mdFile (Markdown original)" -ForegroundColor Gray
Write-Host "  2. $htmlFile (HTML para visualizar no navegador)" -ForegroundColor Gray
Write-Host "  3. $docFile (Word - editavel)" -ForegroundColor Gray
Write-Host ""
Write-Host "Para gerar PDF:" -ForegroundColor Yellow
Write-Host "  - Abra o arquivo HTML no navegador" -ForegroundColor Gray
Write-Host "  - Pressione Ctrl+P" -ForegroundColor Gray
Write-Host "  - Selecione 'Salvar como PDF'" -ForegroundColor Gray
Write-Host ""
Write-Host "Abrindo arquivo Word..." -ForegroundColor Cyan

Start-Process $docFile
