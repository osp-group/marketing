# 📸 Como Atualizar o Portal - Guia Rápido

## 🎯 Atualizar Novo Colaborador

### Passo 1: Edite o arquivo `config.json`
Abra o arquivo `config.json` e preencha:

```json
{
  "newEmployee": {
    "name": "Maria Silva",
    "photo": "/team/DPT_Contabil/Maria_Analista_DPT_Contabil.jpeg"
  }
}
```

✏️ **name** → Nome completo do novo colaborador  
📷 **photo** → Caminho da foto (comece com `/team/`)

### Passo 2: Coloque a foto na pasta correta
Copie a foto para: `public/team/[DEPARTAMENTO]/`

**Exemplo:**
```
public/team/DPT_Contabil/Maria_Analista_DPT_Contabil.jpeg
```

### Passo 3: Salve e atualize a página
- Salve o arquivo `config.json`
- Atualize a página no navegador (F5)
- Pronto! ✅

---

## 👥 Adicionar Colaborador ao Time

### Passo 1: Coloque a foto na pasta do departamento
```
public/team/Marketing/Joao_Analista_Marketing.jpeg
```

### Passo 2: Edite `public/team/team.json`
Adicione uma nova entrada no arquivo:

```json
{
  "name": "João",
  "role": "Analista",
  "department": "Marketing",
  "path": "Marketing/Joao_Analista_Marketing.jpeg"
}
```

### Passo 3: Salve e atualize
Pronto! O colaborador aparecerá automaticamente no departamento.

---

## 📁 Departamentos Disponíveis

Use estes nomes EXATAMENTE como estão:

- `DPT_Contabil` → Departamento Contábil
- `DPT_Fiscal` → Departamento Fiscal
- `DPT_Pessoal` → Departamento Pessoal
- `Marketing` → Marketing
- `Comercial` → Comercial
- `Moby` → Moby
- `RH` → Recursos Humanos
- `Relacionamento_ADM` → Administrativo
- `Sucesso_Do_Cliente` → Sucesso do Cliente

---

## 🔄 Como Funciona?

### Novo Colaborador (Destaque na Capa)
1. Edite `config.json` → nome e foto
2. Salve
3. Atualize a página

### Colaborador no Time (Lista por Departamento)
1. Coloque foto em `public/team/[DEPARTAMENTO]/`
2. Adicione entrada em `team.json`
3. Salve
4. Atualize a página

---

## ✅ Exemplo Completo

**Situação:** Nova analista chamada "Ana Costa" entrando no Departamento Fiscal

### 1. Atualizar Destaque (Novo Colaborador)

**config.json:**
```json
{
  "newEmployee": {
    "name": "Ana Costa",
    "photo": "/team/DPT_Fiscal/Ana_Analista_DPT_Fiscal.jpeg"
  }
}
```

### 2. Adicionar ao Time Fiscal

**Foto:** Colocar em `public/team/DPT_Fiscal/Ana_Analista_DPT_Fiscal.jpeg`

**team.json:** Adicionar:
```json
{
  "name": "Ana",
  "role": "Analista",
  "department": "DPT_Fiscal",
  "path": "DPT_Fiscal/Ana_Analista_DPT_Fiscal.jpeg"
}
```

### 3. Salvar e Atualizar
Salve os 2 arquivos e atualize o navegador!

---

## ⚠️ Atenção!

✅ **FAÇA:**
- Use exatamente os nomes dos departamentos listados acima
- Mantenha as extensões dos arquivos (.jpeg, .jpg, .png)
- Coloque as fotos nas pastas corretas dentro de `public/team/`

❌ **NÃO FAÇA:**
- Não invente nomes de departamentos
- Não esqueça a barra no início do caminho (`/team/...`)
- Não use acentos ou caracteres especiais nos nomes de arquivo

---

## 🆘 Problemas?

**Foto não aparece:**
- Verifique se a foto está em `public/team/[DEPARTAMENTO]/`
- Confirme se o caminho no arquivo está correto
- Pressione Ctrl + Shift + R para limpar cache

**Nome errado:**
- Verifique se salvou o arquivo `config.json`
- Confira se não tem vírgulas ou aspas faltando no JSON

**Não atualizou:**
- Salve TODOS os arquivos editados
- Atualize a página com F5
- Se não funcionar, reinicie: `npm run dev`

---

## 📞 Contatos

Se tiver dúvidas, entre em contato com:
- **Marketing:** mkt@osp.com.br
- **RH:** Mariely@osp.com.br
