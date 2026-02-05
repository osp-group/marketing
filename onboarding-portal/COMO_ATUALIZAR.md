# Como Atualizar o Portal de Onboarding

## 📝 Atualizar Novo Colaborador

### Opção 1: Arquivo de Configuração (Recomendado)
Edite o arquivo **`config.json`** na raiz do projeto:

```json
{
  "newEmployee": {
    "name": "Maria Silva",
    "photo": "/team/DPT_Contabil/Maria_Analista_DPT_Contabil.jpeg"
  }
}
```

- **name**: Nome completo do novo colaborador
- **photo**: Caminho da foto (deve estar em `public/team/`)

### Opção 2: URL com Parâmetros
Acesse a URL com parâmetros:
```
http://localhost:3000/?nome=Maria Silva&foto=DPT_Contabil/Maria_Analista_DPT_Contabil.jpeg
```

**Nota**: Os parâmetros da URL têm prioridade sobre o `config.json`

---

## 👥 Atualizar Times/Equipes

### 1. Adicionar Foto do Colaborador
Coloque a foto na pasta correspondente:
```
public/team/[DEPARTAMENTO]/Nome_Cargo_Departamento.jpeg
```

**Departamentos disponíveis:**
- `DPT_Contabil`
- `DPT_Fiscal`
- `DPT_Pessoal`
- `Moby`
- `RH`
- `Relacionamento_ADM`
- `Sucesso_Do_Cliente`
- `Marketing`
- `Comercial`

### 2. Atualizar o Arquivo team.json
Edite **`public/team/team.json`** e adicione uma nova entrada:

```json
{
  "name": "Maria",
  "role": "Analista",
  "department": "DPT_Contabil",
  "path": "DPT_Contabil/Maria_Analista_DPT_Contabil.jpeg"
}
```

**Campos:**
- **name**: Primeiro nome (será exibido no card)
- **role**: Cargo/função (aparece abaixo do nome)
- **department**: Código do departamento (usar os códigos acima)
- **path**: Caminho relativo da foto dentro de `/team/`

### 3. Atualizar Gestores de Departamento
Edite **`constants.tsx`** na seção `DEPARTMENTS`:

```tsx
{
  name: 'Contábil',
  color: 'blue',
  manager: {
    name: 'Novo Gestor',
    role: 'Gestor Contábil',
    image: '/team/DPT_Contabil/Gestor_DPT_Contabil.jpeg',
    email: 'gestor@osp.com.br'
  },
  members: [
    { name: 'Time de Analistas', role: 'Execução Técnica' },
    // ...
  ]
}
```

---

## 🏢 Atualizar Logos de Clientes

Edite **`constants.tsx`** na seção `CLIENT_LOGOS`:

```tsx
export const CLIENT_LOGOS: string[] = [
  '/team/Misc/nova_empresa_logo.png',
  '/team/Misc/outra_empresa_logo.jpg',
  // ... máximo 15 logos
];
```

1. Adicione o logo em `public/team/Misc/`
2. Adicione o caminho no array `CLIENT_LOGOS`
3. Mantenha 15 logos para melhor visualização

---

## 🔧 Atualizar Tecnologias

Edite **`constants.tsx`** na seção `TECHNOLOGIES`:

```tsx
export const TECHNOLOGIES: Technology[] = [
  { 
    name: 'Nova Ferramenta', 
    description: 'Descrição da ferramenta', 
    logo: '/assets/logo/tech/ferramenta_logo.png' 
  },
  // ...
];
```

1. Adicione o logo em `public/assets/logo/tech/`
2. Adicione a entrada no array

---

## 🎨 Atualizar Foto "Sobre a OSP"

1. Adicione a nova foto em `public/assets/sobre/`
2. Edite **`App.tsx`** (linha ~370):

```tsx
<img src="/assets/sobre/nova_foto.png" alt="Equipe OSP" className="w-full h-[700px] object-cover object-top" />
```

---

## 🚀 Aplicar Mudanças

Após fazer qualquer atualização:

1. Salve os arquivos editados
2. O Vite recarregará automaticamente
3. Atualize a página no navegador (F5)

**Se não atualizar automaticamente**, reinicie o servidor:
```bash
npm run dev
```

---

## 📋 Checklist de Atualização

- [ ] Foto do novo colaborador adicionada em `public/team/[DEPT]/`
- [ ] `config.json` atualizado com nome e foto
- [ ] `team.json` atualizado com nova entrada
- [ ] Página atualizada no navegador
- [ ] Nome e foto aparecem corretamente
- [ ] Foto aparece no departamento correto

---

## ⚠️ Problemas Comuns

**Foto não aparece:**
- Verifique se o caminho está correto
- Verifique se a foto está na pasta `public/team/`
- Verifique a extensão do arquivo (.jpeg, .jpg, .png)

**Nome não atualiza:**
- Limpe o cache do navegador (Ctrl + Shift + R)
- Verifique se salvou o `config.json`
- Reinicie o servidor de desenvolvimento

**Departamento errado:**
- Verifique o código do departamento no `team.json`
- Use exatamente os códigos listados (case-sensitive)
