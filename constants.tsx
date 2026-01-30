
import { ValueItem, Technology, Employee, Department, OnboardingTask } from './types';

export const COLORS = {
  primary: '#002147',
  secondary: '#FFFFFF',
  accent: '#1e3a8a',
};

export const VALUES: ValueItem[] = [
  { title: 'HONESTIDADE', description: 'O trabalho honesto valoriza as pessoas e cria o ambiente perfeito para o crescimento.' },
  { title: 'INTEGRIDADE', description: 'Nos transformamos a todo instante, preservando nossa essência.' },
  { title: 'RESPEITO', description: 'Cada pessoa é única e merece ser tratada desta forma.' },
  { title: 'SIMPLICIDADE', description: 'No dia-a-dia, buscamos tratar situações de forma simples, onde todos os envolvidos possam entender.' },
  { title: 'AMBIÇÃO', description: 'Somos movidos pelo desejo de viver uma vida de realizações e conquistas.' },
  { title: 'TRABALHO', description: 'Único meio para atingirmos resultados e superar limitações.' }
];

export const ONBOARDING_TASKS: OnboardingTask[] = [
  {
    title: 'Conexão com Gestores',
    description: 'Agende um café ou reunião rápida com seu gestor direto para alinhar expectativas e conhecer a dinâmica do time.'
  },
  {
    title: 'Acesso às Ferramentas',
    description: 'Certifique-se de ter acesso e cadastro ativo no Google Workspace, Gestta e demais sistemas da sua área.'
  },
  {
    title: 'Perfil Profissional',
    description: 'Atualize seus dados cadastrais, foto e assinatura de e-mail nos sistemas internos da empresa.'
  },
  {
    title: 'Estudar a Empresa',
    description: 'Dedique um tempo para ler profundamente sobre a história da OSP, nossos cases e nossa cultura.'
  },
  {
    title: 'Tirar Dúvidas',
    description: 'Anote todas as suas perguntas durante a semana e converse com seu mentor ou RH. Nenhuma dúvida é pequena demais!'
  }
];

export const TECHNOLOGIES: Technology[] = [
  { name: 'Google Workspace', description: 'Multi-ferramentas do Google', logo: '/assets/logo/tech/google woekspace Logo.png' },
  { name: 'Gestta', description: 'Plataforma de gestão contábil', logo: '/assets/logo/tech/gestta logo.png' },
  { name: 'Onvio', description: 'Documentos e informações trabalhistas', logo: '/assets/logo/tech/Onvio logo.png' },
  { name: 'Bradial Telecom', description: 'Sistema de telefonia empresarial', logo: '/assets/logo/tech/BradialTelecom logo.png' }
];

// Logos de clientes (empresas que confiam na OSP) - 15 clientes principais
export const CLIENT_LOGOS: string[] = [
  '/team/Misc/menin_engenharia_logo.jpg',
  '/team/Misc/AccervoIndustria.jpg',
  '/team/Misc/mosyle_logo.jpg',
  '/team/Misc/cooperfer_cooperativa_logo.jpg',
  '/team/Misc/logoCrisabel.png',
  '/team/Misc/wortex_logoFB.png',
  '/team/Misc/logo-tubesteel.jpg',
  '/team/Misc/greenexta.jpg',
  '/team/Misc/gruposuprema_logo.jpg',
  '/team/Misc/logo_global_moldes.png',
  '/team/Misc/SERVPRIME SERVICOS LTDA.jpg',
  '/team/Misc/bigsystemlogo.png',
  '/team/Misc/SIGIPACK INDUSTRIA E COMERCIO DE EMBALAGENS LTDA.jpg',
  '/team/Misc/PROGT INDUSTRIAL LTDA.jpg',
  '/team/Misc/everseek_logo.jpg'
];

