# 📄 Template de Proposta Comercial OSP

Este diretório contém o template genérico de proposta comercial da OSP Contabilidade.

## 📋 Arquivos

- **Proposta_Comercial_OSP_Template.md** - Template em Markdown (editável)
- **generate-proposta.ps1** - Script para gerar Word/PDF
- **README.md** - Este arquivo (instruções)

## 🚀 Como Usar

### Opção 1: Editar e Gerar Automaticamente

1. **Edite o template** `Proposta_Comercial_OSP_Template.md`:
   - Substitua os campos entre colchetes `[CAMPO]`
   - Personalize serviços, valores e escopo
   - Ajuste cronograma conforme necessidade

2. **Execute o script** para gerar Word/PDF:

```powershell
# Gerar Word (padrão)
.\generate-proposta.ps1

# Gerar apenas PDF
.\generate-proposta.ps1 -PDF

# Gerar ambos (Word + PDF)
.\generate-proposta.ps1 -All
```

3. **Arquivo será aberto automaticamente** após geração

### Opção 2: Usar Template Diretamente

1. Abra `Proposta_Comercial_OSP_Template.md` em qualquer editor
2. Copie o conteúdo
3. Cole em Word/Google Docs
4. Formate conforme necessário
5. Exporte como PDF

## 📦 Pré-requisitos (para geração automática)

### Instalar Pandoc

**Windows:**
```powershell
# Via Chocolatey
choco install pandoc

# Via winget
winget install --id JohnMacFarlane.Pandoc

# Ou download manual: https://pandoc.org/installing.html
```

### Instalar LaTeX (opcional - apenas para PDF)

**Windows:**
```powershell
# Via Chocolatey
choco install miktex

# Ou download manual: https://miktex.org/download
```

**Alternativa sem LaTeX:**
- O script gera HTML que pode ser convertido em PDF pelo navegador
- Use Ctrl+P → "Salvar como PDF" no navegador

## ✏️ Campos Personalizáveis

### Dados do Cliente
- `[Nome da Empresa]`
- `[00.000.000/0000-00]` (CNPJ)
- `[Logradouro, número, complemento]`
- `[Cidade - UF]`
- `[00000-000]` (CEP)
- `[Nome do Responsável]`
- `[Cargo]`
- `[email@empresa.com.br]`
- `[(00) 00000-0000]`

### Proposta
- `[DD/MM/AAAA]` (Data)
- `[NÚMERO]` (Número da proposta)
- `[ANO]` (Ano)
- `[NOME DA SOLUÇÃO]` (ex: BPO Contábil, Fiscal e Pessoal)

### Serviços e Valores
- `[Serviço 1]`, `[Serviço 2]`, etc.
- `[R$ 0.000,00]` (Valores)
- `[XX]` (Dia de vencimento)

### Consultor
- `[Nome]` (do consultor)
- `[Cargo]` (ex: Consultor Comercial)
- `[email@osp.com.br]`
- `[Telefone direto]`

## 📑 Estrutura da Proposta

1. **Apresentação da OSP** - Quem somos, missão, valores, números
2. **Escopo dos Serviços** - Detalhamento do que será entregue
3. **Metodologia** - Como trabalhamos (4 fases)
4. **Investimento** - Valores e condições de pagamento
5. **Benefícios** - Resultados tangíveis e intangíveis
6. **Cronograma** - Timeline de implementação
7. **Próximos Passos** - Como proceder
8. **Equipe OSP** - Quem estará envolvido
9. **Localização** - Endereços dos escritórios
10. **Contato** - Canais de comunicação
11. **Confidencialidade** - Declaração legal
12. **Aceite** - Assinatura do cliente

## 🎨 Personalização Avançada

### Para adicionar logotipo

No template Markdown, a linha:
```markdown
![Logo OSP](../../public/assets/logo/Logo%20OSP%20Azul.png)
```

Certifique-se que o caminho do logo está correto ou use URL completa.

### Para criar documento de referência (Word)

1. Gere uma proposta inicial
2. Abra no Word e formate (cores, fontes, espaçamentos)
3. Salve como `reference.docx` nesta pasta
4. Próximas gerações usarão esse estilo automaticamente

## 💡 Exemplos de Uso

### BPO Contábil, Fiscal e Pessoal

```markdown
### BPO Contábil, Fiscal e Pessoal

**Objetivo:**  
Garantir conformidade total nas rotinas contábil, fiscal e trabalhista...

#### Serviços Inclusos
- ✓ Escrituração Contábil Completa (SPED Contábil)
- ✓ Apuração e Escrituração Fiscal (SPED Fiscal)
- ✓ Processamento de Folha de Pagamento e eSocial
...
```

### Consultoria Tributária

```markdown
### Consultoria em Planejamento Tributário

**Objetivo:**  
Reduzir carga tributária de forma legal e segura...

#### Serviços Inclusos
- ✓ Diagnóstico tributário completo
- ✓ Simulação de cenários fiscais
- ✓ Implementação de estratégias de economia
...
```

## 📞 Suporte

**Dúvidas sobre o template:**
- Marketing OSP: mkt@osp.com.br
- Comercial OSP: atendimento@osp.com.br

**Problemas técnicos:**
- Leo Pagotto (Desenvolvimento)
- Guilherme Pagotto (Marketing)

## 📝 Notas Importantes

✅ **Sempre revise** os valores e informações antes de enviar  
✅ **Personalize** o texto para cada cliente  
✅ **Valide** juridicamente quando necessário  
✅ **Mantenha** cópia de todas propostas enviadas  
✅ **Acompanhe** o status com o cliente  

## 🔄 Versionamento

**Versão atual:** 1.0  
**Última atualização:** Fevereiro 2026  
**Responsável:** Equipe Marketing OSP

---

**OSP Contabilidade** © 2026  
*Inteligência contábil para decisões que transformam negócios*
