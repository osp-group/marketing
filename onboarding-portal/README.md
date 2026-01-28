<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-1Id-_Cdb6bJAmEdiJUbPASaxG89V6F2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Team Photos Sync

To display the team gallery ("Equipe" section), this app loads photos and a manifest from [public/team](public/team).

- Source of truth (repo): ../OSPMarketing/onboarding-portal/public/team
- Local app folder: [public/team](public/team)

### Quick sync

Use the provided npm script to sync from the OSPMarketing repo into this app:

```powershell
Push-Location "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal"
& "C:\\Program Files\\nodejs\\npm.cmd" run sync:team
```

This copies all subfolders and files (including team.json) from
`C:\\Users\\OSP\\Downloads\\OSPMarketing\\onboarding-portal\\public\\team` to public/team.

### Custom paths

You can specify source/destination manually:

```powershell
powershell -ExecutionPolicy Bypass -File .\\scripts\\sync-team.ps1 -Source "C:\\path\\to\\team" -Dest "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal\\public\\team"
```

### Import from local "Fotos dos colaboradores"

If your local folder contains raw collaborator photos organized by department names, use the importer:

```powershell
Push-Location "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal"
& "C:\\Program Files\\nodejs\\npm.cmd" run sync:photos
```

This scans `C:\\Users\\OSP\\Downloads\\Fotos dos colaboradores` for JPG/PNG/WebP files, maps folders to department keys
(Contábil → `DPT_Contabil`, Pessoal/DP → `DPT_Pessoal`, Fiscal/Tributário → `DPT_Fiscal`, Sucesso/Cliente/Relacionamento → `Sucesso_Do_Cliente`),
copies images into [public/team](public/team) subfolders, and generates [public/team/team.json](public/team/team.json).

You can customize the source/destination:

```powershell
powershell -ExecutionPolicy Bypass -File .\\scripts\\import-team-photos.ps1 -Source "C:\\path\\to\\Fotos dos colaboradores" -Dest "C:\\Users\\OSP\\Downloads\\osp-onboarding-portal\\public\\team"
```

### Remote base URL (optional)

Set TEAM_BASE_URL to point to a remote location (e.g., GitHub raw):

Create [.env](.env) with:

```
TEAM_BASE_URL=https://raw.githubusercontent.com/osp-group/marketing/main/onboarding-portal/public/team
```

Restart `npm run dev`. The app will fetch TEAM_BASE_URL/team.json and images via that base.
