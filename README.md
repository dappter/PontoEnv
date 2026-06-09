# PontoEnv Finance

> Aplicação de controle financeiro pessoal premium, construída para o **Hackathon PontoEnv 2026**.

[![Deploy no Netlify](https://img.shields.io/badge/🚀%20Demo%20ao%20vivo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://agent-6a280d5e150d404fb2f6fbbc--finance-pontenv.netlify.app/)

## 🔗 [▶ Acesse a aplicação em produção](https://agent-6a280d5e150d404fb2f6fbbc--finance-pontenv.netlify.app/)

> **URL:** `https://agent-6a280d5e150d404fb2f6fbbc--finance-pontenv.netlify.app/`

Um produto pronto para produção com design system consistente, dark mode, insights inteligentes, exportação de dados e arquitetura escalável — tudo sem bibliotecas de componentes de terceiros.

---

## Funcionalidades

### Obrigatórias (Desafio)
- ✅ **Adicionar transações** (receita ou despesa) com: descrição, valor, categoria e data
- ✅ **Listar transações** com filtro por tipo (receita/despesa) e categoria
- ✅ **Resumo financeiro**: saldo total, total de receitas e total de despesas
- ✅ **Persistência de dados** via localStorage

### Diferenciais Implementados
- 🌙 **Dark Mode** — alternância no header, persiste em localStorage, respeita preferência do sistema
- 📊 **Dashboard Executivo** — maior receita, maior despesa, total de transações, ticket médio
- 💡 **Insights Inteligentes** — categoria que mais consome, percentuais, avisos automáticos contextuais
- 🔍 **Filtros Avançados** — busca por descrição, intervalo de datas (De/Até), 4 tipos de ordenação
- 📥 **Exportação CSV** — arquivo com BOM UTF-8 para compatibilidade com Excel em pt-BR
- 🔔 **Toasts de Feedback** — notificações de sucesso e erro com auto-dismiss
- 💀 **Skeleton Loading** — experiência de carregamento suave
- 📭 **Empty State Ilustrado** — SVG próprio com mensagens contextuais e botão de reset de filtros
- 🎨 **Design Premium** — glassmorphism, gradientes, micro-animações, logo SVG própria
- 🗃️ **Storage Versionada** — migração automática de dados legados e proteção contra corrupção

---

## Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 18.2 | UI framework |
| TypeScript | 4.9 | Tipagem estática |
| Tailwind CSS | 3.3 | Design system / estilos |
| Create React App | 5.0 | Build tooling |

> **Proibido e cumprido:** Zero bibliotecas de componentes (sem Material UI, Shadcn, Ant Design, etc.)

---

## Arquitetura

```
src/
├── components/          # Componentes de UI (responsabilidade única)
│   ├── Logo.tsx         # SVG inline próprio do projeto
│   ├── Header.tsx       # Header fixo com glassmorphism
│   ├── SummaryCards.tsx # Cards de resumo financeiro
│   ├── FilterBar.tsx    # Filtros avançados (busca, datas, ordenação)
│   ├── TransactionForm.tsx  # Modal de nova transação
│   ├── TransactionList.tsx  # Lista agrupada por data
│   ├── TransactionItem.tsx  # Item individual com confirmação de delete
│   ├── CategoryChart.tsx    # Barras de despesa por categoria
│   ├── ExecutiveDashboard.tsx # 4 métricas executivas em grid
│   ├── InsightsPanel.tsx    # Insights e avisos automáticos
│   ├── ToastContainer.tsx   # Notificações de feedback
│   ├── SkeletonCard.tsx     # Loading skeleton animado
│   └── EmptyState.tsx       # Estado vazio ilustrado
│
├── hooks/               # Lógica de estado reutilizável
│   ├── useTransactions.ts   # Hook principal: transações, filtros, métricas
│   ├── useDarkMode.ts       # Gerenciamento de tema com persistência
│   └── useToast.ts          # Sistema de notificações
│
├── services/            # Integrações e I/O
│   └── storage.ts           # Camada de persistência versionada
│
├── utils/               # Funções puras e desacopladas
│   ├── format.ts            # formatCurrency, formatDate, generateId
│   ├── constants.ts         # Labels, ícones, listas de categorias
│   ├── export.ts            # Exportação para CSV
│   └── insights.ts          # Cálculo de insights e avisos
│
├── types/               # Contratos TypeScript centralizados
│   └── index.ts             # Transaction, FilterState, Toast, etc.
│
├── App.tsx              # Composição principal + roteamento de abas
└── index.tsx            # Entry point
```

---

## Decisões Técnicas

### 1. Sem bibliotecas de componentes
Todos os componentes foram construídos do zero com Tailwind CSS. Isso garante controle total sobre design, tamanho do bundle e cumprimento das regras do hackathon.

### 2. Hook único para transações (`useTransactions`)
Centraliza toda a lógica de estado: CRUD, filtros compostos, ordenação, métricas derivadas (`summary`, `executiveSummary`, `categoryBreakdown`). Usa `useMemo` em todos os cálculos derivados para evitar recomputação desnecessária.

### 3. Storage versionada com migração automática
A camada `services/storage.ts` detecta dados no formato legado (v1 — array puro) e os migra automaticamente para o novo formato versionado (v2), sem perda de dados.

### 4. Dark mode via classe CSS no `<html>`
Implementação com `darkMode: 'class'` no Tailwind, aplicada pelo hook `useDarkMode`. Respeita `prefers-color-scheme` na primeira visita e persiste a escolha do usuário.

### 5. Filtros compostos sem biblioteca
A função de filtragem no `useTransactions` aplica sequencialmente: tipo → categoria → busca textual → data inicial → data final → ordenação. Cada critério é opcional e independente.

### 6. Insights puramente computacionais
`utils/insights.ts` é uma função pura que recebe transações e retorna análises. Sem estado, sem side effects — fácil de testar e reaproveitar.

### 7. Exportação CSV com BOM UTF-8
O arquivo gerado inclui BOM (`\uFEFF`) para que o Excel (Windows/pt-BR) abra corretamente sem precisar de configuração adicional. Separador `;` ao invés de `,` para padrão brasileiro.

---

## Como Executar

### Pré-requisitos
- Node.js 16+
- npm 8+

### Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/guilhermeonrails/pontoenv-finance.git
cd pontoenv-finance

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm start
# → Abre em http://localhost:3000

# Build de produção
npm run build
```

---

## Estrutura de Pastas

```
pontoenv-finance/
├── public/
│   └── index.html           # HTML com favicon SVG inline e meta tags SEO
├── src/
│   ├── components/          # 13 componentes
│   ├── hooks/               # 3 hooks customizados
│   ├── services/            # Camada de persistência
│   ├── utils/               # 4 utilitários
│   ├── types/               # Tipos TypeScript
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css            # Design tokens + animações
├── tailwind.config.js       # Paleta customizada + dark mode + animações
├── README.md
└── AI_LOG.md                # Registro de uso de IA (obrigatório)
```

---

## Melhorias Futuras

- [ ] **Metas de orçamento** por categoria com alerta de limite
- [ ] **Gráfico de linha** de evolução do saldo ao longo do tempo
- [ ] **Importação de CSV** para migração de dados externos
- [ ] **Recorrência** — transações fixas mensais/semanais
- [ ] **Multi-conta** — carteira, conta corrente, cartão de crédito
- [ ] **PWA offline-first** com Service Worker
- [ ] **Testes unitários** com React Testing Library

---

## Uso de IA

Este projeto foi desenvolvido com auxílio consciente de IA. Consulte o arquivo [AI_LOG.md](./AI_LOG.md) para o registro detalhado de cada uso, incluindo o prompt utilizado e a justificativa.

---

## Screenshots

> O app conta com Dark Mode. Alterne no botão 🌙 no header.

| Tela | Descrição |
|------|-----------|
| **Extrato** | Lista de transações agrupadas por data com filtros avançados |
| **Análise** | Gráfico de barras por categoria + Insights com avisos automáticos |
| **Dashboard** | 4 métricas executivas (maior receita, maior despesa, total, ticket médio) |

---

*Desenvolvido para o Hackathon PontoEnv 2026 — Controle financeiro pessoal*
