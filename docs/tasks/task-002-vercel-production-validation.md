# TASK-002 — Validar deploy Vercel em produção

## ID

TASK-002

## Objetivo

Validar o deploy de produção na Vercel depois da atualização de dependências,
garantindo que o site público, login, área restrita, Supabase e GitHub estejam
funcionando no ambiente Production.

## Contexto

TASK-001 atualizou `next` e `eslint-config-next` para `16.3.3` e zerou
`npm audit --omit=dev`. Antes de considerar o projeto pronto para produção, é
preciso confirmar que a Vercel usa as variáveis corretas e que o deploy publicado
responde sem 404, erros de build ou falhas de autenticação.

## Arquivos Provavelmente Envolvidos

Idealmente nenhum arquivo de código.

Pode envolver documentação se algum procedimento ou problema real for descoberto:

- `docs/handoff.md`
- `docs/project-status.md`
- `docs/backlog.md`
- `README.md`

## Requisitos

- Conferir `git status -sb` antes de começar.
- Confirmar que o commit local que será publicado contém TASK-001 e o protocolo
  de colaboração.
- Validar que as variáveis da Vercel Production correspondem ao `.env.example`,
  sem expor valores no repositório ou no handoff.
- Fazer redeploy de Production quando necessário.
- Testar a URL final de produção.
- Confirmar que `/admin` redireciona para `/login` quando não autenticado.
- Confirmar que login admin funciona com o usuário autorizado já criado no
  Supabase.
- Confirmar que dados públicos reais aparecem quando existem no Supabase/GitHub.
- Registrar qualquer erro com URL, status HTTP, rota afetada e possível causa.

## Variáveis Esperadas Na Vercel

Não escreva valores reais em nenhum arquivo. Apenas confirme presença:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `ADMIN_EMAIL`
- `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_USERNAME`
- `GITHUB_TOKEN` opcional

## Restrições

- Não criar `.env`.
- Não commitar secrets.
- Não alterar schema, RLS, Auth, Storage ou dados reais.
- Não trocar domínio sem confirmação do usuário.
- Não usar variáveis `NEXT_PUBLIC_*` para secrets.
- Não implementar novas features durante a validação.

## Critérios de Aceite

- Deploy Production na Vercel fica com status Ready.
- URL final abre a Home sem 404.
- Rotas públicas principais respondem corretamente:
  - `/`
  - `/design`
  - `/dev`
  - `/contato`
  - `/login`
  - `/sitemap.xml`
  - `/robots.txt`
- `/admin` protege acesso e redireciona para login quando necessário.
- Login admin funciona em produção.
- Não há erros relevantes no console nas páginas principais.
- `docs/handoff.md` registra resultado, URLs testadas, problemas e pendências.

## Testes Necessários

Local antes do deploy:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --omit=dev
```

Produção:

- abrir a URL final no navegador;
- testar rotas públicas;
- testar login;
- abrir DevTools Console nas páginas principais;
- revisar logs do deploy na Vercel se houver erro.

## Validação Pelo ChatGPT

ChatGPT deverá:

- revisar o handoff;
- conferir se nenhuma credencial foi escrita em arquivos;
- conferir status Git;
- validar logs e URLs informadas;
- decidir se TASK-002 está aprovada ou se precisa de correção.

## Prompt Para Claude Code

Use exatamente esta tarefa como escopo. Leia `AGENTS.md`, `CLAUDE.md`,
`docs/project-status.md`, `docs/backlog.md`, `docs/handoff.md` e este arquivo.
Valide o deploy sem expor secrets. Ao terminar, atualize `docs/handoff.md` e
não faça commit.
