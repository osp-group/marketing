# Script para converter Markdown para PDF usando HTML intermediário

$markdownFile = "Roteiros_Videos_Solucoes_OSP.md"
$htmlFile = "Roteiros_Videos_Solucoes_OSP.html"
$pdfFile = "Roteiros_Videos_Solucoes_OSP.pdf"

# Ler o conteúdo do Markdown
$content = Get-Content $markdownFile -Raw -Encoding UTF8

# Converter caracteres especiais
$content = $content -replace '&', '&amp;'
$content = $content -replace '<', '&lt;'
$content = $content -replace '>', '&gt;'

# Processar Markdown básico para HTML
$html = $content

# Headers
$html = $html -replace '(?m)^# (.+)$', '<h1>$1</h1>'
$html = $html -replace '(?m)^## (.+)$', '<h2>$1</h2>'
$html = $html -replace '(?m)^### (.+)$', '<h3>$1</h3>'
$html = $html -replace '(?m)^#### (.+)$', '<h4>$1</h4>'

# Bold
$html = $html -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'

# Italic
$html = $html -replace '\*(.+?)\*', '<em>$1</em>'

# Code blocks
$html = $html -replace '(?s)```(.+?)```', '<pre><code>$1</code></pre>'

# Inline code
$html = $html -replace '`(.+?)`', '<code>$1</code>'

# Links
$html = $html -replace '\[(.+?)\]\((.+?)\)', '<a href="$2">$1</a>'

# Line breaks
$html = $html -replace "`r`n`r`n", '<br><br>'
$html = $html -replace "`n`n", '<br><br>'

# Criar HTML completo
$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Roteiros de Vídeo - Soluções OSP</title>
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
        }
        h1 {
            color: #0066cc;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 10px;
            page-break-before: always;
        }
        h1:first-of-type {
            page-break-before: auto;
        }
        h2 {
            color: #0066cc;
            border-bottom: 2px solid #ccc;
            padding-bottom: 5px;
            margin-top: 30px;
        }
        h3 {
            color: #0088cc;
            margin-top: 20px;
        }
        h4 {
            color: #555;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #0066cc;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        strong {
            color: #000;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
$html
</body>
</html>
"@

# Salvar HTML
$htmlContent | Out-File -FilePath $htmlFile -Encoding UTF8

Write-Host "Arquivo HTML criado: $htmlFile" -ForegroundColor Green
Write-Host ""
Write-Host "Para gerar o PDF, você pode:" -ForegroundColor Yellow
Write-Host "1. Abrir o arquivo HTML no navegador (Chrome/Edge)" -ForegroundColor Cyan
Write-Host "2. Usar Ctrl+P para imprimir" -ForegroundColor Cyan
Write-Host "3. Selecionar 'Salvar como PDF' como destino" -ForegroundColor Cyan
Write-Host "4. Salvar como: $pdfFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Abrindo o arquivo HTML no navegador padrão..." -ForegroundColor Green

# Abrir no navegador
Start-Process $htmlFile
