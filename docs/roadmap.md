# Roadmap

## Fase 1: documentação e estruturação

- Criar `AGENTS.md`.
- Criar documentação inicial em `docs/`.
- Registrar requisitos, arquitetura, design system e roadmap.
- Preparar o repositório para a criação do projeto Next.js.

## Fase 2: criação do projeto Next.js

- Inicializar Next.js com App Router e TypeScript.
- Configurar Tailwind CSS.
- Definir estrutura inicial de pastas.
- Configurar scripts básicos.
- Validar build inicial.

## Fase 3: design system neobrutalista

- Definir tokens de cores, tipografia, espaçamentos, bordas e sombras.
- Configurar shadcn/ui.
- Criar componentes base quando solicitado.
- Documentar padrões visuais.

## Fase 4: layout global

- Criar estrutura global de layout.
- Definir navegação principal.
- Preparar alternância conceitual entre Design e Dev.
- Definir footer com contatos e links sociais.

## Fase 5: Home

- Criar apresentação da identidade híbrida.
- Exibir chamada para Design e Dev.
- Exibir destaques iniciais.
- Garantir responsividade e acessibilidade.

## Fase 6: modo Design com dados mockados

- Criar página ou modo Design.
- Exibir projetos visuais mockados.
- Preparar campos para imagem, descrição, tags, destaque e link Behance.
- Validar uso do amarelo como cor principal.

## Fase 7: modo Dev com dados mockados

- Criar página ou modo Dev.
- Exibir projetos dev mockados.
- Preparar campos para tecnologias, links, destaque e repositório.
- Validar uso do verde como cor principal.

## Fase 8: integração GitHub

- Criar estratégia server-side para consumir GitHub API.
- Garantir que `GITHUB_TOKEN` nunca vá para o client.
- Permitir curadoria manual dos projetos exibidos.
- Tratar erros e limites da API.

## Fase 9: páginas individuais de projeto

- Criar páginas detalhadas para projetos.
- Suportar projetos de Design e Dev.
- Exibir imagens, links, tecnologias, descrição e contexto.
- Preparar SEO por projeto.

## Fase 10: Supabase

- Configurar projeto Supabase.
- Modelar banco inicial.
- Configurar políticas de segurança.
- Preparar acesso server-side.

## Fase 11: login/admin

- Criar autenticação para um único administrador.
- Proteger rotas administrativas.
- Criar painel administrativo inicial.

## Fase 12: CRUDs

- Implementar CRUD de bio e informações principais.
- Implementar CRUD de contatos.
- Implementar CRUD de experiências.
- Implementar CRUD de cursos e certificados.
- Implementar CRUD de projetos Design e Dev.
- Implementar controle de destaques e visibilidade.

## Fase 13: upload de imagens

- Configurar Supabase Storage.
- Permitir upload seguro de imagens.
- Validar tamanho, formato e uso público.
- Associar imagens a projetos e perfil.

## Fase 14: SEO, performance e acessibilidade

- Revisar metadados.
- Ajustar sitemap e robots quando necessário.
- Otimizar imagens.
- Auditar contraste, foco e navegação por teclado.
- Revisar performance em mobile.

## Fase 15: deploy

- Configurar Vercel.
- Definir variáveis de ambiente.
- Validar build de produção.
- Testar domínio e URLs públicas.

## Fase 16: revisão final

- Revisar conteúdo.
- Testar fluxos principais.
- Corrigir bugs.
- Validar acessibilidade mínima.
- Registrar pendências para evolução pós-MVP.

