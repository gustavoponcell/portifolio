# Arquitetura Inicial

## Stack recomendada

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth.
- Supabase Database.
- Supabase Storage.
- Vercel.
- GitHub API.
- Behance por links curados manualmente.

A implementação real será feita em prompts futuros. Este documento define a direção arquitetural inicial.

## Rotas planejadas

Rotas públicas previstas:

```text
/
/design
/dev
/projetos
/projetos/[slug]
/sobre
/contato
```

Rotas administrativas previstas:

```text
/admin/login
/admin
/admin/perfil
/admin/contatos
/admin/experiencias
/admin/cursos
/admin/certificados
/admin/projetos
```

As rotas podem ser consolidadas ou ajustadas conforme a experiência final.

## Modelo geral de dados futuro

Entidades previstas:

- Perfil: nome, bio, foto, resumo, cargo, localização opcional.
- Contatos: e-mail, telefone, WhatsApp, LinkedIn, GitHub, Behance e outros links.
- Experiências: título, organização, período, descrição, tipo e ordem.
- Cursos: nome, instituição, período, descrição, link opcional e ordem.
- Certificados: nome, emissor, data, link, imagem opcional e ordem.
- Projetos: título, slug, tipo, descrição, imagem, tags, tecnologias, links, destaque, visível e ordem.
- Configurações do site: textos principais, modo em destaque, SEO e preferências visuais.

Campos específicos de projeto:

- Design: imagens, categoria visual, link Behance, contexto criativo.
- Dev: repositório, link GitHub, deploy, tecnologias, descrição curada e status de destaque.

## Integração GitHub

A integração com GitHub deve ser feita de forma server-side. O token do GitHub nunca deve ser exposto ao client.

Estratégia prevista:

- Usar `GITHUB_USERNAME` para identificar o perfil.
- Usar `GITHUB_TOKEN` somente no servidor quando necessário.
- Buscar repositórios e metadados relevantes.
- Salvar ou combinar os dados com curadoria manual.
- Permitir ocultar repositórios.
- Permitir destacar projetos.
- Permitir sobrescrever descrição exibida.

## Estratégia Behance

O Behance será tratado por curadoria manual. O site deve permitir cadastrar projetos de design com links para Behance, mas não depender obrigatoriamente de API do Behance.

Essa decisão reduz risco de autenticação, limites de API e exposição desnecessária de credenciais.

## Supabase Auth

Uso planejado:

- Autenticação de um único administrador.
- Proteção de rotas administrativas.
- Sessão segura.
- Verificação server-side quando necessário.

O modelo final deve impedir que visitantes acessem operações administrativas.

## Supabase Storage

Uso planejado:

- Foto de perfil.
- Imagens de projetos.
- Imagens de certificados quando necessário.

Cuidados:

- Validar tipo e tamanho de arquivo.
- Separar buckets públicos e privados quando fizer sentido.
- Não permitir upload anônimo irrestrito.

## Vercel

Uso planejado:

- Deploy do projeto Next.js.
- Configuração de variáveis de ambiente pelo painel da Vercel.
- Build de produção a cada push na branch principal, quando configurado.

## Segurança básica

- Nunca expor tokens no client.
- Nunca commitar `.env` real.
- Usar RLS no Supabase.
- Validar permissões em rotas administrativas.
- Tratar erros de API sem vazar detalhes sensíveis.
- Usar placeholders em documentação e exemplos.
- Revisar qualquer variável com prefixo `NEXT_PUBLIC_`.

## Variáveis de ambiente previstas

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_TOKEN=
GITHUB_USERNAME=
NEXT_PUBLIC_SITE_URL=
```

Valores reais devem existir apenas em ambiente local seguro ou na configuração da Vercel/Supabase, nunca no repositório.

## Observação de implementação

Este documento não implementa a arquitetura. Ele registra as decisões iniciais para orientar prompts futuros. A próxima etapa recomendada é criar o projeto base Next.js com TypeScript e Tailwind CSS.

