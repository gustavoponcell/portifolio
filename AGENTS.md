# AGENTS.md

Instruções permanentes para agentes Codex trabalhando neste repositório.

## Escopo do projeto

Este projeto é um site pessoal de portfólio, currículo e contato para Gustavo Poncell, com identidade híbrida de Designer + Desenvolvedor. O produto terá dois modos principais:

- Modo Design: foco em atuação como designer, projetos visuais, artes, destaques e links curados para Behance.
- Modo Dev: foco em atuação como estudante/desenvolvedor, projetos, repositórios, tecnologias, destaques e integração futura com GitHub.

Não implemente funcionalidades fora do escopo solicitado no prompt atual. Se uma tarefa pedir documentação, não crie código de aplicação. Se uma tarefa pedir uma seção específica, não antecipe outras seções.

## Stack oficial planejada

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase para autenticação, banco e storage.
- Vercel para deploy.
- GitHub API para dados do modo Dev.
- Behance por curadoria manual, usando links cadastrados internamente.

Enquanto o projeto Next.js ainda não existir, não crie `package.json`, dependências, componentes, páginas ou configuração de framework sem pedido explícito.

## Estilo visual oficial

- Neobrutalismo moderno.
- Visual forte, jovem, memorável e profissional.
- Bordas grossas.
- Sombras duras e deslocadas.
- Alto contraste.
- Tipografia grande e expressiva.
- Cards com aparência editorial.
- Amarelo como cor principal do modo Design.
- Verde como cor principal do modo Dev.
- Base neutra com preto, branco, off-white e cinza.
- Layout responsivo, moderno e marcante.

O site deve diferenciar Design e Dev sem parecer dois produtos diferentes. Use a mesma base visual, mudando cor de destaque, ícones, badges e linguagem de conteúdo.

## Regras de implementação

- Leia a estrutura existente antes de alterar arquivos.
- Preserve conteúdo útil já existente.
- Prefira padrões e convenções já adotados no repositório.
- Mantenha mudanças pequenas, revisáveis e diretamente relacionadas ao prompt.
- Não crie abstrações prematuras.
- Não implemente integrações reais sem pedido explícito.
- Não crie dados pessoais inventados. Use placeholders claros quando necessário.
- Não crie páginas, componentes, banco, autenticação ou APIs em tarefas apenas documentais.
- Ao final de cada tarefa, resuma alterações feitas, decisões registradas, pendências e próximos passos.

## Regras de segurança

- Nunca exponha tokens do GitHub, Supabase ou qualquer API no client.
- Nunca commite valores reais de chaves, tokens, secrets, URLs privadas ou credenciais.
- Use variáveis de ambiente para dados sensíveis.
- Chaves secretas devem ser acessadas somente no servidor.
- Revise qualquer uso de `NEXT_PUBLIC_`: somente valores realmente públicos podem usar esse prefixo.
- Integrações com GitHub devem passar por rotas server-side, server actions ou outra camada segura.
- Supabase deve respeitar RLS quando o banco for configurado.
- A área administrativa deve ser restrita a um único usuário autorizado.

## Variáveis de ambiente

Não crie arquivo `.env` real. Quando necessário, crie ou atualize apenas `.env.example`, sem valores reais.

Variáveis previstas para etapas futuras:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_TOKEN`
- `GITHUB_USERNAME`
- `NEXT_PUBLIC_SITE_URL`

Qualquer variável com token, chave privada ou permissão elevada deve ficar sem prefixo `NEXT_PUBLIC_`.

## Regras de acessibilidade

- Manter contraste adequado em textos, botões, badges e cards.
- Garantir navegação por teclado.
- Usar estados visíveis de foco.
- Usar HTML semântico.
- Incluir textos alternativos em imagens relevantes.
- Não depender apenas de cor para comunicar estado, modo ou categoria.
- Evitar animações excessivas ou oferecer tratamento respeitoso a preferências de redução de movimento.

## Convenções de nomenclatura

- Arquivos e pastas: `kebab-case`.
- Componentes React futuros: `PascalCase`.
- Funções, variáveis e hooks: `camelCase`.
- Hooks futuros: prefixo `use`.
- Tipos e interfaces TypeScript: `PascalCase`.
- Constantes globais: `SCREAMING_SNAKE_CASE` quando fizer sentido.
- Documentação: português do Brasil.

## Estrutura esperada de pastas

Estrutura planejada para etapas futuras:

```text
.
├── app/
│   ├── (site)/
│   ├── admin/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   └── cards/
├── config/
├── data/
├── docs/
├── lib/
│   ├── github/
│   ├── supabase/
│   └── utils/
├── public/
│   └── images/
├── styles/
└── types/
```

Esta estrutura é uma referência. Ajustes são permitidos quando a implementação real justificar.

## Comandos esperados

Quando o projeto Next.js for criado, os comandos esperados são:

```bash
npm run dev
npm run lint
npm run build
npm run test
```

Se o gerenciador de pacotes ou os scripts forem diferentes no futuro, siga o `package.json` existente e atualize esta seção.

## Checklist de pronto

Antes de finalizar uma tarefa:

- A alteração atende exatamente ao prompt atual.
- Não foram criadas funcionalidades fora do escopo.
- Não há tokens, secrets ou dados sensíveis.
- A documentação afetada foi atualizada quando necessário.
- O código, quando existir, compila ou foi verificado na medida possível.
- Acessibilidade e responsividade foram consideradas em alterações de UI.
- O resumo final informa arquivos criados, arquivos alterados, decisões, pendências e próximo passo recomendado.

