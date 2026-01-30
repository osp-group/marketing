# Google Drive – Estrutura de Marketing

Este guia cria automaticamente a estrutura abaixo no Google Drive em Pastas Compartilhadas (Shared drives) > "Marketing":

```
01_[TEMA] __ 02_[SEGMENTO]
│
├─ 00_BRIEFING_DO_TEMA
│   ├─ 01_Dor_Principal.md
│   ├─ 02_Contexto_e_Timing.md
│   └─ 03_Objetivo_do_Conteudo.md
│
├─ 01_Educativo
│   ├─ 01_Roteiros
│   ├─ 02_Brutos
│   └─ 03_Editados
│
├─ 02_Tecnico_Educativo
│   ├─ 01_Roteiros
│   ├─ 02_Brutos
│   └─ 03_Editados
│
└─ 03_Venda
    ├─ 01_Roteiros
    ├─ 02_Brutos
    └─ 03_Editados
```

## Como executar (Apps Script)

1. Acesse https://script.new (projeto standalone do Google Apps Script).
2. No editor, abra Services (barra lateral esquerda) → ative "Drive API (v2)" em Advanced Google Services.
3. Em Project Settings (engrenagem) → Google Cloud Platform (GCP) → abra o projeto e ative a Drive API caso solicitado.
4. Copie o conteúdo de `scripts/gdrive-create-marketing-structure.gs` e cole no editor do Apps Script.
5. Edite a função `run()` e defina `tema` e `segmento` (ex.: `"Imposto de Renda"`, `"MEI"`).
6. Execute a função `run()` e conceda as permissões.

O script procurará o Shared Drive com nome exatamente "Marketing" e criará a estrutura na raiz desse drive. Ao final, o log mostrará o link da pasta criada.

### Se o drive não for encontrado
- Verifique o nome exato do Shared Drive.
- Alternativa: troque a função `getSharedDriveIdByName()` para retornar diretamente o ID do drive (abra o Drive, entre no shared drive e copie o valor `drive/folders/<ID>` da URL).

## Observações
- O script usa a Drive API v2 (Advanced Service) e define `supportsTeamDrives: true` para operar em pastas compartilhadas.
- Os arquivos `.md` são criados como `text/plain` (com extensão `.md`).
- Executar o script repetidas vezes criará pastas duplicadas se não houver checagem de existência prévia.
