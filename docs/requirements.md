# Requisitos do Projeto

## Visão geral

O projeto é um site pessoal de portfólio, currículo e contato com duas frentes principais: Design e Desenvolvimento. A experiência deve apresentar uma identidade híbrida, permitindo que visitantes entendam rapidamente a atuação criativa e técnica do proprietário do site.

## Objetivo do produto

Criar uma presença digital profissional, memorável e fácil de atualizar, reunindo trabalhos visuais, projetos de desenvolvimento, experiências, cursos, certificados e canais de contato.

## Público-alvo

- Recrutadores e empresas buscando perfil júnior ou estágio em tecnologia.
- Clientes ou parceiros interessados em serviços de design.
- Professores, colegas e contatos profissionais.
- Visitantes vindos de GitHub, Behance, LinkedIn ou currículo.

## Requisitos funcionais

- Exibir uma Home geral com a identidade Designer + Desenvolvedor.
- Permitir navegação para modo Design.
- Permitir navegação para modo Dev.
- Exibir projetos em destaque.
- Exibir seção Sobre mim.
- Exibir experiências profissionais ou acadêmicas.
- Exibir cursos e certificados quando houver conteúdo cadastrado.
- Ocultar cursos e certificados quando não houver conteúdo cadastrado.
- Exibir contatos: WhatsApp, e-mail, telefone e links sociais.
- Permitir área administrativa para um único usuário.
- Permitir edição de bio, foto, contatos e informações principais do site.
- Permitir cadastro e edição de experiências.
- Permitir cadastro e edição de cursos e certificados.
- Permitir cadastro e edição de projetos de design.
- Permitir cadastro e edição de projetos dev.
- Permitir definição manual de projetos em destaque.
- Permitir ocultar repositórios ou projetos do modo Dev.
- Permitir editar descrições exibidas para projetos dev.
- Permitir cadastrar links de projetos completos no Behance.
- Futuramente integrar com GitHub para buscar projetos, repositórios e tecnologias.

## Requisitos não funcionais

- Interface responsiva.
- Boa performance inicial.
- SEO básico.
- Acessibilidade mínima.
- Segurança adequada para não expor tokens no client.
- Código em TypeScript.
- Estilo visual consistente com neobrutalismo moderno.
- Estrutura preparada para deploy na Vercel.
- Conteúdo administrável sem necessidade de alterar código para cada atualização.

## Regras de negócio

- O site terá apenas um administrador.
- O modo Design usa amarelo como cor principal.
- O modo Dev usa verde como cor principal.
- Behance será tratado por curadoria manual: projetos internos podem ter link para Behance, mas o site não dependerá obrigatoriamente da API do Behance.
- Projetos dev poderão ser importados ou consultados via GitHub no futuro, mas devem aceitar curadoria manual.
- Repositórios ocultos não devem aparecer publicamente.
- Projetos em destaque devem ser definidos manualmente.
- Se uma seção opcional não tiver conteúdo, ela deve ficar oculta.
- Dados sensíveis e tokens nunca devem ser enviados para o navegador.

## Perfis de usuário

- Visitante: acessa o site público, visualiza informações, projetos e contatos.
- Administrador: único usuário autorizado a gerenciar conteúdo, projetos e informações pessoais.

## MVP

O MVP deve conter:

- Home pública.
- Modo Design com projetos cadastrados manualmente.
- Modo Dev com projetos cadastrados manualmente ou mockados antes da integração.
- Projetos em destaque.
- Sobre mim.
- Contatos.
- Estrutura visual neobrutalista responsiva.
- SEO básico.
- Admin simples e seguro para manutenção de conteúdo.

## Fora de escopo nesta fase

Nesta fase documental, estão fora de escopo:

- Inicializar Next.js.
- Criar páginas ou componentes.
- Instalar dependências.
- Configurar Supabase.
- Configurar Vercel.
- Implementar autenticação.
- Implementar integração com GitHub.
- Implementar upload de imagens.
- Criar banco de dados.
- Criar arquivos `.env` reais.

## Critérios de aceite gerais

- Documentação em português do Brasil.
- Escopo do produto descrito com clareza.
- Stack planejada registrada.
- Regras de segurança registradas.
- Caminho de evolução documentado.
- Próxima etapa claramente indicada: criação do projeto base Next.js.

