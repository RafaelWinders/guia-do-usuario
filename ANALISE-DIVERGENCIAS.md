# Análise de Divergências: Guia do Usuário vs Implementação Real SGI

**Data da Análise:** 2026-04-24
**Versão Atual do SGI:** v3.x (Work Order System)
**Escopo:** Comparação completa do guia (`docs/*.md`) contra código implementado em `apps/pwa/` e `packages/types/`

---

## 🎯 Sumário Executivo

O guia está **significativamente desatualizado**. Existem:

- **5 páginas/módulos NOVOS inteiros** não documentados no guia
- **Sistema de Escopo completamente reformulado** (Work Order v3.0 substituiu o scopeData antigo)
- **11 permissões granulares** na implementação (o guia fala em 6)
- **Novos recursos "secundários"** mas relevantes (backup Drive, PDFs no chat, etc.)
- **Menu lateral reorganizado** (13 itens para admin, não 7-8 como sugere o guia)
- **Timezone padrão mudou** (`America/New_York`, não `America/Sao_Paulo`)
- **4+ funcionalidades REMOVIDAS do app** (Service Types/Formulas) ainda aparecem implicitamente em partes do guia

**Recomendação:** Revisão estrutural do guia, não apenas atualização pontual. 4 dos 5 arquivos em PT (`chat.md`, `projetos.md`, `estoque.md`, `usuarios.md`, `diversos.md`) precisam de reescrita parcial + 2 novos arquivos.

---

## 📊 Matriz de Status por Guia

| Guia | Status | % Desatualizado | Prioridade |
|------|--------|-----------------|------------|
| `chat.md` / `chat-en.md` | 🟡 Médio | ~25% | ALTA |
| `projetos.md` / `projects.md` | 🔴 Crítico | ~40% | ALTA |
| `estoque.md` / `inventory.md` | 🟢 Pequeno | ~10% | BAIXA |
| `usuarios.md` / `users.md` | 🔴 Crítico | ~35% | ALTA |
| `diversos.md` / `miscellaneous.md` | 🟡 Médio | ~25% | MÉDIA |
| **Payments (NOVO)** | ⚫ Não existe | 100% missing | ALTA |
| **Reports/Analytics (NOVO)** | ⚫ Não existe | 100% missing | MÉDIA |
| **Dashboard (NOVO)** | ⚫ Não existe | 100% missing | MÉDIA |
| **Project Photos (NOVO)** | ⚫ Não existe | 100% missing | ALTA |

---

# 📋 PARTE 1 — O QUE REMOVER DO GUIA

## 1.1 Timezone fixo em "America/Sao_Paulo"

**Onde:** `diversos.md` / `miscellaneous.md` — Seção 16 (Idioma e Região)

**Texto atual do guia:**
> "Fuso Horario - Atualmente fixo em 'America/Sao_Paulo'"

**Código real** (`apps/pwa/app/[locale]/(app)/settings/page.tsx` linha 294):
```tsx
<Input value={orgSettings?.timezone || 'America/New_York'} disabled />
```

**Ação:** Corrigir para `America/New_York` (padrão) ou explicar que é configurável por organização (via `useOrganizationSettings`).

---

## 1.2 Contagem de permissões "6 permissões"

**Onde:** `usuarios.md` / `users.md` — Seções 6 (Aba Permissões) e 9 (Permissões em detalhe)

**Texto atual do guia:**
> "Mostra as 6 permissoes do usuario com toggles (ligado/desligado)"

**Realidade:** Existem **11 permissões** na interface `UserPermissions` (ver `packages/types/user.ts`):

| # | Permissão | Status no Guia |
|---|-----------|----------------|
| 1 | `canCreateProjects` | ✅ Documentada |
| 2 | `canEditProjects` | ✅ Documentada |
| 3 | `canDeleteProjects` | ✅ Documentada |
| 4 | `canAddCosts` | ✅ Documentada |
| 5 | `canApproveCosts` | ✅ Documentada |
| 6 | `canViewAllProjects` | ✅ Documentada |
| 7 | `canDeleteTasks` | ❌ Faltando |
| 8 | `canManageServiceTypes` | ⚠️ **LEGACY** — Service Types foram removidos (ver MEMORY.md), mas o campo ainda existe no tipo |
| 9 | `canCreateSchedules` | ❌ Faltando |
| 10 | `canViewProjectPhotos` | ❌ Faltando |
| 11 | `canEditProjectPhotos` | ❌ Faltando |

**Ação:** Reescrever a seção de permissões inteira. Documentar todas as 10 permissões ativas (excluir `canManageServiceTypes` — é legado de feature removida).

---

## 1.3 Kanban com 5 colunas de status

**Onde:** `projetos.md` — Seção 3 (Modos de visualização — Kanban) e Seção 12

**Texto atual do guia:**
> "Pendente, Em Andamento, Em Espera, Aguardando Informacao, Concluido"

**Código real** (`packages/types/project.ts`):
```typescript
export type ProjectStatus =
  | 'pending'       // Pendente
  | 'active'        // Ativo (NÃO "in_progress" nem "Em Andamento")
  | 'on_hold'       // Em Espera
  | 'awaiting_input' // Aguardando Informação
  | 'completed'     // Concluído
```

**Ação:** Os nomes ESTÃO corretos na tradução, mas verificar se a coluna "Em Andamento" é exibida para o status `active`. Há também o campo `scopeStatus` (substatus) com valores `none`, `collecting`, `ready_for_review`, `approved` — não mencionado no guia.

---

## 1.4 Estrutura de Escopo "Simples" (scopeData)

