# Dashboard - Guia do Usuário

O **Dashboard** é a tela inicial do SGI após o login - uma visão geral do que importa naquele momento. O conteúdo é **diferente para cada cargo**.

---

## 1. Acessando o Dashboard

No menu lateral, clique em **"Dashboard"** (ou é a tela que abre automaticamente após login).

---

## 2. Dashboard do Administrador

<!-- TODO: screenshot do Dashboard Admin. Arquivo: images/dashboard-admin.png. Capturar: 3 stats cards + grid com projetos recentes e custos pendentes + quick actions -->
![Dashboard Admin](images/dashboard-admin.png){ .placeholder-image }

### Stats Cards (3 indicadores no topo)

| Card | O que mostra | Ação rápida |
|------|--------------|-------------|
| **Pending Approvals** | Projetos com status `pending` aguardando aprovação inicial | Clicar leva para lista filtrada |
| **Pending Costs** | Custos adicionados por funcionários aguardando aprovação do admin | Clicar leva para revisar |
| **Budget Alerts** | Projetos que atingiram o limite de alerta configurado (padrão 80% do orçamento) | Clicar leva para os projetos em alerta |

### Conteúdo principal (grid 2 colunas)

**Coluna 1: Recent Projects**

- Top 3 projetos mais recentes
- Card clicável com: nome, cliente, status, progresso
- Botão **"Ver todos"** leva para `/projects`

**Coluna 2: Pending Costs**

- Top 3 custos aguardando aprovação
- Card com: descrição, valor, quem registrou, projeto
- Botão **"Revisar todos"** leva para lista completa

### Quick Actions (4 botões de atalho)

| Botão | Leva para |
|-------|-----------|
| **All Projects** | `/projects` |
| **Manage Users** | `/users` |
| **Settings** | `/settings` |
| **Reports** | `/reports` (Analytics) |

---

## 3. Dashboard do Funcionário

<!-- TODO: screenshot do Dashboard Employee. Arquivo: images/dashboard-employee.png. Capturar: My Projects + Notifications + Profile cards -->
![Dashboard Employee](images/dashboard-employee.png){ .placeholder-image }

O funcionário vê **3 cards** focados no dia-a-dia dele:

### Card 1: My Projects

Lista **todos os projetos atribuídos** a você (`assignedUsers` contém seu UID).

- Cada projeto aparece como um card com: nome, cliente, status, progresso
- Click leva direto para o projeto
- Empty state: "All done! Nenhum projeto atribuído."

### Card 2: Notifications

Últimas **5 notificações** recebidas:

- Título e mensagem
- Badge de não lida (bolinha azul)
- Click na notificação marca como lida e leva para a página relacionada
- Link **"Ver todas"** → `/notifications`

📖 Veja o [Guia da Central de Notificações](notificacoes.md) para detalhes.

### Card 3: Profile

- Avatar + nome + cargo
- Botão **"Gerenciar Perfil"** → `/settings/profile`

---

## 4. Comportamento inteligente

### Stats cards clicáveis

Todos os 3 stats cards do admin (Pending Approvals, Pending Costs, Budget Alerts) são **clicáveis** e levam para listas **pré-filtradas** com os itens relevantes.

### Loading state

Se os dados estão carregando, o dashboard exibe **skeletons** animados (placeholders cinza) em vez de tela em branco.

### Empty states

Cada card tem seu empty state amigável:

- **Sem projetos pendentes:** "All caught up! Nenhum projeto aguardando aprovação."
- **Sem custos pendentes:** "Nothing to review."
- **Sem alertas de orçamento:** "All projects within budget."
- **Funcionário sem projetos:** "All done! Você não tem projetos atribuídos no momento."

---

## 5. Hover effects e microinterações

Os cards do dashboard têm:

- **Hover scale** - sobem ligeiramente ao passar o mouse
- **Shadow** aumenta no hover
- **Border color** muda para a cor primária
- **Gradient overlay** sutil em cards importantes

Tudo para dar sensação de interatividade e destacar o que é clicável.

---

## Regras Importantes

### Visibilidade por cargo

| Elemento | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Stats Cards (3 indicadores admin) | Sim | Sim | **Não** |
| Recent Projects (todos) | Sim | Sim | Não |
| Pending Costs | Sim | Sim | Não |
| Quick Actions admin | Sim | Sim | Não |
| My Projects (próprios) | Sim (todos) | Sim (todos) | Sim (só atribuídos) |
| Notifications | Sim | Sim | Sim |
| Profile card | Sim | Sim | Sim |

### O que cada stats card consulta

| Card | Query |
|------|-------|
| **Pending Approvals** | `projects` onde `status == 'pending'` |
| **Pending Costs** | `costs` (subcoleções) onde `status == 'pending_approval'` (agregado) |
| **Budget Alerts** | `projects` onde `isBudgetAlert == true` (campo calculado) |

!!! note "Stats são atualizadas em tempo real"
    Dashboard usa **Firestore Client SDK** (TanStack Query com listeners). Quando um custo é aprovado em outra tela, o dashboard reflete imediatamente.

### Limites

| Item | Limite |
|------|--------|
| Recent Projects exibidos | **3** (mais em `/projects`) |
| Pending Costs exibidos | **3** (mais em lista completa) |
| Notifications no card | **5** (mais em `/notifications`) |

### Defaults

| Configuração | Valor |
|---|---|
| Ordenação Recent Projects | `createdAt` DESC |
| Ordenação Pending Costs | `createdAt` DESC |
| Ordenação Notifications | `createdAt` DESC + não lidas no topo |
| Auto-refresh | Sim (via TanStack Query) |

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Ver visão geral do sistema | Dashboard |
| Ver projetos pendentes de aprovação (admin) | Card "Pending Approvals" |
| Revisar custos de funcionários (admin) | Card "Pending Costs" |
| Ver projetos com orçamento em alerta (admin) | Card "Budget Alerts" |
| Ir rapidamente para projetos/users/settings | Quick Actions (4 botões) |
| Ver seus próprios projetos (funcionário) | Card "My Projects" |
| Ver últimas notificações | Card "Notifications" |
