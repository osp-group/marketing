# 🎨 Ícones dos Produtos OSP

Esta pasta contém os ícones SVG de todas as soluções e produtos da OSP Contabilidade.

## 📦 Ícones Disponíveis

### Contabilidade e Fiscal

#### 1. BPO Contábil, Fiscal e Pessoal
**Arquivo:** `bpo-contabil.svg`  
**Descrição:** Documento com gráfico de barras representando relatórios contábeis e análises  
**Uso:** BPO mensal, Lucro Real Standard/Consultivo  
**Cores:** Azul OSP (#002147)

#### 2. BPO Financeiro
**Arquivo:** `bpo-financeiro.svg`  
**Descrição:** Calculadora representando gestão financeira e contas a pagar/receber  
**Uso:** Terceirização do departamento financeiro  
**Cores:** Azul OSP (#002147)

---

### Soluções 360

#### 3. REFORMA360
**Arquivo:** `reforma360.svg`  
**Descrição:** Círculo com setas de rotação indicando mudança/reforma tributária  
**Uso:** Análise de impacto da Reforma Tributária  
**Cores:** Azul OSP (#002147)

#### 4. TRIBUTA360
**Arquivo:** `tributa360.svg`  
**Descrição:** Moedas sobrepostas com símbolo de porcentagem e seta para baixo  
**Uso:** Planejamento tributário e redução de carga fiscal  
**Cores:** Azul OSP (#002147)

#### 5. HOLDING360
**Arquivo:** `holding360.svg`  
**Descrição:** Guarda-chuva protegendo elementos familiares/patrimoniais  
**Uso:** Estruturação patrimonial e proteção de ativos  
**Cores:** Azul OSP (#002147)

#### 6. PRECIFICA360
**Arquivo:** `precifica360.svg`  
**Descrição:** Etiqueta de preço com cifrão e seta de crescimento  
**Uso:** Análise de margem e estratégia de precificação  
**Cores:** Azul OSP (#002147)

#### 7. OSP360
**Arquivo:** `osp360.svg`  
**Descrição:** Lupa com gráfico interno representando diagnóstico  
**Uso:** Diagnóstico estratégico completo do negócio  
**Cores:** Azul OSP (#002147)

#### 8. GESTÃO360
**Arquivo:** `gestao360.svg`  
**Descrição:** Dashboard com múltiplos gráficos e KPIs  
**Uso:** CFO as a Service, suporte à gestão executiva  
**Cores:** Azul OSP (#002147)

#### 9. FUNDAR360
**Arquivo:** `fundar360.svg`  
**Descrição:** Foguete representando startup e estruturação de novos negócios  
**Uso:** Estruturação e abertura de empresas  
**Cores:** Azul OSP (#002147)

---

### Consultoria e Educação

#### 10. Consultoria360
**Arquivo:** `consultoria360.svg`  
**Descrição:** Pessoas em reunião com círculo 360 ao redor  
**Uso:** Consultoria personalizada, squad dedicado  
**Cores:** Azul OSP (#002147)

#### 11. OSP Educação
**Arquivo:** `educacao.svg`  
**Descrição:** Capelo de formatura com livro  
**Uso:** Treinamentos, mentorias, capacitação  
**Cores:** Azul OSP (#002147)

---

## 🎨 Especificações Técnicas

### Formato
- **Tipo:** SVG (Scalable Vector Graphics)
- **Tamanho:** 64x64px (viewBox padrão)
- **Escalável:** Sim, sem perda de qualidade

### Cores
- **Cor principal:** `#002147` (Azul OSP)
- **Stroke width:** 2px (padrão)
- **Fundo:** Transparente

### Compatibilidade
- ✅ Web (HTML/CSS)
- ✅ Figma, Adobe Illustrator, Sketch
- ✅ Documentos (Word, PowerPoint, PDF)
- ✅ Impressão (vetor escalável)

---

## 💡 Como Usar

### No HTML
```html
<img src="/assets/icons/produtos/reforma360.svg" alt="REFORMA360" width="64" height="64">
```

### No CSS (background)
```css
.icon-reforma {
  background-image: url('/assets/icons/produtos/reforma360.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
}
```

### No React/JSX
```jsx
import Reforma360Icon from '@/assets/icons/produtos/reforma360.svg';

<img src={Reforma360Icon} alt="REFORMA360" className="w-16 h-16" />
```

### Em Documentos (Word, PowerPoint)
1. Inserir → Imagem
2. Selecionar arquivo SVG
3. Redimensionar conforme necessário

### Em Design (Figma, Illustrator)
1. Arrastar arquivo SVG para o canvas
2. Ou: Arquivo → Importar → Selecionar SVG
3. Editar cores e formas conforme necessário

---

## 🎯 Variações e Customizações

### Alterar Cor
Abra o arquivo SVG em editor de texto e substitua:
```svg
<!-- De -->
stroke="#002147" fill="#002147"

<!-- Para (exemplo: branco) -->
stroke="#FFFFFF" fill="#FFFFFF"
```

### Alterar Tamanho
```svg
<!-- Original -->
<svg width="64" height="64" viewBox="0 0 64 64">

<!-- Maior -->
<svg width="128" height="128" viewBox="0 0 64 64">
```

### Criar Versão Monocromática
Todos os ícones já são monocromáticos (apenas azul OSP)

---

## 📋 Checklist de Uso por Mídia

### Para Redes Sociais
- ✅ Instagram: Usar tamanho 512px ou maior
- ✅ LinkedIn: Usar tamanho 400px ou maior
- ✅ Facebook: Usar tamanho 400px ou maior

### Para Website
- ✅ Hero/Banner: 128px - 256px
- ✅ Cards de Produto: 64px - 96px
- ✅ Ícones de Menu: 24px - 32px

### Para Impressão
- ✅ Folders: Usar SVG direto (vetor)
- ✅ Banners: Exportar em alta resolução (300dpi+)
- ✅ Materiais corporativos: Manter formato SVG

### Para Apresentações
- ✅ PowerPoint/Google Slides: 128px - 256px
- ✅ PDF: Manter como vetor SVG

---

## 🔄 Exportar em Outros Formatos

### Converter SVG para PNG
```bash
# Usando Inkscape (comando linha)
inkscape --export-type=png --export-width=512 reforma360.svg

# Usando ImageMagick
convert -background none -density 300 reforma360.svg reforma360.png
```

### Converter SVG para PDF
```bash
# Usando Inkscape
inkscape --export-type=pdf reforma360.svg
```

### Online (sem instalar nada)
- CloudConvert: https://cloudconvert.com/svg-to-png
- Convertio: https://convertio.co/svg-png/

---

## 📂 Organização dos Arquivos

```
public/assets/icons/produtos/
├── bpo-contabil.svg
├── bpo-financeiro.svg
├── reforma360.svg
├── tributa360.svg
├── holding360.svg
├── precifica360.svg
├── osp360.svg
├── gestao360.svg
├── fundar360.svg
├── consultoria360.svg
├── educacao.svg
└── README.md (este arquivo)
```

---

## 🎨 Paleta de Cores OSP

Para manter consistência visual:

```css
--osp-blue-primary: #002147;
--osp-blue-light: #1e3a8a;
--osp-white: #FFFFFF;
--osp-gray-light: #F3F4F6;
--osp-gray-dark: #374151;
```

---

## 📞 Suporte e Dúvidas

**Design/Marketing:**
- Guilherme Pagotto: mkt@osp.com.br

**Desenvolvimento:**
- Leo Pagotto: dev@osp.com.br

**Geral:**
- atendimento@osp.com.br
- (19) 99321-6091

---

## 📝 Notas de Versão

**Versão 1.0** - Fevereiro 2026
- Criação inicial de 11 ícones SVG
- Todos os produtos OSP cobertos
- Padrão de design estabelecido

---

**OSP Contabilidade** © 2026  
*Inteligência contábil para decisões que transformam negócios*