**Onde:** `chat.md` Seção 9 (As 16 categorias), Seção 10 (Status do escopo); `projetos.md` Seção 9 (Aba Escopo)

**Texto atual do guia:**
O guia fala em "aba Escopo" que exibe serviços genéricos baseados em `ProjectScopeData` (location, services, additionalInfo). Mostra status: Rascunho/Pronto para Revisão/Aprovado.

**Realidade:** Existe **Work Order v3.0** (`packages/types/workOrder.ts`) — sistema profissional completo que SUBSTITUI o `scopeData`. O guia documenta as 16 categorias corretamente (FRM, ELE, INS, DRY, MUD, FNC, PNT, FCW, TIL, PLM, DTL, GLS, CLN, TCH, CON, DMO), mas trata-as como "organização de serviços", quando na verdade são parte de uma **Work Order formal** com:

- **Header** com workOrderNumber (WO0001-14547), jobNumber, jobName, projectManager, workOrderDate
- **Customer**: name, address, phone, email
- **JobAddress**: street, city, state, zip
- **Categories** com items detalhados (task, action, type, quantity, unit, room, notes, unitPrice, totalPrice)
- **Status**: `draft` / `ready_for_review` / `approved` / `in_progress` / `completed`
- **PDF export**, import de PDFs externos, aprovação formal

**Campo `scopeData` está marcado como DEPRECATED** no código:
```typescript
scopeData?: ProjectScopeData // (DEPRECATED - usar workOrderData)
```

**Ação:** Reescrever Seção 11 do `chat.md` ("Como o escopo aparece no projeto") e Seção 9 do `projetos.md` (aba Escopo) para refletir o sistema Work Order. Adicionar explicação de:
- Estrutura formal de WO
- Import de PDF (via `WorkOrderImportDialog`)
- Download de PDF da WO
- Aprovação da WO
- Números de WO e Job

---

## 1.5 Menção a WhatsApp como "Fase de Testes"

**Onde:** `chat.md` Seção 1 ("Fase de testes: Atualmente o Chat funciona pelo App (PWA)")

**Realidade atual:** WhatsApp existe como **channel de notificação** no tipo (`NotificationChannel = 'inApp' | 'email' | 'push' | 'whatsapp'`), mas na UI o comentário é:
```tsx
// WhatsApp não mostrar ainda
```
Só aparecem 3 canais na tela: inApp, email, push.

**Ação:** Manter a menção à "fase de testes" para o CHAT, mas mencionar que WhatsApp **ainda não está disponível** como canal na UI de preferências (apenas no tipo). Remover a promessa específica de "vai funcionar pelo WhatsApp com a mesma lógica" se não houver roadmap confirmado.

---

## 1.6 "Apenas administradores podem criar custo aprovado automaticamente"

**Onde:** `projetos.md` Seção 9 (Aba Custos)

**Texto atual:**
> "Quando um administrador adiciona um custo, ele é aprovado automaticamente"

**Realidade:** Isso está correto no código, mas o guia **não menciona** a nova opção `canApproveCosts` que dá a Employees o poder de aprovar custos individualmente (permissão granular). Ou seja, **funcionários com `canApproveCosts=true`** também podem aprovar.

**Ação:** Esclarecer que a aprovação automática não depende apenas do cargo, mas da permissão `canApproveCosts`.

---

## 1.7 "Usuários podem convidar apenas seu nível abaixo"

**Onde:** `usuarios.md` Seção 3 (Hierarquia de cargos)

**Texto atual:**
> "Administrador: Pode convidar apenas Funcionarios"

**Realidade no código:** Ver `permissions-matrix.ts` / guards no backend — confirmar se a hierarquia continua essa. Se não houver confirmação no código atual, manter como está.

**Ação:** Validar no código se existe guard explícito. Se sim, manter. Se não, rever texto.

---

# 📥 PARTE 2 — O QUE ADICIONAR AO GUIA (FUNCIONALIDADES NOVAS)

## 2.1 🆕 NOVO ARQUIVO: `pagamentos.md` / `payments.md`

**Prioridade:** ALTA — módulo completo invisível no guia atual.

**Conteúdo necessário** (baseado em `packages/types/payment.ts` e `app/[locale]/(app)/payments/page.tsx`):

### Estrutura do módulo Payments

O SGI tem uma **Central de Pagamentos** (`/payments` no menu lateral, Admin only) para controle semanal/mensal de desembolsos em folha/subcontratados/fornecedores.

**Entidades:**
1. **Payment Categories** — Grupos para organizar payees (ex: "Subcontratados", "Funcionários", "Fornecedores")
   - Cada categoria tem nome, cor (emerald, amber, blue, etc.) e ordem
   - CRUD via `ManageCategoriesDialog`

2. **Payment Payees** — Beneficiários (pessoas/empresas que recebem)
   - Campos: `name` (curto, ex: "Nathan"), `fullName` (completo), `categoryId`, `paymentMethod`, `companyName`
   - Métodos: **Zelle / Check / Cash / Company Check**
   - CRUD via `ManagePayeesDialog`

3. **Payment Sheets** — Planilhas MENSAIS (id no formato "YYYY-MM", ex: "2025-12")
   - Cada sheet tem `weekEndings` (datas de fim de semana, 4-5 por mês)
   - Status: `open` / `closed`
   - Totais pré-calculados por categoria + grand total
   - Gerenciamento via `CreateSheetDialog` e `ManageWeeksDialog`

4. **Payment Entries** — Uma entry por payee por sheet
   - `weeklyAmounts`: Record<string, number> (chave é data de fim de semana)
   - `monthTotal` pré-calculado
   - Método de pagamento denormalizado

### Fluxo de uso

