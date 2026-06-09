# AI_LOG.md — Registro de uso de IA

> Arquivo obrigatório conforme regras do Hackathon PontoEnv 2026.

Todo o projeto foi desenvolvido com auxílio do **Claude (Anthropic)** e **GitHub Copilot**, com prompts direcionados por decisões de arquitetura próprias. O uso foi intencional e consciente — não foi "colar tudo cegamente", mas sim guiar a IA com contexto específico e revisar cada saída criticamente.

---

## Fase 1 — Projeto Base (MVP inicial)

| Parte do código | IA usada | Prompt / instrução dado | Por que usou IA aqui |
|---|---|---|---|
| Estrutura inicial do projeto (pastas, tsconfig, package.json) | Claude | "Crie a estrutura de um projeto React + TypeScript + Tailwind com Create React App" | Boilerplate repetitivo; foco do tempo no design de componentes |
| Tipos TypeScript (`types/index.ts`) | Claude | "Defina interfaces para Transaction, FilterState e Summary num app de controle financeiro" | Queria garantir consistência de tipos desde o início |
| Hook `useTransactions` | Claude | "Crie um hook React que gerencia transações com localStorage, filtros por tipo/categoria/busca e calcula summary com useMemo" | Lógica de estado previsível; revisei a separação de responsabilidades e ajustei o retorno do hook |
| `SummaryCards` | Claude | "Componente mobile-first com card de saldo em gradiente e dois cards menores de receita/despesa usando apenas Tailwind" | Acelerar o layout visual; ajustei as cores e a hierarquia tipográfica |
| `TransactionForm` | Claude | "Modal bottom-sheet com toggle de tipo, inputs controlados, seletor de categoria dinâmico por tipo e validação simples" | Formulário com muitos campos; validação revisada manualmente |
| `FilterBar` | Claude | "Barra de filtros com busca, pills de tipo e pills de categoria, sem bibliotecas externas" | Padrão de UX móvel; revisei a lógica de reset de categoria ao trocar tipo |
| `TransactionItem` | Claude | "Item de lista com ícone de categoria, descrição, data formatada, valor colorido e confirmação de exclusão inline" | Padrão de lista; adicionei o estado de confirmação de delete manualmente |
| `TransactionList` com agrupamento por data | Claude | "Componente que agrupa transações por data e exibe labels contextuais como Hoje/Ontem" | Agrupamento de array com reduce; revisei o algoritmo de comparação de datas |
| `CategoryChart` (barras em Tailwind puro) | Claude | "Gráfico de barras horizontal com Tailwind puro, sem Chart.js, mostrando top 5 categorias de despesa com percentual relativo ao maior valor" | Queria evitar dependências externas; validei que o cálculo de porcentagem estava correto |
| `formatCurrency` e `formatDate` | Claude | "Funções utilitárias de formatação para BRL e data em pt-BR" | Intl API tem pegadinhas de timezone; revisei o formatDate para evitar off-by-one com UTC |

---

## Fase 2 — Upgrade Premium (melhorias técnicas e de UX)

