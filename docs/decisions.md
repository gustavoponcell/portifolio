# Decisões Técnicas

## DEC-001 — Repositório como fonte de verdade

Data: 2026-08-26.

Decisão: todo estado durável do workflow ChatGPT + Claude fica em arquivos
versionados no repositório.

Motivo: conversas não são memória confiável, e Git permite revisar histórico,
diffs e decisões.

## DEC-002 — Começar com automação nível 1

Data: 2026-08-26.

Decisão: usar Markdown + Git manual antes de GitHub Issues, MCP, hooks ou PRs
automáticos.

Motivo: o projeto é individual e precisa de velocidade com controle. Automação
maior será adicionada depois que o ciclo manual estiver estável.

## DEC-003 — Um agente implementador por tarefa

Data: 2026-08-26.

Decisão: Claude Code implementa tarefas; ChatGPT/Codex planeja e revisa.

Motivo: reduz conflito de Git, duplicação de soluções e alterações simultâneas
nos mesmos arquivos.

## DEC-004 — Tarefas pequenas e especificadas

Data: 2026-08-26.

Decisão: cada tarefa deve ter ID, objetivo, contexto, arquivos prováveis,
requisitos, restrições, critérios de aceite e testes.

Motivo: documentação oficial de agentes de código recomenda tarefas claras e
bem delimitadas para melhor resultado.

## DEC-005 — Não depender de mock no público

Data: 2026-08-26.

Decisão: o site público deve exibir dados reais ou estados vazios profissionais.

Motivo: o portfólio final precisa ser confiável e não pode apresentar projetos,
experiências, números ou links fictícios.

## DEC-006 — Manter o status `mock` no schema/tipos por enquanto (TASK-009)

Data: 2026-08-26.

Mapeamento do uso atual:

- `src/types/project.ts`: `ProjectStatus = "mock" | "draft" | "published" | "archived"`.
- `src/types/admin.ts`: `AdminProjectStatus` (mesmo union) e o union de status de
  curadoria Dev, ambos incluindo `"mock"`.
- `src/types/github.ts`: union de status da curadoria GitHub inclui `"mock"`.
- `supabase/schema.sql`: `projects_status_check` e
  `github_repository_custom_status_check` permitem `'mock'` como valor válido
  de `status`/`custom_status`. Os defaults das colunas são diferentes entre
  si e não mudam com esta decisão: `projects.status` tem default `'draft'`;
  `github_repository_curations.custom_status` tem default `'published'`.
- UI admin: `<option value="mock">Mock</option>` em
  `design-project-form.tsx` e `dev-curation-form.tsx`; label "Mock" e cor de
  badge (amarelo/design) em `project-status-badge.tsx`.
- Confirmado por leitura de `src/lib/design-projects.ts` e
  `src/lib/dev-repositories.ts`: as duas únicas funções que alimentam o site
  público filtram exclusivamente `status = 'published'` /
  `custom_status = 'published'`. Um projeto ou curadoria com status `mock`
  **não pode** aparecer no público hoje — o filtro é por igualdade exata, não
  por exclusão de `mock`, então a proteção já existe estruturalmente na
  camada de leitura pública, independente de o valor `mock` existir no enum.

Decisão: **manter** `mock` no schema, nos tipos e na UI admin por enquanto.
Não remover, migrar ou renomear nesta tarefa.

Motivo:

- Risco atual é zero: o valor nunca alcança o público, por construção da
  query (`= 'published'`), não por convenção.
- Remover o valor do enum exigiria uma migração real em Supabase de
  produção (`ALTER TABLE ... DROP CONSTRAINT` + `ADD CONSTRAINT`), incluindo
  primeiro verificar se alguma linha real já usa `status/custom_status =
  'mock'` e decidir para onde migrá-la (`draft` é o equivalente mais
  próximo). Esta sessão não tem acesso ao banco de produção para fazer essa
  verificação com segurança, e a tarefa explicitamente proíbe migração
  destrutiva sem necessidade clara.