1. Admin clica em "Payments" no menu lateral
2. Cria/seleciona sheet do mês (ex: Janeiro 2026)
3. Define semanas do mês (4-5 semanas com datas de fim)
4. Adiciona payees à sheet (categorias já configuradas)
5. Preenche valores por semana via `PaymentAmountCell`
6. Sheet pode ser "fechada" quando mês acaba (toggle lock/unlock)
7. Entries podem ser removidas, valores editados inline

### Screenshots necessários
- ⚠️ **payments-main.png** — Página principal com seletor de sheet
- ⚠️ **payments-sheet-view.png** — Planilha com categorias colapsáveis e grid semanal
- ⚠️ **payments-categories-dialog.png** — Manage Categories
- ⚠️ **payments-payees-dialog.png** — Manage Payees
- ⚠️ **payments-create-sheet.png** — Criar nova sheet mensal
- ⚠️ **payments-manage-weeks.png** — Gerenciar semanas do mês

---

## 2.2 🆕 NOVO ARQUIVO: `dashboard.md`

**Prioridade:** MÉDIA

**Conteúdo necessário** (baseado em `app/[locale]/(app)/dashboard/page.tsx`):

### Dashboard Administrador
- 3 stats cards:
  - Pending approvals (projetos pending)
  - Pending costs (custos aguardando aprovação)
  - Budget alerts (projetos com threshold atingido)
- Grid 2 colunas:
  - Recent projects (top 3)
  - Pending costs (top 3)
- 4 Quick Actions: All projects / Manage users / Settings / Reports

### Dashboard Funcionário
- Card "My Projects" — todos os projetos atribuídos
- Card "Notifications" — últimas 5, com link para /notifications
- Card "Profile" — botão "Manage Profile"

### Screenshots necessários
- ⚠️ **dashboard-admin.png**
- ⚠️ **dashboard-employee.png**

---

## 2.3 🆕 NOVO ARQUIVO OU SEÇÃO: `relatorios-analytics.md` / `reports-analytics.md`

**Prioridade:** MÉDIA

**Conteúdo necessário** (baseado em `app/[locale]/(app)/reports/page.tsx`):

> ⚠️ **Atenção:** Não confundir com "Relatórios Diários" (daily-reports) — este é um módulo DIFERENTE no menu, focado em **Analytics** do portfólio de projetos. Guia atual mistura os dois.

### O módulo Reports (Analytics)
- Acesso: `/reports` no menu, Admin only
- 4 Stats Cards:
  - Total de projetos
  - Budget utilization %
  - Completion rate %
  - Over budget count
- Budget Analysis Card (total orçado, gasto, saldo, progress bar)
- Projects by Status Card (breakdown com percentuais)
- Export Options: PDF / Excel / CSV (botões presentes, funcionalidade pode estar parcial)

### Screenshots necessários
- ⚠️ **reports-analytics-main.png**
- ⚠️ **reports-analytics-export.png**

---

## 2.4 🆕 SEÇÃO NOVA EM `projetos.md`: "Aba Photos"

**Prioridade:** ALTA — aba nova e importante.

**Conteúdo necessário** (baseado em `components/features/project-photos/` e `packages/types/projectPhoto.ts`):

### Aba Photos (condicional)

A aba **Photos** só aparece para usuários com permissão `canViewProjectPhotos`. Quem tem `canEditProjectPhotos` pode também upload/edit/delete.

**Componentes:**
- `PhotosTab` — container principal
- `PhotosUploadButton` — upload múltiplo com progress
- `PhotoGrid` — grid responsivo de miniaturas
- `PhotoThumbnail` — miniatura individual
- `PhotoViewerDialog` — modal fullscreen com comentários

**Dados da foto:**
- Upload para Firebase Storage (ou Google Drive se backup ativo)
- `originalFilename`, `mimeType`, `size`, `width`, `height`
- `description`, `tags[]`
- `takenAt` (quando foto foi tirada) vs `uploadedAt`
- `uploadedBy`/`uploadedByName`

**Sub-feature: Comentários por foto** (`photoId/comments/{commentId}`):
- Usuários podem comentar fotos
- Comentários aparecem no PhotoViewerDialog

### Screenshots necessários
- ⚠️ **project-photos-tab.png** — Aba Photos com grid
- ⚠️ **project-photos-viewer.png** — Dialog fullscreen com comentários
- ⚠️ **project-photos-upload.png** — Upload modal

---

## 2.5 🆕 SEÇÃO NOVA EM `chat.md`: "Upload de PDF"

**Prioridade:** ALTA

**Realidade:** O `ChatInputBar` aceita PDFs (botão FileText no desktop, item no menu mobile) com limite de 10MB. Usado principalmente para **importar Work Orders externas** (converter PDF de WO de outros sistemas).

**Código:** `ChatInputBar.tsx` linhas 157-176 (handlePdfSelected), 374-385 (input[type=file] hidden), 477-486 (menu mobile), 539-549 (desktop button).

**Ação:** Adicionar na Seção 19 ("Tipos de entrada aceitos"):

| Tipo | Formatos | Uso principal |
|------|----------|---------------|
| **PDF** | PDF (max 10MB) | **Importar Work Orders de outros sistemas** — a IA lê o PDF e gera Work Order estruturada no SGI |

E adicionar nova seção após a seção 8 (vídeo): "Importando Work Order de PDF externo".

---

## 2.6 🆕 SEÇÃO NOVA EM `projetos.md`: "Backup no Google Drive (Superadmin)"

**Prioridade:** BAIXA (feature superadmin-only)

**Conteúdo** (baseado em `components/features/projects/ProjectBackupStatus.tsx` e `packages/types/project.ts` campos `drive*`):

