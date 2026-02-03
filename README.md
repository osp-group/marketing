# 🎯 OSP Marketing

Repositório central para gestão de marketing, conteúdo e onboarding da **OSP Contabilidade**.

## 📋 Sobre

Este repositório é usado para:

- **Gestão de tarefas de marketing** via GitHub Issues e Projects
- **Planejamento de conteúdo** (blog, Instagram, campanhas)
- **Portal de Onboarding** para novos funcionários (aplicação React)
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

Este repositório contém o portal de onboarding na raiz:

```
marketing/
├── App.tsx, index.tsx       # Portal de onboarding (React + Vite)
├── public/                  # Assets públicos (fotos, logos, team)
├── docs/                    # Documentação OSP
├── scripts/                 # Scripts de automação
├── INSTRUÇÕES_SIMPLES.md    # Guia fácil para atualizar portal
├── ABRIR_PORTAL.html        # Acesso rápido ao webapp
└── config.json              # Configuração do novo colaborador
```

## 🚀 Portal de Onboarding

O portal de onboarding é uma aplicação React para receber novos colaboradores.

**Acesso rápido:**
- 🌐 **[Abrir Portal](https://osp-group.github.io/marketing/)** - Clique aqui para acessar o webapp online
- 📖 [Instruções Simples](INSTRUÇÕES_SIMPLES.md) - Como atualizar fotos e informações
- 🔧 [Guia Completo](COMO_ATUALIZAR.md) - Documentação técnica completa

**Para rodar localmente:**
```bash
npm install
npm run dev
```

Portal disponível em: http://localhost:3000

## � Gerenciamento de Fotos da Equipe (RH)

### Como Atualizar Fotos e Membros no Portal de Onboarding

Esta seção é para a equipe de RH gerenciar as fotos dos colaboradores no portal de onboarding.

#### 📁 Estrutura de Pastas

As fotos da equipe ficam organizadas por departamento:

```
public/team/
├── DPT_Contabil/          # Departamento Contábil
├── DPT_Fiscal/            # Departamento Fiscal
├── DPT_Pessoal/           # Departamento Pessoal
├── Sucesso_Do_Cliente/    # Sucesso do Cliente
├── Relacionamento_ADM/    # Administrativo
├── RH/                    # Recursos Humanos
├── Comercial/             # Comercial
├── Marketing/             # Marketing
└── Moby/                  # Moby
```

#### ✅ Como Adicionar ou Atualizar Fotos

**Passo 1: Preparar a Foto**
- ✔️ Formato: JPG, JPEG ou PNG
- ✔️ Tamanho recomendado: 400x600 pixels (proporção retrato)
- ✔️ Fundo claro ou neutro (preferencialmente)
- ✔️ Boa iluminação e qualidade

**Passo 2: Nomear o Arquivo**

O nome do arquivo deve seguir este padrão:
```
NomeDaPessoa_NomeDoDepartamento.png
```

**Exemplos:**
```
Rafaela_Gestora_DPT_Fiscal.png
Maria_DPT_Contabil.png
João_Sucesso_Do_Cliente.png
Ana_Marketing.png
```

⚠️ **Importante:**
- Use **apenas letras** (sem acentos)
- Separe as palavras com **underline (_)**
- Não use espaços
- A extensão pode ser `.png`, `.jpg` ou `.jpeg`

**Passo 3: Colocar na Pasta Correta**

1. Abra a pasta do projeto: `osp-onboarding-portal`
2. Navegue até: `public/team/`
3. Escolha a pasta do departamento correspondente
4. Cole a foto lá dentro

**Passo 4: Atualizar o Sistema**

Se for uma **foto nova** (novo colaborador):
- A foto aparecerá automaticamente no portal
- Basta reiniciar o servidor de desenvolvimento

Se for **atualização de foto existente**:
- Substitua o arquivo antigo pelo novo (mesmo nome)
- Se mudar o nome, atualize também no arquivo `constants.tsx`

#### 🔄 Como Atualizar Informações de Gestores

Para atualizar a foto ou informação de um gestor de departamento:

1. Abra o arquivo: `constants.tsx`
2. Procure a seção `DEPARTMENTS`
3. Encontre o departamento desejado
4. Atualize a linha `image:` com o caminho da nova foto

**Exemplo:**
```typescript
{
  name: 'Fiscal e Tributário',
  manager: {
    name: 'Rafaela Oliveira',
    role: 'Gestora Fiscal',
    image: '/team/DPT_Fiscal/Rafaela_Gestora_DPT_Fiscal.png', // ← Atualizar aqui
    email: 'rafaela@osp.com.br'
  }
}
```

#### 🆕 Como Adicionar um Novo Colaborador

1. **Tire/receba a foto** seguindo as diretrizes acima
2. **Renomeie** conforme o padrão
3. **Cole** na pasta do departamento correto em `public/team/`
4. **Pronto!** O sistema detecta automaticamente

#### ❓ Dúvidas Comuns

**P: A foto não aparece no portal**
R: Verifique se:
- O arquivo está na pasta correta (`public/team/DEPARTAMENTO/`)
- O nome do arquivo está correto (sem espaços, com underline)
- O servidor foi reiniciado após adicionar a foto

**P: Como remover um colaborador?**
R: Delete a foto da pasta correspondente e reinicie o servidor

**P: Posso usar fotos em outros formatos?**
R: Sim, `.jpg`, `.jpeg` e `.png` funcionam. Evite formatos como `.gif` ou `.webp`

**P: Como atualizar o nome de exibição?**
R: O nome é extraído automaticamente do nome do arquivo. Para personalizar, edite o arquivo `constants.tsx`

#### 📞 Precisa de Ajuda?

Entre em contato com:
- **Desenvolvimento:** Leo Pagotto
- **Marketing:** Guilherme Pagotto
- **Email:** mkt@osp.com.br

## �🔗 Links Úteis

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

- **Marketing:** mkt@osp.com.br
- **RH:** Mariely@osp.com.br

---

**OSP Contabilidade** © 2026
