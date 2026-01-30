
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Eye, 
  History, 
  ChevronRight, 
  Mail, 
  Phone,
  Building2,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  ArrowDown,
  Briefcase,
  ClipboardList,
  CheckSquare,
  Menu,
  X
} from 'lucide-react';
import { VALUES, TECHNOLOGIES, PARTNERS, DEPARTMENTS, ONBOARDING_TASKS, COLORS, CLIENT_LOGOS } from './constants';
import { TeamPhoto } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const [teamPhotos, setTeamPhotos] = useState<TeamPhoto[]>([]);
  const [expandedDept, setExpandedDept] = useState<Record<string, boolean>>({});
  const [welcomeName, setWelcomeName] = useState<string>('');
  const [welcomePhoto, setWelcomePhoto] = useState<string | null>(null);
  const [heroBg, setHeroBg] = useState<string>('');
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const deptKeyMap: Record<string, string> = {
    'Contábil': 'DPT_Contabil',
    'Pessoal': 'DPT_Pessoal',
    'Fiscal e Tributário': 'DPT_Fiscal',
    'Sucesso do Cliente': 'Sucesso_Do_Cliente',
    'Administrativo': 'Relacionamento_ADM',
    'Moby': 'Moby',
    'Comercial': 'Comercial',
    'Marketing': 'Marketing',
    'RH': 'RH'
  };

  // Display labels and color mapping for departments (used in charts and styling)
  const deptDisplayMap: Record<string, string> = {
    DPT_Contabil: 'Contábil',
    DPT_Pessoal: 'Pessoal',
    DPT_Fiscal: 'Fiscal e Tributário',
    Sucesso_Do_Cliente: 'Sucesso do Cliente',
    Relacionamento_ADM: 'Administrativo',
    Moby: 'Moby',
    Administrativo: 'Administrativo',
    RH: 'RH'
  };

  const deptColorHexMap: Record<string, string> = {
    DPT_Contabil: '#3b82f6', // blue-500
    DPT_Pessoal: '#10b981', // emerald-500
    DPT_Fiscal: '#6366f1', // indigo-500
    Sucesso_Do_Cliente: '#f43f5e', // rose-500
    Administrativo: '#64748b', // slate-500
    RH: '#ec4899' // pink-500
  };
  

  const getDeptKey = (name: string) => deptKeyMap[name] || name;

  const buildPhotoUrl = (p: TeamPhoto) => {
    const base = (process.env.TEAM_BASE_URL as string) || '/team';
    const rel = p.path.replace(/^.*?team\//, '');
    const encoded = rel.split('/').map(s => encodeURIComponent(s)).join('/');
    return `${base}/${encoded}`;
  };

  const formatDisplayName = (p: TeamPhoto, deptLabel: string) => {
    const deptKey = getDeptKey(deptLabel);
    const tokensToRemove = new Set<string>([
      'DPT', 'Contabil', 'Fiscal', 'Pessoal', 'Sucesso', 'Do', 'Cliente',
      'Relacionamento', 'ADM', 'Moby', 'Marketing', 'Vendas', 'FTProvisoria', 'Oculos'
    ]);
    // Include department key split tokens as well
    deptKey.split(/[_&]/).forEach(t => tokensToRemove.add(t));

    const cleaned = p.name
      .split('_')
      .filter(tok => tok && !tokensToRemove.has(tok))
      .join(' ')
      .trim();

    // Title-case words (preserve existing capitalization if already uppercase)
    const titled = cleaned.split(' ').map(w => {
      if (!w) return w;
      return w[0].toUpperCase() + w.slice(1);
    }).join(' ');

    return titled;
  };

  const toggleDept = (key: string) => {
    setExpandedDept(prev => {
      const isCurrentlyExpanded = prev[key];
      // Close all departments first
      const allClosed: Record<string, boolean> = {};
      // If the clicked department was closed, open it. If it was open, close it.
      if (!isCurrentlyExpanded) {
        allClosed[key] = true;
      }
      return allClosed;
    });
  };
  const loadTeam = () => {
    const base = (process.env.TEAM_BASE_URL as string) || '/team';
    const url = `${base}/team.json?t=${Date.now()}`;
    fetch(url, { cache: 'no-store' as RequestCache })
      .then(res => res.ok ? res.json() : [])
      .then((data: TeamPhoto[]) => {
        if (Array.isArray(data)) setTeamPhotos(data);
      })
      .catch(() => {});
  };

  const toggleTask = (index: number) => {
    setCheckedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'sobre', 'cultura', 'clientes', 'tecnologias', 'socios', 'organograma', 'onboarding'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadTeam();
  }, []);

  // Parse welcome data from query params (?nome=...&foto=...)
  useEffect(() => {
    try {
      const qp = new URLSearchParams(window.location.search);
      const name = qp.get('nome') || '';
      const foto = qp.get('foto');
      const bg = qp.get('bg');
      setWelcomeName(name);
      if (foto) {
        if (/^https?:\/\//i.test(foto)) {
          setWelcomePhoto(foto);
        } else {
          const base = (process.env.TEAM_BASE_URL as string) || '/team';
          const encoded = foto.split('/').map(s => encodeURIComponent(s)).join('/');
          setWelcomePhoto(`${base}/${encoded}`);
        }
      } else {
        setWelcomePhoto(null);
      }

      const envBg = (process.env.HERO_IMAGE_URL as string) || '';
      if (bg) {
        setHeroBg(bg);
      } else if (envBg) {
        setHeroBg(envBg);
      } else {
        // Try local provided filenames with common extensions
        const candidates = [
          '/assets/hero/osp-onboarding.webp',
          '/assets/hero/osp-onboarding.jpg',
          '/assets/hero/osp-onboarding.jpeg',
          '/assets/hero/OSP_Image_Background.webp',
          '/assets/hero/OSP_Image_Background.png',
          '/assets/hero/OSP_Image_Background.jpg',
          '/assets/hero/OSP_Image_Background.jpeg'
        ];
        (async () => {
          for (const u of candidates) {
            try {
              const res = await fetch(u, { method: 'HEAD' });
              if (res.ok) { setHeroBg(u); return; }
            } catch {}
          }
          setHeroBg('/assets/hero/osp-onboarding.webp');
        })();
      }
    } catch {}
  }, []);

  // Persist checklist progress locally
  useEffect(() => {
    try {
      const saved = localStorage.getItem('checkedTasks');
      if (saved) {
        const parsed = JSON.parse(saved) as Record<number, boolean>;
        if (parsed && typeof parsed === 'object') {
          setCheckedTasks(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
    } catch {}
  }, [checkedTasks]);

  const Logo = () => (
    <div className="flex items-center justify-center">
      <img src="/assets/logo/Logotipo OSP branco.png" alt="OSP Logotipo" className="h-16 w-auto object-contain" />
    </div>
  );

  const NavItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <a 
      href={`#${id}`}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
        activeSection === id 
        ? 'bg-[#002147] text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sidebar Navigation */}
      <header className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl hidden lg:flex flex-col z-50">
        <div className="p-8">
          <Logo />
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <NavItem id="home" label="Início" icon={History} />
          <NavItem id="sobre" label="Sobre a OSP" icon={Building2} />
          <NavItem id="cultura" label="Nossa Cultura" icon={Target} />
          <NavItem id="clientes" label="Nossos Clientes" icon={HeartHandshake} />
          <NavItem id="tecnologias" label="Tecnologias" icon={Cpu} />
          <NavItem id="socios" label="Os Sócios" icon={Users} />
          <NavItem id="organograma" label="Organograma" icon={ShieldCheck} />
          <NavItem id="onboarding" label="Primeira Semana" icon={ClipboardList} />
        </nav>
        <div className="p-6 border-t bg-slate-50">
          <p className="text-xs text-gray-500 font-medium text-center uppercase tracking-widest">#ContaCMG</p>
        </div>
      </header>

      {/* Mobile Top Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#002147] text-white shadow z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <img src="/assets/logo/Logo OSP branco.png" alt="OSP" className="w-7 h-7 object-contain" />
            <span className="text-sm font-bold tracking-tight">OSP</span>
          </div>
          <button
            aria-label="Abrir menu"
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setMobileNavOpen(v => !v)}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav className="px-2 pb-3 space-y-1 bg-[#001e3c]">
            {[
              { id: 'home', label: 'Início', Icon: History },
              { id: 'sobre', label: 'Sobre a OSP', Icon: Building2 },
              { id: 'cultura', label: 'Nossa Cultura', Icon: Target },
              { id: 'clientes', label: 'Nossos Clientes', Icon: HeartHandshake },
              { id: 'tecnologias', label: 'Tecnologias', Icon: Cpu },
              { id: 'socios', label: 'Os Sócios', Icon: Users },
              { id: 'organograma', label: 'Organograma', Icon: ShieldCheck },
              { id: 'onboarding', label: 'Primeira Semana', Icon: ClipboardList }
            ].map(({ id, label, Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  activeSection === id ? 'bg-white text-[#002147]' : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-semibold">{label}</span>
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 lg:ml-64">
        {/* Onboarding Cover */}
        <section id="home" className="relative min-h-[85vh] md:min-h-screen bg-[#002147] text-white flex items-center">
          {/* Corporate office background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 hero-bg"
              style={{
                backgroundImage: heroBg ? `url(${heroBg})` : 'none'
              }}
            ></div>
            {/* Brand overlay with softer transparency */}
            <div className="absolute inset-0 bg-[#002147]/40"></div>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              {/* Left: Title and tagline */}
              <div className="md:col-span-2 relative">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">ONBOARDING</h1>
                <div className="space-y-2 text-blue-100 max-w-2xl">
                  <p>Um documento para você</p>
                  <p>Conhecer mais da nossa</p>
                  <p>História e das nossas pessoas...</p>
                </div>
                <div className="mt-8">
                  <span className="text-white text-xl font-bold">#ContaCMG</span>
                </div>
                {/* Emblem aligned to left */}
                <div className="hidden md:flex items-center gap-3 mt-6">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <img src="/assets/logo/Logo OSP Azul.png" alt="OSP" className="w-10 h-10 object-contain" />
                  </div>
                </div>
              </div>

              {/* Right: Welcome card */}
              <div className="bg-white text-[#002147] rounded-3xl shadow-2xl p-8 flex flex-col items-center">
                <h3 className="text-2xl font-black mb-6 text-center">Seja bem-vindo</h3>
                <div className="w-28 h-28 rounded-full overflow-hidden ring-8 ring-slate-100 mb-4">
                  {welcomePhoto ? (
                    <img src={welcomePhoto} alt={welcomeName || 'Colaborador(a)'} className="w-full h-full object-cover" />
                  ) : (
                    <img src="https://picsum.photos/200/200?random=21" alt="Foto" className="w-full h-full object-cover" />
                  )}
                </div>
                <p className="text-xl font-bold mb-4">{welcomeName || 'Colaborador(a)'}</p>
                <p className="text-sm text-gray-600 text-center max-w-[260px]">
                  Você já faz parte do time. Estamos muito felizes de te ter aqui. Comece sua jornada conosco.
                </p>
              </div>
            </div>
          </div>
        </section>
        

        {/* Introduction Section */}
        <section id="sobre" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1557426282-285758c717a1?auto=format&fit=crop&q=80&w=1000" alt="Office Life" className="w-full h-64 object-cover md:h-[500px]" />
              </div>
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-[#002147]">
                    <History />
                  </div>
                  <h2 className="text-4xl font-extrabold text-[#002147]">Sobre a OSP</h2>
                </div>
                <div className="prose prose-lg text-gray-600 leading-relaxed">
                  <p>Fundada em 1977, a OSP nasceu do trabalho e da dedicação. Hoje somos uma empresa de consultoria e gestão de negócios, com produtos personalizados para cada necessidade.</p>
                  <p>Primeiro, conheça nossa história e como apoiamos nossos clientes de forma estratégica, indo além da mera entrega de obrigações acessórias.</p>
                  <p className="font-semibold text-[#002147]">Atuamos com Assessoria Contábil especializada em negócios no Regime de Lucro Real, com foco em Indústrias, Serviços e Multinacionais.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section id="cultura" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#002147] mb-4">Cultura e Valores</h2>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">A essência da OSP que guia nosso trabalho</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#002147] p-8 rounded-3xl text-white shadow-xl hover:scale-105 transition-transform">
                <Target className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Missão</h3>
                <p className="text-xl font-light italic leading-relaxed">
                  "Desenvolver pessoas e negócios, a ponto de trazer realização e prosperidade para todos."
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl md:col-span-2 overflow-hidden relative">
                <ShieldCheck className="w-12 h-12 mb-6 text-[#002147]" />
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Valores</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {VALUES.map((v, i) => (
                    <div key={i} className="group">
                      <h4 className="font-bold text-[#002147] group-hover:text-blue-600 transition-colors">{v.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 bg-white p-10 rounded-3xl shadow-xl border-t-8 border-[#002147] grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Eye className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Visão Humana</h3>
                  <p className="text-gray-600 text-sm">Se tornar uma empresa cada vez mais humana e produtora de sucesso.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Solução Completa</h3>
                  <p className="text-gray-600 text-sm">Ser a solução completa para todos os clientes.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Building2 className="w-10 h-10 text-[#002147] mb-4" />
                  <h3 className="font-bold text-lg mb-2">Referência de Mercado</h3>
                  <p className="text-gray-600 text-sm">Ser referência em soluções para Indústrias e Multinacionais.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        



        {/* Clients Section */}
        <section id="clientes" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="max-w-md">
                <h2 className="text-4xl font-extrabold text-[#002147] mb-4">Nossos Clientes</h2>
                <p className="text-gray-600">Depois de entender nossa cultura, veja quem confia na OSP e faz parte dessa jornada.</p>
              </div>
              <div className="bg-[#002147] text-white p-8 rounded-2xl flex items-center space-x-6 shadow-2xl">
                <div className="text-5xl font-black">700+</div>
                <div className="text-xl font-light uppercase tracking-tighter">CNPJ's Ativos</div>
              </div>
            </div>
            {(() => {
              const shuffled = [...CLIENT_LOGOS].sort(() => Math.random() - 0.5).slice(0, 12);
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {shuffled.map((logo, i) => (
                    <div key={`${logo}-${i}`} className="h-24 bg-slate-50 rounded-xl flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all border border-transparent hover:border-[#002147] shadow-sm">
                      <img src={logo} alt="Cliente" className="max-h-full max-w-full object-contain" />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* Technologies Section */}
        <section id="tecnologias" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Tecnologias da Empresa</h2>
              <p className="opacity-70">Ferramentas que potencializam nossos times e garantem eficiência no dia a dia.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TECHNOLOGIES.map((tech, i) => (
                <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group">
                  <div className="h-16 w-16 bg-white rounded-2xl mb-6 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                    <img src={tech.logo} alt={tech.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                  <p className="text-sm text-slate-400">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Deep Dive Section */}
        <section id="socios" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#002147] mb-4">Os Sócios</h2>
              <div className="h-1 w-20 bg-[#002147] mx-auto"></div>
              <p className="text-gray-500 mt-6">Conheça quem lidera e inspira nossa estratégia e crescimento.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
              {PARTNERS.map((partner, i) => (
                <div key={i} className="flex flex-col bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all">
                  <div className="h-80 relative">
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <h3 className="text-2xl font-bold">{partner.name}</h3>
                      <p className="text-blue-400 font-semibold">{partner.role}</p>
                    </div>
                  </div>
                  <div className="p-8 space-y-4 flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      {partner.email && (
                        <div className="flex items-center text-xs text-slate-500">
                          <Mail size={14} className="mr-2" /> {partner.email}
                        </div>
                      )}
                      {partner.phone && (
                        <div className="flex items-center text-xs text-slate-500">
                          <Phone size={14} className="mr-2" /> {partner.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organogram Section (Replacing Departments) */}
        <section id="organograma" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#002147] mb-4">ORGANOGRAMA</h2>
              <div className="h-1.5 w-32 bg-[#002147] mx-auto rounded-full"></div>
              <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
                Conheça a estrutura hierárquica e os times que compõem a excelência da OSP Soluções de Negócio.
              </p>
            </div>

            <div className="flex flex-col items-center">
              {/* Top Level: Partners */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12 relative">
                {PARTNERS.map((partner, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center group">
                    <div className="w-24 h-24 rounded-full border-4 border-[#002147] overflow-hidden mb-3 bg-white shadow-xl transform group-hover:scale-110 transition-transform">
                      <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#002147] text-white px-6 py-2 rounded-xl text-center shadow-lg">
                      <p className="font-bold text-sm leading-tight">{partner.name}</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-80">{partner.role}</p>
                    </div>
                  </div>
                ))}
                {/* Horizontal Connection Line */}
                <div className="absolute top-12 left-1/4 right-1/4 h-0.5 bg-slate-300 -z-10 hidden md:block"></div>
              </div>

              {/* Connector to Departments */}
              <div className="mb-12 flex flex-col items-center">
                <div className="w-0.5 h-12 bg-slate-300"></div>
                <div className="w-full md:w-[80%] h-0.5 bg-slate-300"></div>
              </div>

              {/* Second Level: Departments & Managers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                {DEPARTMENTS.map((dept, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Manager Card (click to toggle department photos) */}
                    <div
                      className={`w-full bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-4 transition-all cursor-pointer ${expandedDept[getDeptKey(dept.name)] ? `ring-2 ring-${dept.color}-400` : 'hover:shadow-2xl'}`}
                      onClick={() => toggleDept(getDeptKey(dept.name))}
                    >
                      <div className={`h-2 bg-${dept.color}-500 w-full`}></div>
                      <div className="p-5 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-${dept.color}-200`}>
                          <img src={dept.manager.image} alt={dept.manager.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">{dept.manager.name}</h4>
                        <p className="text-[11px] text-gray-500 mb-2">{dept.manager.role}</p>
                        <span className={`text-[10px] font-bold text-${dept.color}-700 uppercase mb-3 bg-${dept.color}-50 px-2 py-0.5 rounded`}>{dept.name}</span>
                        <div className="flex flex-col items-center space-y-1">
                           <a href={`mailto:${dept.manager.email}`} className="p-1.5 bg-slate-100 rounded-full text-slate-500 hover:text-blue-600 transition-colors">
                             <Mail size={12} />
                           </a>
                           <p className="text-[9px] text-gray-500">{dept.manager.email}</p>
                        </div>
                      </div>
                    </div>

                    <ArrowDown className={`text-${dept.color}-400 mb-4`} size={20} />

                    {/* Team Members List */}
                    <div className="w-full space-y-2">
                      {dept.members.map((member, mIdx) => (
                        <div key={mIdx} className="bg-white border border-slate-100 px-4 py-3 rounded-xl shadow-sm flex items-center space-x-3 group hover:border-slate-300 transition-all cursor-default">
                          <div className={`w-2 h-2 rounded-full bg-${dept.color}-400 group-hover:bg-${dept.color}-600`}></div>
                          <div>
                            <p className="text-xs font-bold text-gray-700">{member.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase">{member.role || 'Membro'}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Department Photos (expand on click) */}
                    {(() => {
                      const key = getDeptKey(dept.name);
                      const photos = teamPhotos.filter(p => p.department === key);
                      const sortedPhotos = [...photos].sort((a, b) =>
                        formatDisplayName(a, dept.name).localeCompare(
                          formatDisplayName(b, dept.name),
                          'pt',
                          { sensitivity: 'base' }
                        )
                      );
                      return expandedDept[key] ? (
                        <div className="w-full mt-6">
                          {sortedPhotos.length === 0 ? (
                            <div className="text-center text-gray-400 text-sm">Sem fotos para este departamento.</div>
                          ) : (
                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                              {sortedPhotos.map((p, i) => (
                                <div key={`${p.name}-${i}`} className="group relative bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden w-[120px] h-[200px] transform transition-all duration-200 ease-out hover:shadow-lg hover:ring-2 hover:ring-[#002147]/50 hover:scale-[1.03] hover:z-50">
                                  <img src={buildPhotoUrl(p)} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
                                  <div className="absolute bottom-0 left-0 right-0 text-white p-3">
                                    <p className="text-sm font-bold leading-tight mb-0.5">{p.name}</p>
                                    {p.role && <p className="text-[10px] font-normal opacity-80 leading-tight">{p.role}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}
                    {/* Divider between sectors for clearer separation */}
                    <div className="w-full h-px bg-slate-200/70 my-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* First Week Checklist Section */}
        <section id="onboarding" className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3">
                <div className="bg-[#002147] text-white p-10 rounded-3xl shadow-xl sticky top-24">
                   <ClipboardList className="w-12 h-12 mb-6 text-blue-300" />
                   <h2 className="text-3xl font-black mb-4">Checklist da Primeira Semana</h2>
                   <p className="text-blue-100 leading-relaxed mb-6">
                     Separamos algumas tarefas essenciais para você começar com o pé direito na OSP.
                   </p>
                   <div className="w-full bg-blue-900 rounded-full h-2 mb-2">
                     <div 
                       className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                       style={{ width: `${(Object.keys(checkedTasks).filter(k => checkedTasks[Number(k)]).length / ONBOARDING_TASKS.length) * 100}%` }}
                     ></div>
                   </div>
                   <p className="text-sm text-blue-200">
                     {Object.keys(checkedTasks).filter(k => checkedTasks[Number(k)]).length} de {ONBOARDING_TASKS.length} tarefas concluídas
                   </p>
                </div>
              </div>
              <div className="md:w-2/3 space-y-6">
                {ONBOARDING_TASKS.map((task, index) => (
                  <div 
                    key={index}
                    onClick={() => toggleTask(index)}
                    className={`
                      p-8 rounded-3xl cursor-pointer transition-all border-2 flex gap-6 group
                      ${checkedTasks[index] 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-lg'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${checkedTasks[index]
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-slate-300 text-transparent group-hover:border-blue-400'
                      }
                    `}>
                      <CheckSquare size={16} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${checkedTasks[index] ? 'text-blue-800 line-through decoration-2 opacity-70' : 'text-[#002147]'}`}>
                        {task.title}
                      </h3>
                      <p className={`text-gray-600 ${checkedTasks[index] ? 'opacity-60' : ''}`}>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Welcome */}
        <section className="bg-[#002147] py-24 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-6xl font-black mb-8 slow-blink">SEJA BEM-VINDO!</h2>
            <h3 className="text-4xl font-light mb-12">{welcomeName || 'Ao time OSP'}</h3>
            <p className="text-xl opacity-80 uppercase tracking-[0.2em]">Será um prazer trabalhar com você</p>
            <div className="mt-16 flex justify-center space-x-4">
              <Logo />
            </div>
            <p className="mt-12 text-slate-500 text-sm">OSP Soluções de Negócio &copy; {new Date().getFullYear()}</p>
          </div>
        </section>

      </main>

      {/* Floating Scroll Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#002147] text-white p-4 rounded-full shadow-2xl hover:bg-blue-900 transition-colors z-50 lg:hidden"
      >
        <ChevronRight size={24} className="-rotate-90" />
      </button>
    </div>
  );
};

export default App;