export const PARTNERS: Employee[] = [
  {
    name: 'Gervásio Souza',
    role: 'Sócio Fundador',
    description: 'Sócio-fundador com mais de 46 anos de experiência em contabilidade estratégica.',
    image: '/assets/partners/Gervasio_Socio_Fundador.jpeg'
  },
  {
    name: 'Guilherme Pagotto',
    role: 'Sócio Empreendedor',
    description: 'Diretor Executivo da OSP. Advogado e contador com mais de 20 anos de experiência.',
    image: '/assets/partners/Guilherme_Pagotto_Socio_Vendedor.jpeg'
  },
  {
    name: 'Jonas Marinho',
    role: 'CEO',
    description: 'Diretor Executivo e liderança estratégica da OSP.',
    image: '/assets/partners/Jonas_CEO.jpeg'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    name: 'Contábil',
    color: 'blue',
    manager: {
      name: 'Jéssica Gonçalves',
      role: 'Gestora Contábil',
      image: '/team/DPT_Contabil/Jessica_DPT_Contabil.jpeg',
      email: 'jessica@osp.com.br'
    },
    members: [
      { name: 'Time de Analistas', role: 'Execução Técnica' },
      { name: 'Time de Assistentes', role: 'Suporte Operacional' },
      { name: 'Time de Auxiliares', role: 'Apoio Administrativo' }
    ]
  },
  {
    name: 'Fiscal e Tributário',
    color: 'indigo',
    manager: {
      name: 'Rafaela Oliveira',
      role: 'Gestora Fiscal',
      image: '/team/DPT_Fiscal/Rafaela_DPT_Fiscal.png',
      email: 'rafaela@osp.com.br'
    },
    members: [
      { name: 'Planejamento Tributário', role: 'Consultivo' },
      { name: 'Escrituração Fiscal', role: 'Compliance' },
      { name: 'Apuração de Impostos', role: 'Core Business' }
    ]
  },
  {
    name: 'Pessoal',
    color: 'emerald',
    manager: {
      name: 'Raquel Lisboa',
      role: 'Gestora de DP',
      image: '/team/DPT_Pessoal/Raquel_DPT_Pessoal.jpeg',
      email: 'raquel@osp.com.br'
    },
    members: [
      { name: 'Time de Analistas', role: 'Folha e Encargos' },
      { name: 'Time de Assistentes', role: 'Rotinas Trabalhistas' },
      
    ]
  },
  {
    name: 'Sucesso do Cliente',
    color: 'rose',
    manager: {
      name: 'Polyane Fonseca',
      role: 'Gestora de CX',
      image: '/team/Sucesso_Do_Cliente/Polyane_Sucesso_Do_Cliente.jpeg',
      email: 'polyane@osp.com.br'
    },
    members: [
      { name: 'Relacionamento', role: 'Account Managers' },
      { name: 'Suporte', role: 'Customer Support' }
    ]
  },
  {
    name: 'Administrativo',
    color: 'slate',
    manager: {
      name: 'Larissa',
      role: 'Supervisora',
      image: '/team/Relacionamento_ADM/Larissa_Supervisora_Relacionamento_ADM.png',
      email: 'larissa@osp.com.br'
    },
    members: [
      { name: 'Relacionamento ADM', role: 'Atendimento Interno' },
      { name: 'Backoffice', role: 'Suporte Operacional' }
    ]
  },
  {
    name: 'Moby',
    color: 'violet',
    manager: {
      name: 'Paulo',
      role: 'Coord Gente e Gestão',
      image: '/team/Moby/Paulo_Coord Gente e Gestão_Moby.jpeg',
      email: 'paulo.ricardo@osp.com.br'
    },
    members: [
      { name: 'Gestão de Pessoas', role: 'RH Moby' },
      { name: 'Financeiro', role: 'Administrativo Moby' }
    ]
  },
  {
    name: 'Marketing',
    color: 'amber',
    manager: {
      name: 'Giovanne',
      role: 'Assistente',
      image: '/team/Marketing/Giovanne_assistete_Marketing.jpeg',
      email: 'mkt@osp.com.br'
    },
    members: [
      { name: 'Conteúdo', role: 'Branding e Comunicação' },
      { name: 'Performance', role: 'Aquisição e Dados' }
    ]
  },
  {
    name: 'Comercial',
    color: 'cyan',
    manager: {
      name: 'Juliana',
      role: 'Assistente',
      image: '/team/Comercial/Juliana_Vendas.jpeg',
      email: 'juliana.casciatori@osp.com.br'
    },
    members: [
      { name: 'Vendas', role: 'Prospecção e Relacionamento' },
      { name: 'Pré-venda', role: 'Qualificação' }
    ]
  }
  ,
  {
    name: 'RH',
    color: 'pink',
    manager: {
      name: 'Mariely',
      role: 'Coordenadora de RH',
      image: '/team/RH/Mariely_RH.jpeg',
      email: 'Mariely@osp.com.br'
    },
    members: [
      { name: 'Recrutamento e Seleção', role: 'Aquisição de Talentos' },
      { name: 'Treinamento e Desenvolvimento', role: 'Capacitação' }
    ]
  }
];

export const MANAGERS = DEPARTMENTS.map(d => d.manager);
