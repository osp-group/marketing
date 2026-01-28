<div align="center">
  <h1>📘 OSP Onboarding Portal</h1>
  <p>Aplicação web do portal de onboarding da OSP Contabilidade, parte do repositório <a href="https://github.com/osp-group/marketing">osp-group/marketing</a> (pasta <code>onboarding-portal</code>).</p>
</div>

## 📋 Sobre

Este projeto entrega o portal de onboarding para novos colaboradores e parceiros, com:
- Seções institucionais, equipe e parceiros
- Assets versionados em <a href="https://github.com/osp-group/marketing/tree/main/onboarding-portal/public">public/</a>
- Templates e docs em <a href="https://github.com/osp-group/marketing/tree/main/onboarding-portal/docs">docs/</a>

Para organização geral de marketing, consulte o README do repositório principal: <a href="https://github.com/osp-group/marketing">osp-group/marketing</a>.

## 🚀 Executar localmente

Pré-requisitos: Node.js (v18+ recomendado)

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Rodar em desenvolvimento:
   ```bash
   npm run dev
   ```
3. Build de produção (opcional):
   ```bash
   npm run build
   npm run preview
   ```

## 👥 Galeria da Equipe (Sync)

A exibição da equipe usa imagens e um manifesto em [public/team](public/team).

- Fonte de verdade (repo): https://github.com/osp-group/marketing/tree/main/onboarding-portal/public/team
- Pasta local do app: [public/team](public/team)

### Sync rápido (PowerShell)

Use o script para sincronizar do repositório de marketing para este app:

```powershell
Push-Location "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal"
& "C:\\Program Files\\nodejs\\npm.cmd" run sync:team
```

Isso copia subpastas e arquivos (incluindo team.json) de
`https://github.com/osp-group/marketing/tree/main/onboarding-portal/public/team` para `public/team`.

### Caminhos customizados

Você pode especificar origem/destino manualmente:

```powershell
powershell -ExecutionPolicy Bypass -File .\\scripts\\sync-team.ps1 -Source "C:\\path\\to\\team" -Dest "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal\\public\\team"
```

### Importar de "Fotos dos colaboradores" (local)

Se houver uma pasta local com fotos por departamento, use o importador:

```powershell
Push-Location "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal"
& "C:\\Program Files\\nodejs\\npm.cmd" run sync:photos
```

O script busca JPG/PNG/WebP em `C:\\Users\\OSP\\Downloads\\Fotos dos colaboradores`, mapeia as pastas para chaves
(Contábil → `DPT_Contabil`, Pessoal/DP → `DPT_Pessoal`, Fiscal/Tributário → `DPT_Fiscal`, Sucesso/Cliente/Relacionamento → `Sucesso_Do_Cliente`),
copia para subpastas de [public/team](public/team) e gera [public/team/team.json](public/team/team.json).

Você pode customizar origem/destino:

```powershell
powershell -ExecutionPolicy Bypass -File .\\scripts\\import-team-photos.ps1 -Source "C:\\path\\to\\Fotos dos colaboradores" -Dest "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal\\public\\team"
```

### Base remota (opcional)

Para carregar os assets remotamente, defina `TEAM_BASE_URL` em [.env](.env):

```
TEAM_BASE_URL=https://raw.githubusercontent.com/osp-group/marketing/main/onboarding-portal/public/team
```

Reinicie `npm run dev`. O app buscará `TEAM_BASE_URL/team.json` e imagens a partir dessa base.

---

OSP Contabilidade © 2026