### Backup automático no Google Drive

Quando um superadmin conecta a conta Google (Settings > Integrations), projetos sincronizam automaticamente com o Drive.

**Campos do projeto:**
- `driveSyncStatus`: `pending` / `syncing` / `synced` / `failed` / `null`
- `driveSyncedAt` — timestamp do último sync bem-sucedido
- `driveSyncError` — mensagem de erro
- `driveFolderUrl` — link direto para a pasta no Drive
- `driveFolderId` — ID da pasta (usado para renomear quando projeto muda de nome)

**Visível onde:** Aba Overview do projeto, componente `ProjectBackupStatus` renderizado apenas para superadmin.

### Screenshot necessário
- ⚠️ **project-backup-status.png** — Card de Backup Status na aba Overview

---

## 2.7 🆕 SEÇÃO NOVA EM `diversos.md` (Configurações): "Configurações de Organização"

**Prioridade:** BAIXA

**Realidade:** Existe hook `useOrganizationSettings` que controla settings globais (timezone, etc.) separados dos settings do usuário.

**Onde documentar:** Mencionar em "16. Idioma e Região" que o timezone é **per-organização**, não per-usuário.

---

## 2.8 🆕 NOVO ARQUIVO OU SEÇÃO: `central-de-notificacoes.md`

**Prioridade:** MÉDIA

**Conteúdo necessário** (baseado em `app/[locale]/(app)/notifications/page.tsx`):

### Central de Notificações

Separada das preferências em Settings, existe uma página `/notifications` com todas as notificações recebidas.

**Funcionalidades:**
- **Filtros por status**: all / unread / read
- **Filtros por tipo** (12 tipos):
  - project_assigned, project_unassigned, project_status_changed
  - budget_alert, budget_exceeded
  - schedule_created, schedule_updated, schedule_cancelled, schedule_reminder
  - low_stock_alert
  - scope_ready_for_review
  - emergency
- **Batch operations**: selecionar múltiplas, marcar como lidas, deletar
- **Mark all as read** (se há não lidas)
- **Click em notificação** → marca como lida + navega via `actionUrl`
- Stats: unread count badge, total count, filtro ativo

### Screenshot necessário
- ⚠️ **notifications-center.png**

---

## 2.9 🆕 SEÇÃO NOVA EM `usuarios.md`: "Grupos de Clientes"

**Prioridade:** MÉDIA — feature nova no menu.

**Realidade:**
- Menu lateral: link direto "Client Groups" (`/settings/clients`) para admins
- Tipo `ClientGroup`: `groupId`, `groupName`, `description`
- CRUD via `clientGroupDialog.tsx` + `clientGroupDeleteDialog.tsx`
- Uso: filtro em `Projects` (filtrar por grupo de cliente)
- **Memória do projeto confirma: "Client Groups KEPT for project organization"** (service types foram removidos mas client groups continuam)

**Onde documentar:** Criar seção separada OU mover `usuarios.md` → `equipe.md` e dividir:
- Parte 1: Usuários e Permissões
- Parte 2: Skills
- Parte 3: Grupos de Clientes

### Screenshot necessário
- ⚠️ **client-groups-list.png**
- ⚠️ **client-groups-dialog.png**

---

## 2.10 🆕 NOTAS MENORES para adicionar

### Em `chat.md` / `chat-en.md`

**Atualmente faltando ou desatualizado:**

1. **Menu de anexos mobile** (Popover estilo WhatsApp) — diferente do desktop. Guia só descreve desktop.
2. **PDF como entrada** (já citado acima).
3. **Gravação de vídeo IN-APP** — tem `VideoRecorder` com maxDuration 30s (não apenas upload).
4. **Gravação de áudio IN-APP** — tem `AudioRecorder` com waveform.
5. **Contador de caracteres** (aparece quando >80% do limite 2000).
6. **Auto-resize da textarea** (cresce até 5 linhas, depois scroll).
7. **Botão "+" mobile** (único ponto de entrada de anexos no mobile).

### Em `projetos.md`

**Atualmente faltando:**

1. **Infinite Scroll** em projetos (20 por página, carrega automaticamente).
2. **Keyboard Shortcuts Modal** (aparece no Kanban — mostra atalhos).
3. **View Mode Persistence** (preferência grid/list/kanban é salva por usuário).
4. **Work Order Import** — botão no header para importar WO de PDF externo.
5. **StatusReasonModal** — quando muda status para on_hold/awaiting_input, pede motivo.

### Em `diversos.md` (Agendamentos)

**Atualmente faltando:**

1. **Two-Way Sync com Google Calendar** — eventos criados no Google aparecem no SGI (campos `isExternalEvent`, `eventHash`, `syncSource`). Guia só fala de one-way (SGI → Google).
2. **Status `googleSyncStatus`** no Schedule (`pending`, `syncing`, `synced`, `failed`) e mensagem de erro.
3. **View Mode Persistence** (lista/calendário por usuário).
4. **Permissão `canCreateSchedules`** — funcionários com esta permissão podem criar agendamentos (antes era admin-only).

### Em `usuarios.md`

**Atualmente faltando:**

1. **Skills são agrupadas por categoria** no `/skills` (campo `category` opcional no tipo Skill).
2. **Skills têm toggle ativo/inativo** (`isActive`) — soft delete, não só "excluir".
3. **Skills têm cor** customizável (`color` hex).
4. **Stats de usuário** (UserStats: totalProjects, activeProjects, completedProjects, totalCostsAdded, pendingCosts, approvedCosts) são **calculados por triggers** — não explicado no guia.

