# 🎯 OSP Marketing

Repositório central para gestão de marketing, conteúdo e onboarding da **OSP Contabilidade**.

## 📋 Sobre

Este repositório é usado para:

- **Gestão de tarefas de marketing** via GitHub Issues e Projects
- **Planejamento de conteúdo** (blog, Instagram, campanhas)
- **Documentação de onboarding** para novos funcionários
- **Coordenação entre equipe** de marketing e desenvolvimento

## 🗂️ Board de Tarefas

Todas as tarefas são gerenciadas no Kanban board:

👉 **[Ver Board](https://github.com/orgs/osp-group/projects/4/views/1)**

## 👥 Equipe

| Pessoa | Área | GitHub |
|--------|------|--------|
| Guilherme Pagotto | Marketing/Estratégia | [@gpagotto79](https://github.com/gpagotto79) |
| Leo Pagotto | Desenvolvimento | [@leonpagotto](https://github.com/leonpagotto) |
| Gigi | Marketing/Conteúdo | TBD |

## 🏷️ Labels

| Label | Cor | Descrição |
|-------|-----|-----------|
| `P1` | 🔴 | Alta prioridade |
| `P2` | 🟡 | Prioridade média |
| `P3` | 🟢 | Baixa prioridade |
| `onboarding` | 🟣 | Tarefas de onboarding |
| `content` | 🩵 | Criação de conteúdo |
| `ads` | 🟠 | Campanhas pagas |
| `dev` | 🔵 | Desenvolvimento/Tech |

## 📁 Estrutura

```
marketing/
├── docs/
│   ├── materiais-corporativos/    # Gestão de materiais corporativos
│   │   ├── CHECKLIST.md           # Checklist rápido de atualização
│   │   ├── gestao-logos-clientes.md    # Gestão de logos
│   │   └── guia-atualizacao-proposta.md # Guia de atualização
│   ├── onboarding/                # Documentação de onboarding
│   ├── processos/                 # Processos de marketing
│   └── templates/                 # Templates de conteúdo
├── content/
│   ├── blog/                # Artigos e posts
│   ├── social/              # Conteúdo para redes sociais
│   └── campaigns/           # Material de campanhas
└── assets/
    ├── logos/
    │   └── clientes/        # Logos de clientes
    │       ├── ativos/      # Clientes atuais
    │       └── inativos/    # Ex-clientes (arquivo)
    ├── images/              # Imagens e gráficos
    └── videos/              # Vídeos e thumbnails
```

## 📝 Materiais Corporativos

### Atualização de Logos de Clientes (Janeiro 2026)

**🚨 Ação necessária:** Atualizar material de propostas removendo 23 empresas que saíram da OSP.

**Documentação:**
- 📊 [Resumo Executivo](docs/materiais-corporativos/RESUMO-EXECUTIVO.md) - Visão geral do projeto
- 📋 [Checklist Rápido](docs/materiais-corporativos/CHECKLIST.md) - Ações imediatas
- 📚 [Guia de Atualização](docs/materiais-corporativos/guia-atualizacao-proposta.md) - Processo completo
- 🏢 [Gestão de Logos](docs/materiais-corporativos/gestao-logos-clientes.md) - Tracking e organização

**Passos:**
1. Remover logos das 23 empresas ex-clientes
2. Fazer levantamento de novos clientes relevantes
3. Coletar logos em alta qualidade
4. Selecionar 10-15 logos para material
5. Atualizar templates de proposta

## 🔗 Links Úteis

- **Site OSP:** [ospcontabilidade.com.br](https://ospcontabilidade.com.br)
- **Dashboard Admin:** [osp-website-2026.web.app/admin](https://osp-website-2026.web.app/admin)
- **Repo Principal:** [osp-group/contabilidade](https://github.com/osp-group/contabilidade)

## 🚀 Como Usar

### Criar uma nova tarefa

```bash
gh issue create --repo osp-group/marketing --title "Título da tarefa" --body "Descrição"
```

### Ver tarefas por pessoa

```bash
# Tarefas do Guilherme
gh issue list --repo osp-group/marketing --label "guilherme"

# Tarefas do Leo
gh issue list --repo osp-group/marketing --label "leo"

# Tarefas do Gigi
gh issue list --repo osp-group/marketing --label "gigi"
```

### Ver tarefas por prioridade

```bash
gh issue list --repo osp-group/marketing --label "P1"
```

## 📞 Contato

Para dúvidas sobre este repositório, abra uma issue ou entre em contato com a equipe.

---

**OSP Contabilidade** © 2026
