# TODO - Screenshots pendentes

Este arquivo lista todos os screenshots que **você precisa capturar** para completar o guia.

Cada imagem tem um **marcador visual** no site (dashed border + "📷 Screenshot pendente") até você substituir pelo arquivo real.

**Como substituir:**

1. Capture o screenshot no PWA (SGI rodando local ou produção)
2. Salve como **PNG** no caminho indicado (`docs/images/nome-do-arquivo.png`)
3. Commit e push — o CI publica automaticamente
4. **Opcional:** remova o comentário `<!-- TODO: ... -->` acima do `![]` e retire a classe `{ .placeholder-image }` do markdown

---

## 🔴 Prioridade ALTA (impacto na experiência)

### Work Order (novo sistema completo)

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/work-order-view.png` | Aba Work Order de um projeto | Header + 2-3 categorias expandidas com items + botões de ação |
| `images/work-order-header.png` | Aba Work Order - foco no header | Todos os campos preenchidos (WO number, job number, customer, job address) |
| `images/work-order-category.png` | Aba Work Order - categoria expandida | Categoria com items listados, incluindo preço (modo admin) |
| `images/work-order-import-dialog.png` | Chat > botão PDF > dialog de import | Upload de PDF + área drag-and-drop |
| `images/work-order-import-preview.png` | Chat > após analisar PDF | Preview estruturado com os dados extraídos antes de confirmar |
| `images/work-order-edit-item.png` | Work Order > clicar em editar item | Dialog de edição com todos os campos (task, action, type, quantity, unit, room, notes, price) |

### Payments (módulo novo)

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/payments-main.png` | Menu Pagamentos > página inicial | Header + seletor de sheet (dropdown com meses) + botões Manage Categories/Payees |
| `images/payments-sheet-view.png` | Payments > abrir uma sheet | Grid com categorias (colapsáveis) + linhas de payee + colunas de semanas + totais |
| `images/payments-categories-dialog.png` | Payments > "Manage Categories" | Lista de categorias com cores e botões editar/deletar |
| `images/payments-payees-dialog.png` | Payments > "Manage Payees" | Lista de payees agrupados por categoria, com nome/empresa/método |
| `images/payments-create-sheet.png` | Payments > "+ Nova Sheet" | Dialog com seletores de ano/mês + preview das semanas |
| `images/payments-manage-weeks.png` | Sheet aberta > "Manage Weeks" | Dialog com lista de datas editáveis |

### Project Photos (aba nova)

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/project-photos-tab.png` | Projeto > aba Fotos | Grid de miniaturas + botão de upload + filtros de tag |
| `images/project-photos-upload.png` | Fotos > botão Upload | Dialog/área de upload com drag-and-drop |
| `images/project-photos-viewer.png` | Clicar em uma foto | Fullscreen + painel lateral com metadados e comentários |

### Chat (atualizado)

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/chat-mobile-menu.png` | Chat no mobile > botão "+" expandido | Menu Popover com opções Photo / Record Audio / Upload Audio / Record Video / Upload Video / Upload PDF |

---

## 🟡 Prioridade MÉDIA (módulos secundários)

### Dashboard (novo)

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/dashboard-admin.png` | Dashboard logado como admin | 3 stats cards + grid com projetos recentes e custos pendentes + quick actions |
| `images/dashboard-employee.png` | Dashboard logado como funcionário | Cards My Projects + Notifications + Profile |

### Reports / Analytics

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/reports-analytics-main.png` | Menu Reports (Analytics) | 4 stats cards + Budget Analysis + Projects by Status + botões de export |

### Notificações

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/notifications-center.png` | `/notifications` | Lista de notificações + dropdown de filtros aberto + checkbox de seleção |

### Client Groups

| Arquivo | Onde capturar | O que mostrar |
|---------|---------------|---------------|
| `images/client-groups-list.png` | Menu Client Groups | Lista de cards de grupos com descrição + botão Novo Grupo |
| `images/client-groups-dialog.png` | "+ Novo Grupo" | Dialog com campos nome e descrição |

---

## 🟢 Prioridade BAIXA (refinar imagens antigas)

Essas imagens JÁ EXISTEM mas foram tiradas antes das mudanças recentes. **Idealmente refazer** para refletir a UI atual, mas não é bloqueante.

| Arquivo existente | Motivo para refazer |
|-------------------|---------------------|
| `images/chat-attachments.png` | Agora tem botão de PDF (antes não tinha) |
| `images/projects-list-grid.png` | Menu lateral pode ter mudado (novos itens: Payments, Reports, Client Groups, Emergency) |
| `images/projects-kanban.png` | Mesmo motivo (menu lateral) |
| `images/project-detail-scope.png` | Aba agora é "Work Order" (totalmente diferente) - **URGENTE** |
| `images/project-detail-overview.png` | Pode ter Backup Status card novo (superadmin) |
| `images/settings-language.png` | Timezone agora é "America/New_York" (era Sao_Paulo) |
| `images/settings-integrations.png` | Aba só aparece para superadmin |
| `images/settings-notifications.png` | Conferir canais listados e categorias |
| `images/users-detail-permissions.png` | Agora mostra **10 permissões** (não 6) - **URGENTE** |
| `images/users-edit-dialog.png` | Aba Permissões com 10 itens - **URGENTE** |
| `images/skills-list.png` | Agora tem agrupamento por categoria + toggle ativar/desativar |
| `images/skills-new-dialog.png` | Adicionar campo `category` + escolha de cor hex |

---

## 📋 Total: 28 screenshots NOVOS + 12 antigos para refazer

### Dicas gerais de captura

- **Formato:** PNG (melhor qualidade para UI)
- **Modo:** Preferir **dark mode** (padrão do app Zent IA)
- **Resolução:** 1920x1080 ou maior - DevTools do browser em "Desktop" pode simular
- **Mobile:** usar DevTools com Device Toolbar (iPhone/Pixel) para capturar mobile menu
- **Zoom:** 100% (evite screenshots em zoom diferente)
- **Limpeza:** sem dados sensíveis (troque nomes/emails por fictícios se necessário)
- **Salvar em:** `docs/images/` (mesma pasta dos existentes)

### Como testar localmente depois de adicionar imagem

```bash
cd C:\Users\rafae\OneDrive\Documentos\Dev\SGI\guia-do-usuario
python -m mkdocs serve
```

Abra `http://127.0.0.1:8000` e a imagem deve aparecer **sem o marcador de placeholder** (dashed border some quando remove `{ .placeholder-image }` do markdown).
