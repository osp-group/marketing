
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
  { name: 'Google Workspace', description: 'Multi-ferramentas do google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Google_Workspace_Logo.svg/1024px-Google_Workspace_Logo.svg.png' },
  { name: 'Gestta', description: 'Plataforma de gestão contábil', logo: 'https://play-lh.googleusercontent.com/B9O0oK_G_u8G8Hq3_N7-Tz_n-p-e8Y-E_Xk-3Pz6Z0W5w1mS6_Z_JqY-y7z9y3-9y0=w240-h480-rw' },
  { name: 'ONVIO', description: 'Acessar e baixar diversos documentos e informações trabalhistas', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/p5n7v6z3y9v9e9p5j6y5' },
  { name: 'Bradial telecom', description: 'Sistema de telefonia', logo: 'https://picsum.photos/100/100?random=10' }
];

// Logos de clientes (12 itens) usando assets locais
export const CLIENT_LOGOS: string[] = [
  '/assets/logo/tech/google-workspace.webp',
  '/assets/logo/tech/gestta.webp',
  '/assets/logo/tech/onvio.webp',
  '/assets/logo/tech/bradial-telecom.webp',
  '/assets/logo/Logo_OSP_azul.png',
  '/assets/logo/OSP_Logo_white (1).png',
  '/assets/logo/Logo_OSP_azul copy.png',
  '/assets/logo/OSP_Logo_white (1) copy.png',
  '/assets/logo/tech/google-workspace.png',
  '/assets/logo/tech/gestta.png',
  '/assets/logo/tech/onvio.png',
  '/assets/logo/tech/bradial-telecom.png'
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
      image: '/team/Relacionamento_ADM/Larissa_Relacionamento_ADM.png',
      email: 'administrativo@osp.com.br'
    },
    members: [
      { name: 'Relacionamento ADM', role: 'Atendimento Interno' },
      { name: 'Backoffice', role: 'Suporte Operacional' }
    ]
  },
  {
    name: 'Marketing',
    color: 'amber',
    manager: {
      name: 'Giovanne',
      role: 'Coordenador de Marketing',
      image: '/team/Marketing/Giovanne_assistete_Marketing.jpeg',
      email: 'marketing@osp.com.br'
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
      role: 'Coordenadora',
      image: '/team/Comercial/Juliana_Vendas.jpeg',
      email: 'comercial@osp.com.br'
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
      email: 'rh@osp.com.br'
    },
    members: [
      { name: 'Recrutamento e Seleção', role: 'Aquisição de Talentos' },
      { name: 'Treinamento e Desenvolvimento', role: 'Capacitação' }
    ]
  }
];

export const MANAGERS = DEPARTMENTS.map(d => d.manager);