### Em `estoque.md`

**Muito pouco faltando** — o módulo Inventory está quase 100% estável e bem documentado.

1. **Reversão de retirada** — se uma allocação a projeto foi errada, admin pode reverter (`RevertWithdrawalInput` + transação compensatória). Guia não menciona.
2. **Campos de reversão** no histórico (`isReversal`, `reversedAt`, `reversedBy`, `originalTransactionId`, `reversalReason`).
3. **Busca multi-palavra** (suporta partial matches), não só exata.

---

# 🖼️ PARTE 3 — SCREENSHOTS (IMAGENS)

## 3.1 Screenshots que devem ser REFEITOS (UI mudou significativamente)

| Arquivo Atual | Motivo para refazer | Prioridade |
|---------------|---------------------|------------|
| `project-detail-scope.png` | Agora é Work Order UI (totalmente diferente) | ALTA |
| `project-detail-overview.png` | Adicionar Backup Status card (superadmin) | MÉDIA |
| `project-detail-team.png` | Verificar se mudou (provavelmente não) | BAIXA |
| `projects-list-grid.png` | Verificar se menu lateral tem novos itens visíveis | BAIXA |
| `projects-list-view.png` | Verificar se menu lateral tem novos itens visíveis | BAIXA |
| `projects-kanban.png` | Verificar se menu lateral tem novos itens visíveis | BAIXA |
| `chat-main.png` | Verificar mensagem inicial da IA (listar capacidades atuais) | MÉDIA |
| `chat-attachments.png` | Adicionar botão PDF (antes não existia) | ALTA |
| `settings-profile.png` | Layout mudou (Desktop=Tabs / Mobile=Cards) | MÉDIA |
| `settings-security.png` | Verificar | BAIXA |
| `settings-notifications.png` | Conferir se lista atual de categorias bate (projects, budget, schedules, inventory, scope) | MÉDIA |
| `settings-appearance.png` | Conferir | BAIXA |
| `settings-language.png` | Timezone agora é America/New_York por padrão | MÉDIA |
| `settings-integrations.png` | Aba **só aparece para superadmin** — atualizar texto | MÉDIA |
| `users-detail-permissions.png` | AGORA mostra 10 permissões, não 6 | **CRÍTICA** |
| `users-edit-dialog.png` | Aba Permissões com 10 itens | **CRÍTICA** |
| `skills-list.png` | Agrupamento por categoria + toggle ativar/desativar | ALTA |
| `skills-new-dialog.png` | Adicionar campo `category` + escolha de cor hex | MÉDIA |

## 3.2 Screenshots NOVOS necessários

| Arquivo | O que capturar | Prioridade |
|---------|----------------|------------|
| `sidebar-admin.png` | Menu lateral ADMIN completo (13 itens) | ALTA |
| `sidebar-employee.png` | Menu lateral EMPLOYEE (4 itens) | ALTA |
| `dashboard-admin.png` | Dashboard admin com stats + quick actions | ALTA |
| `dashboard-employee.png` | Dashboard employee | MÉDIA |
| `payments-main.png` | `/payments` - header + seletor de sheet | ALTA |
| `payments-sheet-view.png` | PaymentSheetView com entries + categorias | ALTA |
| `payments-create-sheet.png` | CreateSheetDialog | MÉDIA |
| `payments-categories-dialog.png` | ManageCategoriesDialog | MÉDIA |
| `payments-payees-dialog.png` | ManagePayeesDialog | MÉDIA |
| `payments-manage-weeks.png` | ManageWeeksDialog | BAIXA |
| `payments-add-payees.png` | AddPayeesToSheetDialog | BAIXA |
| `reports-analytics-main.png` | `/reports` (Analytics) completo | MÉDIA |
| `work-order-view.png` | WorkOrderView completo (categorias, items, header) | **CRÍTICA** |
| `work-order-header.png` | WorkOrderHeader com customer/job address | ALTA |
| `work-order-category.png` | Categoria expandida com items | ALTA |
| `work-order-import-dialog.png` | WorkOrderImportDialog (upload PDF) | ALTA |
| `work-order-import-preview.png` | WorkOrderImportPreview (revisar antes de confirmar) | ALTA |
| `work-order-edit-item.png` | WorkOrderEditItemDialog | MÉDIA |
| `project-photos-tab.png` | Aba Photos com PhotoGrid | ALTA |
| `project-photos-viewer.png` | PhotoViewerDialog com comentários | ALTA |
| `project-photos-upload.png` | PhotosUploadButton em uso | MÉDIA |
| `project-backup-status.png` | ProjectBackupStatus card (superadmin) | BAIXA |
| `notifications-center.png` | `/notifications` com filtros | MÉDIA |
| `notifications-filters.png` | Dropdown de filtros | BAIXA |
| `client-groups-list.png` | `/settings/clients` | MÉDIA |
| `client-groups-dialog.png` | clientGroupDialog (criar/editar) | MÉDIA |
| `chat-mobile-menu.png` | Menu de anexos mobile (Popover estilo WhatsApp) | MÉDIA |
| `chat-audio-recorder.png` | AudioRecorder dialog com waveform | MÉDIA |
| `chat-video-recorder.png` | VideoRecorder dialog | MÉDIA |
| `chat-pdf-upload.png` | Chat com PDF anexado (antes de enviar) | ALTA |
| `status-reason-modal.png` | StatusReasonModal (ao mudar status para on_hold) | BAIXA |
| `keyboard-shortcuts-modal.png` | KeyboardShortcutsModal (no Kanban) | BAIXA |
| `push-permission-modal.png` | PushPermissionModal (solicitação de permissão push) | BAIXA |

