# Script simples para criar arquivo Word
$mdFile = "Roteiros_Videos_Solucoes_OSP.md"
$docFile = "Roteiros_Videos_Solucoes_OSP.doc"

Write-Host "Criando arquivo Word (.doc)..." -ForegroundColor Yellow

# Ler conteúdo markdown
$content = Get-Content $mdFile -Raw -Encoding UTF8

# Criar arquivo HTML que o Word pode abrir como DOC
$htmlContent = @"
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>Roteiros de Vídeo - Soluções OSP</title>
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
    color: #000;
}
hr {
    border: none;
    border-top: 2px solid #ccc;
    margin: 15pt 0;
}
</style>
</head>
<body>
"@

# Processar o conteúdo Markdown
$lines = $content -split "`r`n|`n"
$inCodeBlock = $false

foreach ($line in $lines) {
    if ($line -match '^```') {
        if ($inCodeBlock) {
            $htmlContent += "</pre>`n"
            $inCodeBlock = $false
        } else {
            $htmlContent += "<pre>"
            $inCodeBlock = $true
        }
        continue
    }
    
    if ($inCodeBlock) {
        $escaped = $line -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
        $htmlContent += "$escaped`n"
        continue
    }
    
    # Processar headers
    if ($line -match '^# (.+)$') {
        $text = $matches[1]
        $htmlContent += "<h1>$text</h1>`n"
    }
    elseif ($line -match '^## (.+)$') {
        $text = $matches[1]
        $htmlContent += "<h2>$text</h2>`n"
    }
    elseif ($line -match '^### (.+)$') {
        $text = $matches[1]
        $htmlContent += "<h3>$text</h3>`n"
    }
    elseif ($line -match '^#### (.+)$') {
        $text = $matches[1]
        $htmlContent += "<h4>$text</h4>`n"
    }
    # Linhas horizontais
    elseif ($line -match '^---+$') {
        $htmlContent += "<hr />`n"
    }
    # Listas
    elseif ($line -match '^- (.+)$') {
        $text = $matches[1]
        # Processar inline markdown
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        $htmlContent += "<li>$text</li>`n"
    }
    elseif ($line -match '^\d+\. (.+)$') {
        $text = $matches[1]
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        $htmlContent += "<li>$text</li>`n"
    }
    # Linha vazia
    elseif ($line.Trim() -eq '') {
        $htmlContent += "<p></p>`n"
    }
    # Texto normal
    else {
        $text = $line
        # Processar negrito
        $text = $text -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        # Processar código inline
        $text = $text -replace '`(.+?)`', '<code>$1</code>'
        # Processar links
        $text = $text -replace '\[(.+?)\]\((.+?)\)', '<a href="$2">$1</a>'
        
        $htmlContent += "<p>$text</p>`n"
    }
}

$htmlContent += @"
</body>
</html>
"@

# Salvar como .doc (formato HTML que Word reconhece)
$htmlContent | Out-File -FilePath $docFile -Encoding UTF8

Write-Host ""
Write-Host "Arquivo Word criado com sucesso!" -ForegroundColor Green
Write-Host "Arquivo: $docFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Este arquivo pode ser aberto no Microsoft Word." -ForegroundColor Yellow
Write-Host "Abrindo arquivo..." -ForegroundColor Green
Write-Host ""

Start-Process $docFile