- `mock` continua útil como rótulo interno de teste/QA no admin (permite a
  quem administra marcar um item como "não é rascunho real nem publicado,
  é só teste"), sem risco de vazamento.

Plano de migração (não executado, para uma tarefa futura que decida
remover `mock`):

```sql
-- 1) Somente leitura: checar se existe alguma linha real com status mock
select id, slug, status from public.projects where status = 'mock';
select id, repository_name, custom_status
  from public.github_repository_curations
  where custom_status = 'mock';

-- 2) Se houver linhas, reatribuir para o equivalente mais próximo (draft)
--    ANTES de estreitar a constraint. Rodar somente depois de revisar o
--    resultado do passo 1 manualmente.
update public.projects set status = 'draft' where status = 'mock';
update public.github_repository_curations
  set custom_status = 'draft' where custom_status = 'mock';

-- 3) Estreitar as constraints (Postgres não tem "alter check", precisa
--    dropar e recriar)
alter table public.projects
  drop constraint projects_status_check;
alter table public.projects
  add constraint projects_status_check
  check (status in ('draft', 'published', 'archived'));

alter table public.github_repository_curations
  drop constraint github_repository_custom_status_check;
alter table public.github_repository_curations
  add constraint github_repository_custom_status_check
  check (custom_status in ('draft', 'published', 'archived'));
```

Depois de rodar o SQL acima em produção, os três `union types` em
`src/types/project.ts`, `src/types/admin.ts` e `src/types/github.ts`
perderiam `"mock"`, e as opções `<option value="mock">` e a entrada `mock`
em `project-status-badge.tsx` seriam removidas do código.

Revisão futura: reabrir esta decisão se o valor `mock` começar a ser usado
de forma real em produção, ou se a limpeza de código/schema for priorizada
por outra razão.

## DEC-007 — Usar Vercel Analytics + Speed Insights (TASK-013)

Data: 2026-08-26.

Decisão: adicionar `@vercel/analytics` e `@vercel/speed-insights` como
dependências de produção, renderizados em `src/app/layout.tsx`
(`<Analytics />` e `<SpeedInsights />`, dentro de `<body>`, depois do
`SiteShell`). Nenhum outro analytics (Google Analytics, Plausible, Fathom,
etc.) foi avaliado como alternativa principal, por já estarmos hospedados
na Vercel — a integração nativa é a opção mais leve e com menos peças
móveis.

Trade-offs de privacidade considerados:

- **A favor**: segundo a documentação da Vercel, Web Analytics e Speed
  Insights não usam cookies, não fazem fingerprinting nem rastreiam
  visitantes entre sites/sessões — coletam métricas agregadas (visitas,
  país aproximado, tipo de dispositivo, Core Web Vitals), sem dado
  pessoal identificável coletado pelo nosso próprio código.
- **Contra / limitações**: os dados passam pela infraestrutura da Vercel
  (um processador terceiro), então ainda é uma coleta de dados de uso,
  mesmo sem cookies — se o site vier a ter uma política de privacidade
  formal no futuro, ela deve mencionar isso. Também é um vínculo com a
  plataforma Vercel (não seria portável para outro host sem trocar de
  ferramenta).
- Por não usar cookies, decidi **não criar banner de consentimento**,
  conforme a própria restrição da tarefa ("não criar banner de
  consentimento se a solução escolhida não exigir"). Isso segue o
  entendimento público da Vercel sobre a ferramenta, mas a conformidade
  final com LGPD/GDPR para o caso de uso específico é uma decisão de
  produto do usuário, não algo que eu possa garantir como certeza legal.

Como desativar (se o usuário decidir remover depois):

1. Remover `<Analytics />` e `<SpeedInsights />` de
   `src/app/layout.tsx` (e os dois `import`s correspondentes).
2. Rodar `npm uninstall @vercel/analytics @vercel/speed-insights`.
3. Opcionalmente, desabilitar "Web Analytics"/"Speed Insights" no painel
   da Vercel (Settings do projeto) — isso também interrompe a coleta
   mesmo sem tocar no código.

Pendência: a coleta de dados só começa de verdade depois que "Web
Analytics" e "Speed Insights" forem habilitados no painel da Vercel
(aba Analytics do projeto) — esta sessão não tem acesso a esse painel
para confirmar se já estão habilitados ou se dependem de um plano pago
específico. O código funciona (não quebra nada) independentemente disso;
sem habilitar no painel, os scripts simplesmente não têm para onde
enviar dados.

## DEC-008 — Fluxo final de workflow de agentes (TASK-015)

Data: 2026-08-26.

Decisão: consolidar o fluxo Claude Code + Codex Plugin + GitHub como
segue, com base na experiência real de TASK-001 a TASK-015 (15 tarefas
concluídas):

- **Fluxo primário**: Claude Code interativo, chamando
  `/codex:review --background` por tarefa (plugin `codex@openai-codex`),
  seguindo `docs/claude-codex-continuous-loop.md`. GitHub Actions
  (TASK-011) cobre lint/test/build/audit em todo push/PR.
- **`scripts/agent-loop.ps1`** (PowerShell + Codex CLI direto) vira
  **legado/alternativo** — nunca foi usado nas 15 tarefas reais, mas
  continua no repositório (não removido) como opção para rodar o loop
  fora de uma sessão interativa (ex.: headless/agendado).
- **GitHub Issues por tarefa**: não adotado. O arquivo `docs/tasks/` +
  `docs/backlog.md` + `docs/handoff.md` já cobriu 15 tarefas sem atrito;
  Issues adicionariam uma segunda fonte de verdade a manter sincronizada
  sem benefício claro para um projeto individual.
- **Branch/PR por tarefa**: não adotado. Sem colaboradores revisando PRs,
  e cada tarefa já passa por revisão objetiva (Codex ou Claude Code)
  antes do commit direto em `main` — branch/PR adicionaria cerimônia sem
  um segundo revisor humano para justificar o ganho.

Limites do plugin Codex documentados em `docs/agent-workflow.md`
("Limites Conhecidos do Plugin Codex"): esgotamento de quota da conta
ChatGPT no meio do loop, interação do stop-time review gate com quota
esgotada (bloqueia toda resposta, não só revisões), e o protocolo de
fallback (Claude Code assume o papel de revisor objetivo a pedido
explícito do usuário, sempre marcado como tal no handoff, nunca
apresentado como revisão do Codex).

Motivo: manter o nível de automação atual (Nível 2 semi-automatizado)
até que o volume de trabalho ou o número de colaboradores realmente
exijam Issues/branches/PRs ou MCP (Nível 3) — evita complexidade e risco
operacional desnecessários para um projeto individual, conforme já
apontado em `docs/agent-workflow.md`.

Revisão futura: reabrir esta decisão se o projeto ganhar colaboradores,
se o volume de tarefas simultâneas crescer, ou se os limites de quota do
Codex se tornarem frequentes o suficiente para justificar um Nível 3
(MCP, agentes com permissões separadas, PRs automáticos).

## DEC-009 — Não versionar `docs/ui-review/` (TASK-016)

Data: 2026-08-27.

Decisão: `docs/ui-review/` (screenshots reais "antes"/"depois" capturados
durante auditorias de UI/UX) **não é versionado no Git** — adicionado ao
`.gitignore`, mantido só localmente.

Motivo: são artefatos de evidência de uma rodada específica de diagnóstico
visual, não documentação viva nem código. Cada rodada futura da auditoria
de UI/UX vai gerar um novo conjunto de capturas que substitui o anterior;
versionar imagens binárias no histórico do Git infla o repositório sem
benefício, já que o achado relevante (o quê, por quê, como foi corrigido)
já fica registrado em texto em `docs/ui-ux-audit.md` e `docs/handoff.md`.

Revisão futura: reconsiderar se um dia for necessário auditar
visualmente uma versão histórica específica do site (ex.: comparação
formal de regressão visual entre releases) — nesse caso, um serviço
externo de screenshot/diffing visual seria mais adequado que versionar
PNGs/JPEGs direto no Git.