---

# 🏁 PARTE 4 — PLANO DE AÇÃO RECOMENDADO

## Sprint 1 — Críticos (Bloqueadores)

1. ✅ Atualizar seção de **Permissões** em `usuarios.md` (6 → 10 permissões)
2. ✅ Reescrever seção de **Escopo** em `projetos.md` para Work Order v3.0
3. ✅ Reescrever seção de **Escopo** em `chat.md` para Work Order v3.0
4. ✅ Criar arquivo **`pagamentos.md`** do zero
5. ✅ Adicionar seção **Photos** em `projetos.md`
6. ✅ Tirar screenshots **CRÍTICAS** da lista acima (users-detail-permissions, work-order-*, etc.)

## Sprint 2 — Alta prioridade

1. Criar arquivo **`dashboard.md`**
2. Adicionar seção **PDF upload** em `chat.md`
3. Atualizar **chat-attachments.png** (incluir botão PDF)
4. Atualizar **`mkdocs.yml`** para incluir novos arquivos na navegação
5. Criar **`relatorios-analytics.md`** (separar de daily-reports)
6. Tirar screenshots de alta prioridade da lista acima
7. Atualizar seção **Skills** em `usuarios.md` (categoria, toggle, cor)

## Sprint 3 — Média prioridade

1. Adicionar seção **Client Groups** em `usuarios.md` (ou dividir em equipe.md)
2. Adicionar seção **Central de Notificações** (novo arquivo ou integrar em diversos.md)
3. Atualizar **diversos.md** com two-way sync Google Calendar
4. Corrigir **timezone** de Sao_Paulo → New_York em diversos.md
5. Refazer screenshots médias da lista

## Sprint 4 — Baixa prioridade / Cleanup

1. Adicionar menção a **Backup Google Drive** em projetos.md (superadmin)
2. Documentar **reversão de retirada** em estoque.md
3. Documentar **StatusReasonModal** em projetos.md
4. Documentar **WhatsApp como futuro canal** (atualmente desabilitado)
5. Refazer screenshots restantes

---

# 📎 APÊNDICE A — Mapeamento Menu Lateral Real

## Admin/Superadmin (13 itens)

```
1.  Dashboard              → /dashboard
2.  Projects               → /projects
3.  Scheduling             → /scheduling
4.  Daily Reports          → /daily-reports      (relatórios diários de campo)
5.  Reports                → /reports            (analytics — NOVO)
6.  Payments               → /payments           (NOVO)
7.  Inventory              → /inventory
8.  Chat                   → /chat
9.  Client Groups          → /settings/clients   (NOVO no menu)
10. Skills                 → /settings/skills
11. Users                  → /users
12. Emergency              → /admin/emergency
13. Settings               → /settings
```

## Employee (4 itens)

```
1. Dashboard     → /dashboard
2. Scheduling    → /scheduling
3. Chat          → /chat
4. Profile       → /settings/profile
```

**Observação:** `/profile` existe separado de `/settings/profile`, mas o menu aponta para `/settings/profile`.

---

# 📎 APÊNDICE B — Arquivos-fonte consultados

- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\guia-do-usuario\docs\*.md` (5 PT + 5 EN)
- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\guia-do-usuario\docs\images\*` (44 imagens)
- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\SGI\apps\pwa\app\[locale]\(app)\*\page.tsx` (~14 rotas)
- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\SGI\packages\types\*.ts` (15+ tipos)
- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\SGI\apps\pwa\components\features\*` (70+ componentes)
- `C:\Users\rafae\OneDrive\Documentos\Dev\SGI\SGI\apps\pwa\components\layout\Sidebar.tsx`

---

# 📚 PARTE 5 — COBERTURA DE TUTORIAIS E REGRAS DE NEGÓCIO

Esta seção responde especificamente: **"O guia tem tutoriais de como usar? Documenta as regras que precisam ser cumpridas?"**

## 5.1 Tutoriais — O que EXISTE no guia atual

| Módulo | Tutorial passo-a-passo | Qualidade | Observações |
|--------|------------------------|-----------|-------------|
| **Chat** | ✅ Excelente | Alta | 7+ exemplos de conversa (texto, foto, áudio, vídeo, nota fiscal, custo, agendamento, escopo) |
| **Projetos** | ✅ Bom | Média | Tem "exemplo passo a passo" para criar projeto, mas faltam fluxos avançados (aprovação de WO, mudança de status) |
| **Estoque** | ✅ Excelente | Alta | Tutorial de criar item + explicação completa do preço médio ponderado com exemplos numéricos |
| **Usuários** | ✅ Bom | Média | Tutorial de convite, mas faltam tutoriais de mudança de permissões granulares |
| **Agendamentos** | ⚠️ Básico | Baixa | Apenas campos e exemplo simples — faltam fluxos de sync Google, conflito de horário |
| **Relatórios Diários** | ⚠️ Muito básico | Baixa | Só diz "são criados via chat" — não detalha o fluxo end-to-end |
| **Configurações** | ✅ Bom | Média | Tem tutorial de cada aba |
| **Emergência** | ✅ Bom | Média | Tutorial OK, mas falta info sobre rate limit (5/min) |

## 5.2 Tutoriais — O que está FALTANDO (MÓDULOS NOVOS)

❌ **Payments** — Tutorial de 0% (módulo inteiro não documentado)
- Como criar uma sheet mensal
- Como configurar categorias e payees
- Como preencher valores semanais
- Como fechar sheet do mês
- Quando reabrir uma sheet fechada

❌ **Reports/Analytics** — Tutorial de 0%
- Como interpretar os 4 stats cards
- Como fazer export PDF/Excel/CSV
- O que significa "Budget Utilization"
- Como usar para tomar decisão

❌ **Dashboard** — Tutorial de 0%
- Diferença entre dashboard admin e employee
- Para que serve cada card
- Quick Actions (o que cada botão faz)

❌ **Project Photos** — Tutorial de 0%
- Como fazer upload (drag-and-drop, batch)
- Como adicionar tags e descrição
- Como usar comentários em fotos
- Quais permissões precisa ter

❌ **Work Order (NOVO sistema de Escopo)** — Tutorial de 0% para o sistema novo
- Como importar WO de PDF externo
- Como navegar pelas 16 categorias
- Como editar items em draft
- Fluxo de aprovação (draft → ready_for_review → approved)
- Como exportar PDF da WO

❌ **Central de Notificações** — Tutorial de 0%
- Como usar filtros (status, tipo)
- Como fazer batch operations (marcar múltiplas como lidas)
- Deep links (action URLs)

❌ **Client Groups** — Tutorial de 0%
- Como criar/gerenciar grupos
- Como associar clientes a grupos
- Como filtrar projetos por grupo

---

## 5.3 Regras de Negócio — Status de documentação

### ✅ Regras BEM DOCUMENTADAS no guia atual

| Regra | Onde está | Observação |
|-------|-----------|------------|
| Orçamento: Limite de Alerta padrão 80% | `projetos.md` §8 | Correto |
| Estoque: Não pode deletar com qty > 0 | `estoque.md` §3, §11 | Correto |
| Preço Médio Ponderado | `estoque.md` §7 | Excelente, com exemplos |
| Custo admin = aprovado, funcionário = pendente | `projetos.md` §9 | Correto (mas falta `canApproveCosts`) |
| Convite expira em 7 dias | `usuarios.md` §4 | Correto |
| Cores da barra de orçamento (verde/laranja/vermelho) | `projetos.md` §8 | Correto |
| Escopo gerado pelo Chat | `projetos.md` §9, `chat.md` §4+ | Correto (mas para sistema antigo) |
| Super admin > Admin > Funcionário hierarchy | `usuarios.md` §3 | Correto |
| Emergência ignora preferências | `diversos.md` §14, §18 | Correto |

### 🔴 Regras DOCUMENTADAS ERRADAS (contradizem o código)

| Regra | Guia diz | Código diz | Gravidade |
|-------|----------|------------|-----------|
| **Senha mínima** | 8 caracteres (`diversos.md` §13) | **6 caracteres** (`userSchemas.ts:72`) | 🔴 CRÍTICO |
| **Timezone padrão** | `America/Sao_Paulo` (`diversos.md` §16) | **`America/New_York`** (`settings/page.tsx:294`) | 🟡 MÉDIO |
| **Permissões totais** | 6 permissões (`usuarios.md` §6, §9) | **10 permissões ativas** (user.ts) | 🔴 CRÍTICO |
| **Canais de notificação** | 3 canais: App, Email, Push (`diversos.md` §14) | **4 canais** (whatsapp existe no tipo, desabilitado na UI) | 🟡 MÉDIO |

### ❌ Regras NÃO DOCUMENTADAS mas críticas para o usuário

#### Projetos
- ❌ **`statusReason` é OBRIGATÓRIO** ao mudar para `on_hold` ou `awaiting_input` (máx 500 chars)
- ❌ **Apenas admin/superadmin pode mudar status** de projeto
- ❌ Limites de campos: nome (3-100 chars), endereço (mín 5 chars), cliente (3+ chars)
- ❌ **Exclusão NÃO bloqueia** mesmo se projeto tem daily reports/schedules (pode gerar dados órfãos)
- ❌ **Clientes (clientGroupId)** — se deletar grupo, projetos ficam com referência inválida?

#### Estoque
- ❌ **Dois modos de entrada são EXCLUSIVOS** — deve ser totalValue **XOR** unitValue, nunca ambos (o guia fala dos dois mas não deixa claro que é um OU outro)
- ❌ Limites de campos: name (2-100), unit (1-20), category (máx 50), description (máx 500)
- ❌ **Reversão de retirada** existe mas não está documentada

#### Agendamentos
- ❌ **Sistema valida conflito de horário** e bloqueia com erro `Funcionário não disponível`
- ❌ **Data no passado é PERMITIDA** (pode gerar confusão para usuários)
- ❌ **Duração mínima: 1 minuto** (sem limite máximo)
- ❌ **Sem Google Calendar, o agendamento ainda é criado** (graceful fallback) — usuário pode achar que precisa de Google
- ❌ **Employee precisa de `canCreateSchedules`** para criar agendamentos

#### Custos
- ❌ **Criador pode editar seu próprio custo** enquanto estiver `pending_approval`
- ❌ **Admin pode editar qualquer custo** a qualquer momento
- ❌ **Rejeição exige motivo** (`rejectionReason` obrigatório)
- ❌ **Sem limite de valor** — permite R$ 0,01 ou R$ 1.000.000,00
- ❌ **Custo de estoque é criado automaticamente** e tem campos especiais (`inventoryQuantity`, `inventoryItemName`, etc.)

#### Usuários
- ❌ **Não pode desativar ÚLTIMO admin/superadmin** ativo do sistema
- ❌ **Apenas superadmin pode mudar role para admin/superadmin**
- ❌ **Senha não tem requisitos de complexidade** (sem maiúscula, número, símbolo obrigatório)
- ❌ **Reativação de usuário** existe (isActive: false → true) mas não está documentada
- ❌ **Skills não podem ser "de verdade" excluídas** — são soft-delete (isActive: false)
- ❌ **Email NÃO pode ser alterado** depois da criação (falado no guia mas sem razão explicada)

#### Daily Reports
- ❌ **Só podem ser criados via Chat** — não há botão "Criar Relatório" (guia já menciona, mas não enfatiza)
- ❌ **Não podem ser editados depois de `submitted`** — employee não pode corrigir
- ❌ **Apenas admin pode marcar como `reviewed`**

#### Work Orders
- ❌ **Apenas em `draft` permite edição de items** — após `ready_for_review` fica read-only
- ❌ **Employees não veem preços** (`unitPrice`, `totalPrice` filtrados por role)
- ❌ **PDF import: tamanho máx 50MB**
- ❌ **Status transitions**: draft → ready_for_review → approved → in_progress → completed

#### Project Photos
- ❌ **Tamanho máximo: 50MB por foto**
- ❌ **Tipos aceitos: qualquer `image/*`** (inclui HEIC, WebP, etc.)
- ❌ **Cascade delete**: ao deletar projeto, fotos e comentários vão junto
- ❌ **Quem pode deletar**: uploader (dona) + admin
- ❌ **Description máx 2000 chars, tags máx 50 (50 chars cada)**

#### Notificações
- ❌ **TTL automático: 30 dias** (notificações antigas somem automaticamente)
- ❌ **Push requer permissão do browser** (já documentado mas precisa reforço)

#### Chat/AI
- ❌ **Limite de mensagem: 2000 caracteres**
- ❌ **Sessão de chat expira** — 7 dias para service_catalog, 1 dia para outros flows
- ❌ **Compactação automática** de mensagens antigas (guia menciona mas superficialmente)

#### Emergency Notifications
- ❌ **Rate limit: 5 requisições por minuto** por admin
- ❌ **Máximo 100 destinatários** por notificação
- ❌ **Log de auditoria** é mantido (quem enviou, quantos receberam, quando)

#### Payments
- ❌ **ID da sheet é único por mês** (YYYY-MM) — não pode criar duas sheets do mesmo mês
- ❌ **Sheet `closed` não permite editar entries**
- ❌ **Payment methods por payee: apenas 1** (zelle XOR check XOR cash XOR company_check)

---

## 5.4 Matriz de Cobertura — Tutorial vs Regras

| Módulo | Tutorial | Regras Documentadas | Regras Faltando | Prioridade |
|--------|----------|---------------------|-----------------|------------|
| Chat | 90% | 50% | 50% (limits, session TTL, PDF) | MÉDIA |
| Projetos | 70% | 40% | 60% (statusReason, role permissions, WO) | **ALTA** |
| Estoque | 90% | 80% | 20% (modos XOR, reversão) | BAIXA |
| Usuários | 60% | 40% | 60% (10 perms, senha 6 chars, last admin) | **ALTA** |
| Agendamentos | 50% | 30% | 70% (conflitos, Google opt, canCreateSchedules) | **ALTA** |
| Daily Reports | 20% | 20% | 80% (fluxo completo) | MÉDIA |
| Work Order | **0%** (sistema novo) | 0% | 100% | **CRÍTICA** |
| Payments | **0%** | 0% | 100% | **ALTA** |
| Reports/Analytics | **0%** | 0% | 100% | MÉDIA |
| Project Photos | **0%** | 0% | 100% | **ALTA** |
| Notificações | 40% | 50% | 50% (TTL 30d, 4 canais) | MÉDIA |
| Emergency | 60% | 60% | 40% (rate limit, max 100 users) | BAIXA |

---

## 5.5 RESPOSTA DIRETA À PERGUNTA

**"Tem tutoriais de como usar as coisas?"**
- ✅ **SIM, para módulos antigos** (Chat, Projetos, Estoque, Usuários) os tutoriais existem e são **razoavelmente bons** (com exemplos passo-a-passo)
- ❌ **NÃO para módulos novos** — Payments, Reports, Dashboard, Project Photos, Work Order (novo), Client Groups, Central de Notificações **não têm nenhum tutorial**

**"As regras que precisam ser cumpridas para funcionar?"**
- ⚠️ **PARCIALMENTE** — regras básicas (budget threshold, preço médio, convite 7 dias) estão documentadas, **MAS**:
  - **4 regras estão ERRADAS** (senha 6 vs 8, timezone NY vs SP, 10 permissões vs 6, 4 canais vs 3)
  - **~40 regras críticas não documentadas** (statusReason obrigatório, rate limits, limites de campo, TTLs, Cascade deletes, etc.)

**Recomendação concreta:**

Para o guia ser útil como documentação de usuário de verdade, recomendo adicionar em cada módulo uma seção **"📐 Regras importantes"** ou **"⚠️ Atenção"** listando:

1. Campos obrigatórios e limites (tamanho máx/min de strings, ranges numéricos)
2. Status transitions possíveis e quem pode fazer
3. Quem pode fazer o quê (permissões por operação, não só por cargo)
4. Constraints (ex: "não pode desativar último admin")
5. Defaults do sistema (TTLs, thresholds, rate limits)
6. Fluxos condicionais (ex: "se Google Calendar não conectado, agendamento ainda é criado")
7. Validações que bloqueiam (ex: "erro se funcionário já tem agendamento no horário")

Idealmente, cada módulo no guia deveria ter:
- **Visão geral** (o que o módulo faz)
- **Tutorial principal** (fluxo passo-a-passo)
- **Regras importantes** (validações, limites, quem pode fazer o quê)
- **Fluxos comuns** (exemplos de casos de uso)
- **Troubleshooting** (erros comuns e como resolver)

---

**Fim do Relatório.**
