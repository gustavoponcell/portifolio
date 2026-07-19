import type { Project } from "@/types/project";

export const portfolioProjects: Project[] = [
  {
    id: "design-001",
    slug: "identidade-visual-experimental",
    title: "Identidade visual experimental",
    type: "design",
    description:
      "Estudo visual focado em marca, composição visual e linguagem editorial.",
    summary:
      "Identidade visual experimental com linguagem gráfica forte, modular e preparada para aplicações digitais.",
    tags: ["Branding", "Editorial", "Visual"],
    featured: true,
    status: "published",
    year: "2026",
    role: "Direção visual e composição",
    tools: ["Figma", "Illustrator", "Grid editorial"],
    problem:
      "Organizar uma identidade conceitual com personalidade marcante, ritmo visual e aplicação digital.",
    solution:
      "Criar um sistema de formas, contraste, tipografia pesada e regras de composição para orientar a linguagem da marca.",
    highlights: [
      "Exploração de hierarquia visual com alto contraste.",
      "Sistema flexível para cartazes, capas e peças digitais.",
      "Linguagem modular para diferentes aplicações visuais.",
    ],
    gallery: [
      {
        id: "design-001-gallery-001",
        title: "Direção visual",
        description:
          "Painel de referências, paleta e escolhas de composição.",
      },
      {
        id: "design-001-gallery-002",
        title: "Aplicações de marca",
        description:
          "Desdobramentos para capa, post e materiais editoriais.",
      },
    ],
  },
  {
    id: "design-002",
    slug: "sistema-visual-para-evento",
    title: "Sistema visual para evento",
    type: "design",
    description:
      "Sistema visual para materiais de evento, composição gráfica e consistência entre peças.",
    summary:
      "Sistema visual de evento com desdobramentos para peças impressas e digitais.",
    tags: ["Evento", "Sistema visual", "Gráfico"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Design gráfico e sistema visual",
    tools: ["Figma", "Illustrator", "Layout system"],
    problem:
      "Construir uma família de peças coerente para evento, mantendo leitura rápida e unidade visual.",
    solution:
      "Definir uma estrutura repetível de títulos, marcadores, blocos de agenda e áreas para chamada visual.",
    highlights: [
      "Consistencia entre formatos diferentes.",
      "Aplicação de cor de destaque para guiar a leitura.",
      "Organização clara entre chamada principal, informações e apoios visuais.",
    ],
    gallery: [
      {
        id: "design-002-gallery-001",
        title: "Cartaz principal",
        description:
          "Peça principal do evento com hierarquia forte e contraste.",
      },
      {
        id: "design-002-gallery-002",
        title: "Peças de apoio",
        description:
          "Credencial, card de programação e posts derivados do sistema visual.",
      },
    ],
  },
  {
    id: "design-003",
    slug: "campanha-grafica-conceitual",
    title: "Campanha gráfica conceitual",
    type: "design",
    description:
      "Campanha conceitual para apresentar linguagem visual, direção criativa e peças de comunicação.",
    summary:
      "Campanha conceitual para experimentar narrativa visual, variações de layout e chamadas curtas de impacto.",
    tags: ["Campanha", "Direção visual", "Social media"],
    featured: true,
    status: "published",
    year: "2026",
    role: "Direção criativa e layouts",
    tools: ["Figma", "Photoshop", "Composição"],
    problem:
      "Criar uma campanha com narrativa visual consistente e peças adaptáveis para diferentes formatos.",
    solution:
      "Usar ritmo visual, contraste e chamadas diretas para estruturar uma campanha completa.",
    highlights: [
      "Variações de layout para redes sociais.",
      "Uso de contraste para criar ritmo de leitura.",
      "Narrativa visual preparada para diferentes pontos de contato.",
    ],
    gallery: [
      {
        id: "design-003-gallery-001",
        title: "Serie de posts",
        description:
          "Cards para demonstrar desdobramentos da campanha.",
      },
      {
        id: "design-003-gallery-002",
        title: "Peça editorial",
        description:
          "Composição maior para ampliar a linguagem visual da campanha.",
      },
    ],
  },
  {
    id: "design-004",
    slug: "interface-visual-para-produto-digital",
    title: "Interface visual para produto digital",
    type: "design",
    description:
      "Estudo de interface para organizar telas, hierarquia visual e experiência de produto digital.",
    summary:
      "Estudo visual de UI para organizar componentes, estados, cards e uma linguagem de produto digital.",
    tags: ["UI", "Interfaces", "Produto digital"],
    featured: true,
    status: "published",
    year: "2026",
    role: "UI design e sistema visual",
    tools: ["Figma", "Interface", "Prototipação"],
    problem:
      "Representar um produto digital com hierarquia clara, navegação simples e estados visuais úteis.",
    solution:
      "Criar telas conceituais com padrões reutilizáveis, hierarquia clara e organização de conteúdo.",
    highlights: [
      "Padrão visual preparado para evoluir para design system.",
      "Cards e estados pensados para responsividade.",
      "Boa ponte entre o modo Design e o modo Dev.",
    ],
    gallery: [
      {
        id: "design-004-gallery-001",
        title: "Tela principal",
        description:
          "Visão geral do produto e seus principais elementos de interface.",
      },
      {
        id: "design-004-gallery-002",
        title: "Componentes UI",
        description:
          "Botões, cards, listas e estados visuais do produto.",
      },
    ],
  },
  {
    id: "design-005",
    slug: "apresentacao-institucional-criativa",
    title: "Apresentação institucional criativa",
    type: "design",
    description:
      "Projeto visual para organizar narrativa, slides e materiais digitais de apresentação.",
    summary:
      "Estrutura de apresentação conceitual para trabalhar narrativa, ritmo de slides e composição visual.",
    tags: ["Apresentação", "Editorial", "Narrativa"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Design editorial e storytelling",
    tools: ["Figma", "Slides", "Direção visual"],
    problem:
      "Organizar uma apresentação com clareza narrativa, ritmo visual e impacto de abertura.",
    solution:
      "Criar uma sequência com abertura, contexto, destaque visual, conteúdo e fechamento.",
    highlights: [
      "Ritmo visual pensado para leitura rapida.",
      "Estrutura reutilizável para diferentes apresentações.",
      "Equilíbrio entre conteúdo, ritmo e impacto visual.",
    ],
    gallery: [
      {
        id: "design-005-gallery-001",
        title: "Abertura",
        description:
          "Slide de capa e direção visual da apresentação.",
      },
      {
        id: "design-005-gallery-002",
        title: "Slides internos",
        description:
          "Exemplos de conteúdo, dados e fechamento visual.",
      },
    ],
  },
  {
    id: "design-006",
    slug: "pecas-para-redes-sociais",
    title: "Peças para redes sociais",
    type: "design",
    description:
      "Conjunto de peças para social media, variações de layout e consistência de campanha.",
    summary:
      "Conjunto de peças para posts, chamadas e adaptação entre formatos de redes sociais.",
    tags: ["Social media", "Layout", "Conteúdo"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Design para redes sociais",
    tools: ["Figma", "Templates", "Composição"],
    problem:
      "Criar uma vitrine de formatos sociais com unidade visual e flexibilidade de uso.",
    solution:
      "Usar chamadas curtas, hierarquia clara e variação visual para carrossel, post e story.",
    highlights: [
      "Templates com hierarquia de texto objetiva.",
      "Variacao visual sem perder unidade.",
      "Sistema visual aplicável a diferentes formatos de redes sociais.",
    ],
    gallery: [
      {
        id: "design-006-gallery-001",
        title: "Carrossel",
        description:
          "Sequência de posts com narrativa curta.",
      },
      {
        id: "design-006-gallery-002",
        title: "Story e feed",
        description:
          "Variações de formato e composição.",
      },
    ],
  },
  {
    id: "dev-001",
    slug: "sistema-web-de-portfolio",
    title: "Sistema web de portfólio",
    type: "dev",
    description:
      "Projeto web para apresentar portfólio, navegação, identidade visual e organização de conteúdo.",
    summary:
      "Aplicação em Next.js que organiza páginas públicas, identidade visual e componentes reutilizáveis.",
    tags: ["Next.js", "TypeScript", "App Router"],
    featured: true,
    status: "published",
    year: "2026",
    role: "Frontend e arquitetura inicial",
    tools: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem:
      "Criar uma base navegável, responsiva e extensível para apresentar projetos e informações profissionais.",
    solution:
      "Organizar páginas, componentes e dados de forma clara para facilitar manutenção e evolução.",
    highlights: [
      "Páginas públicas organizadas com App Router.",
      "Componentes visuais reutilizáveis.",
      "Estrutura preparada para atualização constante de conteúdo.",
    ],
    gallery: [
      {
        id: "dev-001-gallery-001",
        title: "Arquitetura de rotas",
        description:
          "Organização entre Home, modos e páginas de detalhe.",
      },
      {
        id: "dev-001-gallery-002",
        title: "Componentes reutilizáveis",
        description:
          "Cards, seções e layout global com linguagem visual consistente.",
      },
    ],
  },
  {
    id: "dev-002",
    slug: "painel-de-gestao-conceitual",
    title: "Painel de gestão conceitual",
    type: "dev",
    description:
      "Estudo de painel para organizar conteúdo, projetos, experiências e informações principais.",
    summary:
      "Conceito de dashboard para organizar fluxos de edição, priorização de informações e manutenção de conteúdo.",
    tags: ["Dashboard", "Organização", "UI"],
    featured: true,
    status: "published",
    year: "2026",
    role: "Planejamento de interface e fluxo",
    tools: ["Next.js", "TypeScript", "UI"],
    problem:
      "Organizar informações complexas em uma interface de gestão clara e objetiva.",
    solution:
      "Representar seções, estados e prioridades com uma linguagem visual direta e consistente.",
    highlights: [
      "Separação clara entre áreas de conteúdo.",
      "Prioridade para leitura rápida e edição objetiva.",
      "Interface pensada para manutenção contínua do portfólio.",
    ],
    gallery: [
      {
        id: "dev-002-gallery-001",
        title: "Visão geral",
        description:
          "Tela inicial com organização de seções e prioridades.",
      },
      {
        id: "dev-002-gallery-002",
        title: "Editor de conteúdo",
        description:
          "Fluxo de edição para projetos, textos e informações públicas.",
      },
    ],
  },
  {
    id: "dev-003",
    slug: "catalogo-digital-com-filtros",
    title: "Catálogo digital com filtros",
    type: "dev",
    description:
      "Aplicação web conceitual com foco em estrutura, navegação, filtros e apresentação de conteúdo.",
    summary:
      "Catálogo digital com listagem responsiva, filtros, tags e páginas de detalhe.",
    tags: ["Filtros", "Listagem", "Produto digital"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Frontend e modelagem de dados",
    tools: ["TypeScript", "Interface", "Modelagem de dados"],
    problem:
      "Melhorar a experiência de explorar muitos itens com filtros, categorias e leitura rápida.",
    solution:
      "Usar estrutura de dados clara, filtros previsíveis e cards consistentes para organizar a navegação.",
    highlights: [
      "Base para filtros por tags e categorias.",
      "Detalhes preparados para informações enriquecidas.",
      "Interface organizada para evolução do produto.",
    ],
    gallery: [
      {
        id: "dev-003-gallery-001",
        title: "Grid de catálogo",
        description:
          "Listagem responsiva com tags e estados de navegação.",
      },
      {
        id: "dev-003-gallery-002",
        title: "Detalhe de item",
        description:
          "Página individual com informações completas de cada item.",
      },
    ],
  },
  {
    id: "dev-004",
    slug: "integracao-com-github",
    title: "Integração com GitHub",
    type: "dev",
    description:
      "Estudo de exibição de repositórios selecionados, tecnologias e links de projetos.",
    summary:
      "Estudo técnico para apresentar repositórios públicos dentro do portfólio com descrição clara e seleção de destaques.",
    tags: ["GitHub", "Repositórios", "Curadoria"],
    featured: true,
    status: "published",
    year: "2026",
    role: "Integração e apresentação de dados",
    tools: ["GitHub", "Next.js", "TypeScript"],
    problem:
      "Apresentar repositórios de forma organizada, com contexto e tecnologias principais.",
    solution:
      "Organizar dados públicos de projetos em cards claros, com foco em leitura e navegação.",
    highlights: [
      "Seleção de projetos relevantes para o modo Dev.",
      "Cards com linguagem objetiva e tecnologias em destaque.",
      "Experiência preparada para consulta rápida por recrutadores e parceiros.",
    ],
    gallery: [
      {
        id: "dev-004-gallery-001",
        title: "Fluxo da integração",
        description:
          "Organização dos dados do repositório até a apresentação no card.",
      },
      {
        id: "dev-004-gallery-002",
        title: "Cards de repositório",
        description:
          "Exibição de repositórios selecionados no modo Dev.",
      },
    ],
  },
  {
    id: "dev-005",
    slug: "landing-page-em-nextjs",
    title: "Landing page em Next.js",
    type: "dev",
    description:
      "Projeto para representar páginas responsivas, hierarquia visual e experiência construída com código.",
    summary:
      "Landing page conceitual com estrutura de seções, chamadas, responsividade e padrões visuais consistentes.",
    tags: ["Next.js", "Tailwind CSS", "Responsivo"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Frontend responsivo",
    tools: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    problem:
      "Criar uma página promocional clara, responsiva e visualmente marcante.",
    solution:
      "Montar seções com hierarquia forte, cards e chamadas bem distribuídas para leitura em desktop e mobile.",
    highlights: [
      "Layout responsivo em grid.",
      "Componentes consistentes com o design system.",
      "Conteúdo organizado para leitura rápida e ação clara.",
    ],
    gallery: [
      {
        id: "dev-005-gallery-001",
        title: "Hero responsivo",
        description:
          "Abertura, título e chamada principal da página.",
      },
      {
        id: "dev-005-gallery-002",
        title: "Seções internas",
        description:
          "Benefícios, cards e chamada final organizados em blocos responsivos.",
      },
    ],
  },
  {
    id: "dev-006",
    slug: "aplicacao-com-estados-de-interface",
    title: "Aplicação com estados de interface",
    type: "dev",
    description:
      "Aplicação conceitual focada em estados de interface, organização de dados e fluxos de uso.",
    summary:
      "Aplicação conceitual focada em estados de UI, dados tipados e preparação de experiências digitais mais completas.",
    tags: ["Estados", "Arquitetura", "Interface"],
    featured: false,
    status: "published",
    year: "2026",
    role: "Frontend e estados de interface",
    tools: ["TypeScript", "Modelagem de dados", "Componentização"],
    problem:
      "Organizar telas e fluxos considerando estados vazios, preenchidos e de erro.",
    solution:
      "Modelar estruturas tipadas e componentes preparados para receber conteúdo de forma consistente.",
    highlights: [
      "Melhora a leitura de estados de interface.",
      "Facilita testes visuais e ajustes de conteúdo.",
      "Organiza regras de apresentação antes da expansão do produto.",
    ],
    gallery: [
      {
        id: "dev-006-gallery-001",
        title: "Estados de interface",
        description:
          "Estados vazio, carregando, erro e conteúdo preenchido.",
      },
      {
        id: "dev-006-gallery-002",
        title: "Dados tipados",
        description:
          "Exemplos de listas, detalhes e relações entre informações.",
      },
    ],
  },
];