| Parte do código | IA usada | Prompt / instrução dado | Por que usou IA aqui |
|---|---|---|---|
| `tailwind.config.js` — paleta customizada e animações | Claude | "Configurar Tailwind com darkMode: 'class', paleta primary/success/danger/base, keyframes slide-up/fade-in/shimmer e sombras glow" | Muitas variáveis a definir em sintaxe específica; validei cada token contra os componentes |
| `index.css` — Google Fonts, dark mode, utilitários | Claude | "CSS global com Inter via Google Fonts, variáveis de tema, skeleton shimmer, glassmorphism e utilitário no-scrollbar" | Combinar múltiplas features CSS em um arquivo consistente; revisei a especificidade dos seletores dark: |
| `services/storage.ts` — storage versionada | Claude | "Criar serviço de storage versionado com migração automática da v1 (array puro) para v2 (payload com versão e timestamp), com proteção contra JSON corrompido" | Lógica de migração tem muitos casos edge; validei o fluxo de migração manualmente |
| `utils/export.ts` — exportação CSV | Claude | "Gerar função para exportar array de transações como CSV com BOM UTF-8 para compatibilidade com Excel pt-BR, separador ponto-e-vírgula, e download automático" | Código repetitivo de manipulação de Blob e link temporário; revisei o escape de aspas duplas |
| `utils/insights.ts` — insights automáticos | Claude | "Função pura que recebe transações, calcula breakdown percentual por categoria e gera avisos automáticos contextuais (alimentação > 35%, lazer > 25%, categoria > 40%)" | Queria avisos com thresholds bem definidos; ajustei os percentuais após analisar casos reais |
| `hooks/useDarkMode.ts` | Claude | "Hook que aplica/remove classe 'dark' no <html>, persiste em localStorage e inicializa respeitando prefers-color-scheme" | Padrão estabelecido de dark mode; o diferencial foi a leitura da media query do sistema |
| `hooks/useToast.ts` | Claude | "Hook com fila de toasts, auto-dismiss com cleanup de timers, max 4 toasts visíveis simultaneamente, helpers success/error/info" | Gerenciamento de timers com useRef é propenso a memory leaks; validei o cleanup cuidadosamente |
| `hooks/useTransactions.ts` — expansão | Claude | "Adicionar suporte a dateFrom, dateTo, sortOrder no filtro, e computar executiveSummary com biggestIncome, biggestExpense, avgTicket" | Expandir hook existente sem quebrar contratos; revisei o applySortOrder para preservar ordem do array de entrada |
| `Logo.tsx` — SVG inline | Claude | "SVG 32x32 com ícone de gráfico de linha ascendente, fundo azul #2563EB arredondado, ponto verde #10B981 no topo, e linha base semitransparente" | Geração de SVG path matemático; ajustei os pontos para ficarem simétricos e legíveis em 28px |
| `Header.tsx` — header premium | Claude | "Header glassmorphism com logo, botão dark-mode com ícones sol/lua SVG puros, botão download CSV, e botão nova transação com glow effect" | Layout complexo com múltiplos estados de ícone; validei acessibilidade com aria-label em cada botão |
| `ExecutiveDashboard.tsx` | Claude | "Grid 2x2 de métricas executivas (maior receita, maior despesa, total de transações, ticket médio) com ícones SVG e cores semânticas por tipo" | Dashboard com dados derivados; ajustei a formatação condicional para o caso de ausência de dados |
| `InsightsPanel.tsx` | Copilot | "Sugerir estrutura de painel de insights com avisos em destaque e breakdown de categorias com barras de cor variável por posição" | Acelerar o layout do painel; reorganizei a hierarquia visual e escolhi as cores manualmente |
| `ToastContainer.tsx` | Claude | "Componente de toast com animação de entrada CSS, ícones SVG por tipo (success/error/info), clique para fechar e aria-live para acessibilidade" | Animação de entrada requer coordenação com useEffect; revisei o timing do delay de 10ms |
| `EmptyState.tsx` | Claude | "SVG ilustrado inline de carteira com moedas fantasmas e ponto de interrogação, com mensagens contextuais (com filtro / sem filtro) e botão de reset" | SVG decorativo com múltiplos elementos; ajustei as posições e opacidades para parecer harmônico em dark mode |
| `SkeletonCard.tsx` | Copilot | "Componente de skeleton loading com shimmer animation, estrutura similar ao TransactionItem, suporte a count prop" | Boilerplate repetitivo de skeleton; ajustei os tamanhos para combinar com o TransactionItem real |
| `FilterBar.tsx` — expansão | Claude | "Adicionar grid de data De/Até e select de ordenação acima das pills existentes, mantendo dark mode e responsividade mobile" | Layout de grid com 3 colunas em mobile requer atenção; testei em 320px de largura |
| Refatoração com `memo()` em componentes | Copilot | "Sugerir quais componentes se beneficiam de React.memo dado o padrão de props" | Identificar oportunidades de memoização sem over-engineering |
| `README.md` | Claude | "Gerar README técnico profissional com seções: funcionalidades, tecnologias, arquitetura, decisões técnicas, como executar, estrutura de pastas, melhorias futuras, uso de IA" | Documentação estruturada leva tempo; revisei cada seção para refletir fielmente o que foi implementado |

---

## Reflexão sobre o uso de IA

A IA foi usada como **par de programação sênior**, não como substituto do raciocínio. Em cada trecho gerado:

1. **Eu defini o contrato** (tipos, comportamento esperado, restrições técnicas)
2. **A IA gerou o código base** com a estrutura correta
3. **Eu revisei criticamente**: lógica de edge cases, acessibilidade, performance, consistência de dark mode
4. **Eu integrei e testei** no contexto real da aplicação

### O que a IA NÃO fez:
- Não definiu a arquitetura (separação de camadas, hook único, storage versionada)
- Não escolheu a paleta de cores nem os tokens de design
- Não determinou quais funcionalidades implementar
- Não escreveu os prompts para si mesma

### O que aprendemos usando IA conscientemente:
- A IA é excelente em boilerplate correto (Intl API, manipulação de Blob, SVG paths)
- A IA erra em edge cases de timezone e memory leaks com timers, revisão humana é essencial
- Prompts com contexto técnico específico geram código muito mais aproveitável do que prompts genéricos
