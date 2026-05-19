# SGI — Guia do Usuário

**Sistema de Gestão Inteligente** para empresas de construção civil e field service.

Este guia cobre todos os módulos do SGI v3.x — desde o Chat com IA até controle de pagamentos e Work Orders profissionais.

---

## 🇧🇷 Português (BR)

<div class="landing-grid" markdown>

<div class="landing-card" markdown>
### 💬 Chat com IA
Coração do sistema. Gera escopos, registra custos, agenda visitas, coleta relatórios — tudo por conversa natural.

[Abrir guia →](chat.md)
</div>

<div class="landing-card" markdown>
### 📁 Projetos
Criar, editar, acompanhar projetos. Inclui Work Orders, Fotos, aprovação de custos.

[Abrir guia →](projetos.md)
</div>

<div class="landing-card" markdown>
### 📋 Work Order
Sistema profissional de ordem de serviço — 16 categorias, import PDF, aprovação formal.

[Abrir guia →](work-order.md)
</div>

<div class="landing-card" markdown>
### 📦 Estoque
Controle de materiais com preço médio ponderado e alocação para projetos.

[Abrir guia →](estoque.md)
</div>

<div class="landing-card" markdown>
### 👥 Usuários e Permissões
10 permissões granulares, skills, convites com expiração.

[Abrir guia →](usuarios.md)
</div>

<div class="landing-card" markdown>
### 💰 Pagamentos
Planilhas mensais de folha, subcontratados e fornecedores.

[Abrir guia →](pagamentos.md)
</div>

<div class="landing-card" markdown>
### 📅 Agendamentos
Visitas com sync Google Calendar (opcional) e sugestão inteligente de funcionário.

[Abrir guia →](agendamentos.md)
</div>

<div class="landing-card" markdown>
### 📊 Dashboard
Visão geral do sistema — diferente para admin e funcionário.

[Abrir guia →](dashboard.md)
</div>

<div class="landing-card" markdown>
### 📈 Relatórios e Analytics
Budget utilization, completion rate, projects by status + exports.

[Abrir guia →](relatorios-analytics.md)
</div>

<div class="landing-card" markdown>
### 📝 Relatórios Diários
Formulários de progresso em campo — com templates personalizados por projeto.

[Abrir guia →](relatorios-diarios.md)
</div>

<div class="landing-card" markdown>
### 📸 Fotos do Projeto
Upload, tags, comentários colaborativos por foto.

[Abrir guia →](fotos-de-projeto.md)
</div>

<div class="landing-card" markdown>
### 🏢 Grupos de Clientes
Agrupe múltiplos projetos por cliente recorrente — com preços VIP por grupo.

[Abrir guia →](grupos-de-clientes.md)
</div>

<div class="landing-card" markdown>
### 🗂️ Catálogo de Serviços
Gerencie categorias e serviços dinamicamente — alimenta Work Orders e PDF import.

[Abrir guia →](servicos.md)
</div>

<div class="landing-card" markdown>
### 📋 Modelos de Relatório
Builder visual de formulários com 9 tipos de campo — vinculado por projeto.

[Abrir guia →](modelos-relatorio.md)
</div>

<div class="landing-card" markdown>
### 🔔 Central de Notificações
12 tipos, 4 canais, deep links, batch operations.

[Abrir guia →](notificacoes.md)
</div>

<div class="landing-card" markdown>
### ⚙️ Configurações
Perfil, senha, idioma, tema, integrações Google.

[Abrir guia →](configuracoes.md)
</div>

<div class="landing-card" markdown>
### 🚨 Emergência
Alertas urgentes que ignoram preferências dos usuários.

[Abrir guia →](emergencia.md)
</div>

</div>

---

## 🇺🇸 English (US)

<div class="landing-grid" markdown>

<div class="landing-card" markdown>
### 💬 AI Chat
[Open guide →](chat-en.md)
</div>

<div class="landing-card" markdown>
### 📁 Projects
[Open guide →](projects.md)
</div>

<div class="landing-card" markdown>
### 📋 Work Order
[Open guide →](work-order-en.md)
</div>

<div class="landing-card" markdown>
### 📦 Inventory
[Open guide →](inventory.md)
</div>

<div class="landing-card" markdown>
### 👥 Users & Permissions
[Open guide →](users.md)
</div>

<div class="landing-card" markdown>
### 💰 Payments
[Open guide →](payments.md)
</div>

<div class="landing-card" markdown>
### 📅 Scheduling
[Open guide →](scheduling.md)
</div>

<div class="landing-card" markdown>
### 📊 Dashboard
[Open guide →](dashboard-en.md)
</div>

<div class="landing-card" markdown>
### 📈 Reports & Analytics
[Open guide →](reports-analytics.md)
</div>

<div class="landing-card" markdown>
### 📝 Daily Reports
Field progress forms — with custom templates per project.

[Open guide →](daily-reports.md)
</div>

<div class="landing-card" markdown>
### 📸 Project Photos
[Open guide →](project-photos.md)
</div>

<div class="landing-card" markdown>
### 🏢 Client Groups
Group projects by recurring customer — with VIP pricing per group.

[Open guide →](client-groups.md)
</div>

<div class="landing-card" markdown>
### 🗂️ Service Catalog
Manage categories and services dynamically — feeds Work Orders and PDF import.

[Open guide →](services.md)
</div>

<div class="landing-card" markdown>
### 📋 Report Templates
Visual form builder with 9 field types — linked per project.

[Open guide →](report-templates.md)
</div>

<div class="landing-card" markdown>
### 🔔 Notifications
[Open guide →](notifications.md)
</div>

<div class="landing-card" markdown>
### ⚙️ Settings
[Open guide →](settings.md)
</div>

<div class="landing-card" markdown>
### 🚨 Emergency
[Open guide →](emergency.md)
</div>

</div>

---

## ✨ Novidades da v3.x

!!! tip "O que há de novo"
    **Novidades do redesign v3.x (commit ff364c9):**

    - **Catálogo de Serviços** — categorias e serviços dinâmicos (admin configura), substitui as 16 categorias hardcoded
    - **Modelos de Relatório** — builder visual de formulários com 9 tipos de campo, incluindo checklist da Work Order
    - **Work Order refatorada** — status simplificado (draft ↔ approved, reversível); items via catálogo; preço com 4 fontes (default/group_override/pdf/manual); criar WO em branco; editar header; preview PDF com 3 colunas
    - **Relatórios Diários redesenhados** — formulário na UI (não mais pelo Chat); template opcional; múltiplos por dia; edição sempre permitida
    - **Grupos de Clientes com preços VIP** — nova aba "Preços customizados" com `servicePriceOverrides` por serviço
    - **Projetos com modelo de relatório** — dropdown "Modelo de Relatório" no formulário de edição

    **Novidades anteriores (v3.0):**
    - **Work Order System** — substitui o escopo simples com ordem de serviço profissional (import PDF, aprovação formal)
    - **Pagamentos** — planilhas mensais completas
    - **Fotos do Projeto** — com comentários colaborativos
    - **Central de Notificações** — 12 tipos com deep links
    - **Google Drive Backup** — sincronização automática de projetos (opcional)
    - **10 permissões granulares** — controle fino do que cada funcionário pode fazer
