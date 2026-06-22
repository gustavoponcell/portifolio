import type { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "design-001",
    slug: "identidade-visual-experimental",
    title: "Identidade visual experimental",
    type: "design",
    description:
      "Projeto temporario para representar futuros estudos de marca, composicao visual e linguagem editorial.",
    summary:
      "Estudo conceitual de identidade visual criado para testar uma linguagem grafica forte, modular e preparada para aplicacoes digitais.",
    tags: ["Branding", "Editorial", "Visual"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "Direcao visual e composicao",
    tools: ["Figma", "Illustrator", "Grid editorial"],
    problem:
      "Organizar uma identidade ficticia com personalidade marcante sem depender de cliente, marca real ou imagem externa.",
    solution:
      "Criar um sistema de formas, contraste, tipografia pesada e regras de composicao para simular um case de branding.",
    highlights: [
      "Exploracao de hierarquia visual com alto contraste.",
      "Sistema flexivel para cartazes, capas e pecas digitais.",
      "Base preparada para receber imagens reais pelo admin futuramente.",
    ],
    gallery: [
      {
        id: "design-001-gallery-001",
        title: "Direcao visual",
        description:
          "Placeholder textual para o painel de referencias, paleta e escolhas de composicao.",
      },
      {
        id: "design-001-gallery-002",
        title: "Aplicacoes de marca",
        description:
          "Espaco reservado para mockups futuros de capa, post e materiais editoriais.",
      },
    ],
  },
  {
    id: "design-002",
    slug: "sistema-visual-para-evento",
    title: "Sistema visual para evento",
    type: "design",
    description:
      "Projeto mockado para testar materiais de evento, composicao grafica e consistencia visual.",
    summary:
      "Sistema visual temporario para validar como um evento conceitual poderia se desdobrar em pecas impressas e digitais.",
    tags: ["Evento", "Sistema visual", "Grafico"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Design grafico e sistema visual",
    tools: ["Figma", "Illustrator", "Layout system"],
    problem:
      "Simular uma familia de pecas coerente para evento sem inventar uma organizacao real.",
    solution:
      "Definir uma estrutura repetivel de titulos, marcadores, blocos de agenda e areas para chamada visual.",
    highlights: [
      "Consistencia entre formatos diferentes.",
      "Aplicacao do amarelo como destaque de modo Design.",
      "Organizacao clara para substituicao por imagens reais no futuro.",
    ],
    gallery: [
      {
        id: "design-002-gallery-001",
        title: "Cartaz principal",
        description:
          "Placeholder para a peca hero do evento, ainda sem imagem cadastrada.",
      },
      {
        id: "design-002-gallery-002",
        title: "Pecas de apoio",
        description:
          "Espaco reservado para credencial, card de programacao e posts.",
      },
    ],
  },
  {
    id: "design-003",
    slug: "campanha-grafica-conceitual",
    title: "Campanha grafica conceitual",
    type: "design",
    description:
      "Registro temporario para apresentar linguagem visual, direcao criativa e pecas de campanha.",
    summary:
      "Campanha conceitual para experimentar narrativa visual, variacoes de layout e chamadas curtas de impacto.",
    tags: ["Campanha", "Direcao visual", "Social media"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "Direcao criativa e layouts",
    tools: ["Figma", "Photoshop", "Composicao"],
    problem:
      "Criar uma campanha demonstrativa com cara de projeto real, mantendo o conteudo claramente temporario.",
    solution:
      "Usar mensagens genericas, ritmo visual e placeholders para representar a estrutura de uma campanha completa.",
    highlights: [
      "Variacoes de layout para redes sociais.",
      "Uso de contraste para criar ritmo de leitura.",
      "Conteudo preparado para curadoria manual futura.",
    ],
    gallery: [
      {
        id: "design-003-gallery-001",
        title: "Serie de posts",
        description:
          "Cards temporarios para demonstrar desdobramentos da campanha.",
      },
      {
        id: "design-003-gallery-002",
        title: "Peca editorial",
        description:
          "Area reservada para uma composicao maior com imagem ou mockup real.",
      },
    ],
  },
  {
    id: "design-004",
    slug: "interface-visual-para-produto-digital",
    title: "Interface visual para produto digital",
    type: "design",
    description:
      "Mock de interface para validar telas, hierarquia visual e componentes de produto digital.",
    summary:
      "Estudo visual de UI para organizar componentes, estados, cards e uma linguagem de produto digital.",
    tags: ["UI", "Interfaces", "Produto digital"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "UI design e sistema visual",
    tools: ["Figma", "Componentes", "Prototipacao"],
    problem:
      "Representar um produto digital sem depender de uma regra de negocio real ou dados sensiveis.",
    solution:
      "Criar telas conceituais com componentes reutilizaveis, hierarquia clara e areas de conteudo mockado.",
    highlights: [
      "Padrao visual preparado para evoluir para design system.",
      "Cards e estados pensados para responsividade.",
      "Boa ponte entre o modo Design e o modo Dev.",
    ],
    gallery: [
      {
        id: "design-004-gallery-001",
        title: "Tela principal",
        description:
          "Placeholder para uma visao geral do produto e seus componentes.",
      },
      {
        id: "design-004-gallery-002",
        title: "Componentes UI",
        description:
          "Espaco reservado para botoes, cards, listas e estados visuais.",
      },
    ],
  },
  {
    id: "design-005",
    slug: "apresentacao-institucional-criativa",
    title: "Apresentacao institucional criativa",
    type: "design",
    description:
      "Projeto temporario para organizar narrativa visual, slides e materiais digitais de apresentacao.",
    summary:
      "Estrutura de apresentacao conceitual para testar narrativa, ritmo de slides e composicao visual.",
    tags: ["Apresentacao", "Editorial", "Narrativa"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Design editorial e storytelling",
    tools: ["Figma", "Slides", "Direcao visual"],
    problem:
      "Demonstrar capacidade de organizar uma apresentacao sem usar dados corporativos reais.",
    solution:
      "Criar uma sequencia mockada com abertura, contexto, destaque visual, conteudo e fechamento.",
    highlights: [
      "Ritmo visual pensado para leitura rapida.",
      "Estrutura reutilizavel para apresentacoes futuras.",
      "Sem empresas, metricas ou clientes inventados.",
    ],
    gallery: [
      {
        id: "design-005-gallery-001",
        title: "Abertura",
        description:
          "Placeholder para slide de capa e direcao visual da apresentacao.",
      },
      {
        id: "design-005-gallery-002",
        title: "Slides internos",
        description:
          "Area reservada para exemplos de conteudo, dados e fechamento.",
      },
    ],
  },
  {
    id: "design-006",
    slug: "pecas-para-redes-sociais",
    title: "Pecas para redes sociais",
    type: "design",
    description:
      "Mock para testar formatos de social media, variacoes de layout e consistencia de campanha.",
    summary:
      "Conjunto de pecas temporarias para validar posts, chamadas e adaptacao entre formatos de redes sociais.",
    tags: ["Social media", "Layout", "Conteudo"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Design para redes sociais",
    tools: ["Figma", "Templates", "Composicao"],
    problem:
      "Preparar uma vitrine de formatos sociais sem inventar marca, campanha comercial ou links externos.",
    solution:
      "Usar temas genericos e placeholders para demonstrar consistencia visual em carrossel, post e story.",
    highlights: [
      "Templates com hierarquia de texto objetiva.",
      "Variacao visual sem perder unidade.",
      "Galeria pronta para receber imagens reais cadastradas futuramente.",
    ],
    gallery: [
      {
        id: "design-006-gallery-001",
        title: "Carrossel",
        description:
          "Placeholder para sequencia de posts com narrativa curta.",
      },
      {
        id: "design-006-gallery-002",
        title: "Story e feed",
        description:
          "Espaco reservado para variacoes de formato e composicao.",
      },
    ],
  },
  {
    id: "dev-001",
    slug: "sistema-web-de-portfolio",
    title: "Sistema web de portfolio",
    type: "dev",
    description:
      "Projeto temporario para representar a base do portfolio com rotas, layout global e componentes reutilizaveis.",
    summary:
      "Estudo tecnico mockado para representar a arquitetura de um portfolio em Next.js com rotas publicas e componentes reutilizaveis.",
    tags: ["Next.js", "TypeScript", "App Router"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "Frontend e arquitetura inicial",
    tools: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem:
      "Criar uma base navegavel e extensivel antes da conexao com banco, autenticacao e admin real.",
    solution:
      "Organizar rotas, componentes, dados mockados e helpers para reduzir retrabalho quando Supabase entrar.",
    highlights: [
      "App Router com paginas publicas organizadas.",
      "Componentes visuais reutilizaveis.",
      "Estrutura pronta para trocar mock por dados do backend.",
    ],
    gallery: [
      {
        id: "dev-001-gallery-001",
        title: "Arquitetura de rotas",
        description:
          "Placeholder textual para representar Home, modos e detalhe de projeto.",
      },
      {
        id: "dev-001-gallery-002",
        title: "Componentes reutilizaveis",
        description:
          "Area futura para screenshots de cards, secoes e layout global.",
      },
    ],
  },
  {
    id: "dev-002",
    slug: "dashboard-administrativo-conceitual",
    title: "Dashboard administrativo conceitual",
    type: "dev",
    description:
      "Mock de painel futuro para organizar conteudo, projetos, experiencias e informacoes principais.",
    summary:
      "Conceito de dashboard para planejar o futuro admin do portfolio sem implementar autenticacao, CRUD ou Supabase nesta etapa.",
    tags: ["Dashboard", "Admin futuro", "UI"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "Planejamento de interface e fluxo",
    tools: ["Next.js", "TypeScript", "UI mockada"],
    problem:
      "Visualizar a futura area administrativa sem criar fluxo funcional antes da modelagem de seguranca.",
    solution:
      "Representar secoes, estados e prioridades do painel usando dados estaticos e linguagem clara de placeholder.",
    highlights: [
      "Separacao entre ideia de admin e implementacao real.",
      "Preparacao para CRUDs futuros.",
      "Sem login, permissao ou escrita em banco nesta fase.",
    ],
    gallery: [
      {
        id: "dev-002-gallery-001",
        title: "Visao geral",
        description:
          "Placeholder para tela inicial do painel com metricas temporarias.",
      },
      {
        id: "dev-002-gallery-002",
        title: "Editor futuro",
        description:
          "Espaco reservado para formularios de projetos quando o admin existir.",
      },
    ],
  },
  {
    id: "dev-003",
    slug: "catalogo-digital-com-filtros",
    title: "Catalogo digital com filtros",
    type: "dev",
    description:
      "Placeholder para testar listagens, filtros, tags, detalhes e organizacao de dados mockados.",
    summary:
      "Aplicacao conceitual de catalogo para validar filtragem, listagem responsiva e paginas de detalhe com dados temporarios.",
    tags: ["Filtros", "Listagem", "Produto digital"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Frontend e modelagem de dados",
    tools: ["TypeScript", "Componentes", "Dados mockados"],
    problem:
      "Testar a experiencia de explorar muitos itens sem depender de um banco real no inicio.",
    solution:
      "Usar arrays tipados, filtros previsiveis e cards consistentes para simular um produto digital.",
    highlights: [
      "Base para filtros por tags e categorias.",
      "Detalhes preparados para dados enriquecidos.",
      "Escopo mantido sem API ou persistencia.",
    ],
    gallery: [
      {
        id: "dev-003-gallery-001",
        title: "Grid de catalogo",
        description:
          "Placeholder para listagem responsiva com tags e estados.",
      },
      {
        id: "dev-003-gallery-002",
        title: "Detalhe de item",
        description:
          "Area reservada para a pagina individual de cada item.",
      },
    ],
  },
  {
    id: "dev-004",
    slug: "integracao-futura-com-github",
    title: "Integracao futura com GitHub",
    type: "dev",
    description:
      "Mock para preparar exibicao de repositorios selecionados, tecnologias e links curados no futuro.",
    summary:
      "Estudo tecnico para representar como repositorios publicos podem aparecer no portfolio com fallback seguro e curadoria.",
    tags: ["GitHub futuro", "API", "Curadoria"],
    featured: true,
    status: "mock",
    year: "2026",
    role: "Integracao server-side planejada",
    tools: ["GitHub API", "Next.js", "Fetch server-side"],
    problem:
      "Exibir dados de repositorios sem expor token, sem quebrar em rate limit e sem depender totalmente da API.",
    solution:
      "Centralizar a busca no servidor, normalizar os dados e manter fallback mockado para a interface.",
    highlights: [
      "Token previsto somente no servidor.",
      "Fallback local para falhas de rede ou rate limit.",
      "Curadoria manual planejada para a etapa de admin.",
    ],
    gallery: [
      {
        id: "dev-004-gallery-001",
        title: "Fluxo da integracao",
        description:
          "Placeholder para explicar busca, normalizacao e fallback.",
      },
      {
        id: "dev-004-gallery-002",
        title: "Cards de repositorio",
        description:
          "Area futura para screenshots dos repositorios exibidos no modo Dev.",
      },
    ],
  },
  {
    id: "dev-005",
    slug: "landing-page-em-nextjs",
    title: "Landing page em Next.js",
    type: "dev",
    description:
      "Projeto temporario para representar paginas responsivas, componentes e hierarquia visual com codigo.",
    summary:
      "Landing page conceitual para testar estrutura de secoes, chamadas, responsividade e padroes de componentes.",
    tags: ["Next.js", "Tailwind CSS", "Responsivo"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Frontend responsivo",
    tools: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    problem:
      "Criar uma pagina promocional demonstrativa sem vender um produto real ou usar conteudo inventado sensivel.",
    solution:
      "Montar secoes genericas com hierarquia forte, cards e botoes internos para validar responsividade.",
    highlights: [
      "Layout responsivo em grid.",
      "Componentes consistentes com o design system.",
      "Conteudo temporario claramente identificado.",
    ],
    gallery: [
      {
        id: "dev-005-gallery-001",
        title: "Hero responsivo",
        description:
          "Placeholder para demonstrar abertura, titulo e chamada principal.",
      },
      {
        id: "dev-005-gallery-002",
        title: "Secoes internas",
        description:
          "Area reservada para beneficios, cards e chamada final.",
      },
    ],
  },
  {
    id: "dev-006",
    slug: "aplicacao-com-dados-mockados",
    title: "Aplicacao com dados mockados",
    type: "dev",
    description:
      "Placeholder para validar estados, dados temporarios e fluxos antes de conectar banco ou APIs reais.",
    summary:
      "Aplicacao conceitual focada em estados de UI, dados estaticos tipados e preparacao para integracoes futuras.",
    tags: ["Dados mockados", "Estados", "Arquitetura"],
    featured: false,
    status: "mock",
    year: "2026",
    role: "Frontend e estados de interface",
    tools: ["TypeScript", "Mock data", "Componentizacao"],
    problem:
      "Validar telas e fluxos antes de definir schema, API, autenticacao e persistencia.",
    solution:
      "Modelar dados estaticos com tipos claros e componentes que aceitam conteudo real no futuro.",
    highlights: [
      "Evita dependencia prematura de backend.",
      "Facilita testes visuais e ajustes de copy.",
      "Cria uma ponte limpa para Supabase depois.",
    ],
    gallery: [
      {
        id: "dev-006-gallery-001",
        title: "Estados de interface",
        description:
          "Placeholder para vazio, carregamento, erro e conteudo preenchido.",
      },
      {
        id: "dev-006-gallery-002",
        title: "Dados tipados",
        description:
          "Area reservada para exemplos de listas, detalhes e relacoes.",
      },
    ],
  },
];
