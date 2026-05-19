# Relatórios Diários - Guia do Usuário

Este guia explica como funciona o módulo de **Relatórios Diários** do SGI. Os relatórios são usados para acompanhar o progresso diário do trabalho em campo.

---

## 1. Acessando os Relatórios Diários

No menu lateral, clique em **"Relatórios Diários"**.

![Relatórios Diários](images/daily-reports-list.png)

---

## 2. Como os relatórios funcionam agora

Diferente de versões anteriores, os relatórios diários agora são preenchidos **diretamente na interface do SGI** — não pelo Chat. O Chat não cria mais relatórios automaticamente.

**O que mudou:**
- Relatórios são criados e preenchidos pela UI (formulário)
- Todo relatório é enviado imediatamente ao criar — não existe mais status `draft`
- Um funcionário pode criar **múltiplos relatórios no mesmo dia** (ex: manhã e tarde)
- A edição é **sempre permitida** (sem janela de 24h): o próprio criador ou admin/superadmin pode editar a qualquer momento
- Cards de relatório na lista **abrem o formulário em modo edição** ao clicar

---

## 3. Estrutura de um relatório

Cada relatório é composto por:

### Respostas do template (se houver template vinculado)

Se o projeto tiver um **Modelo de Relatório** vinculado, o formulário apresenta os campos definidos nesse modelo (texto, número, data, foto, checklist de serviços da WO, etc.).

📖 Veja o [Guia de Modelos de Relatório](modelos-relatorio.md) para entender como os modelos funcionam.

!!! note "Sem template = formulário básico"
    Se o projeto não tiver um modelo vinculado, o relatório mostra apenas os campos universais: **Notas gerais** e **Fotos gerais**.

### Campos sempre presentes

Independente do template, todo relatório tem:

| Campo | Descrição |
|-------|-----------|
| **Notas gerais** | Observações livres sobre o dia de trabalho |
| **Fotos gerais** | Imagens de progresso (fora do template) |

### service_checklist (campo especial)

Se o template incluir um campo do tipo **"Service Checklist"**, o formulário exibe automaticamente os itens da Work Order do projeto. O funcionário marca cada item como concluído.

!!! warning "Items removidos da WO"
    Se um item da WO for removido depois que o relatório foi criado, ele aparece no checklist com o badge **"Removido do WO"** — o nome original é preservado por snapshot. Isso garante que o histórico permaneça intacto.

---

## 4. Criando um relatório

1. No menu lateral, clique em **"Relatórios Diários"**
2. Clique em **"+ Novo Relatório"**
3. Selecione o **projeto** (se não foi pré-selecionado)
4. Preencha os campos do template (se houver) e as notas gerais
5. Adicione fotos se necessário
6. Clique em **"Enviar"**

O relatório é salvo e enviado imediatamente.

### Múltiplos relatórios no mesmo dia

Você pode criar mais de um relatório para o mesmo projeto no mesmo dia. Não há restrição de "um por dia". Isso é útil para:

- Relatório de manhã e relatório de tarde
- Relatar problemas encontrados separadamente do progresso normal
- Corrigir ou complementar sem editar o original

---

## 5. Editando um relatório

Para editar um relatório existente:

1. Clique no **card do relatório** na lista
2. O formulário abre em modo edição
3. Altere os campos desejados
4. Salve

!!! note "Quem pode editar"
    - O **próprio criador** do relatório pode editar a qualquer momento
    - **Admin e superadmin** podem editar qualquer relatório
    - Cada edição registra um evento na **timeline do projeto** com os campos que mudaram

!!! warning "Validação only na criação/edição"
    Campos marcados como "obrigatórios" no template só são validados ao criar ou editar. Se o template for alterado depois que o relatório foi criado (ex: campo removido), o relatório antigo **não é invalidado** — continua válido como está.

---

## 6. Fotos no relatório

Fotos podem ser adicionadas tanto nos campos de foto do template quanto nas **fotos gerais** do relatório.

- As fotos ficam armazenadas em `daily-reports/{userId}/{reportId}/{photoId}` no Storage
- Ao deletar o relatório, as fotos são removidas automaticamente (cascade delete via trigger)

---

## 7. Filtros disponíveis

| Filtro | Opções | O que faz |
|--------|--------|-----------|
| **Tipo de Filtro** | Todos / Por Projeto / Por Usuário | Muda o critério principal |
| **Por Projeto** | Dropdown de projetos | Lista só relatórios do projeto selecionado |
| **Por Usuário** (admin) | Dropdown de usuários | Lista só relatórios do funcionário |

!!! note "Visibilidade por cargo"
    - **Administradores/Super Admins:** Veem **todos** os relatórios + filtro por usuário
    - **Funcionários:** Veem **apenas os próprios** relatórios

---

## 8. Relatórios na aba do projeto

Cada relatório também aparece na **aba "Relatórios"** do projeto correspondente, permitindo visualizar todo o histórico de progresso do projeto em um só lugar.

---

## Regras Importantes

### Campos e estrutura

| Campo | Obrigatório | Observação |
|-------|:---:|---|
| `projectId` | Sim | Projeto deve existir |
| `userId` | Sim | Usuário autenticado |
| `reportDate` | Sim | Preenchido automaticamente (data atual) |
| `responses[]` | Conforme template | Campos do modelo de relatório |
| `generalNotes` | Não | Notas livres — sempre presentes |
| `generalPhotos[]` | Não | Fotos gerais — sempre presentes |

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Criar relatório | Sim | Sim | Sim |
| Ver próprios relatórios | Sim | Sim | Sim |
| Ver relatórios de todos | Sim | Sim | **Não** |
| Filtrar por usuário | Sim | Sim | Não |
| Editar qualquer relatório | Sim | Sim | Só os próprios |
| Deletar relatório | Sim | Sim | Não |

### Validações que bloqueiam

!!! warning "Template obrigatório vs. opcional"
    Campos marcados como `required` no template impedem o envio se não preenchidos. Campos opcionais podem ser deixados em branco.

### Defaults do sistema

| Configuração | Valor | Observação |
|---|---|---|
| Status | Enviado imediatamente | Não existe mais `draft` |
| Múltiplos por dia | Permitido | Sem restrição de um por dia |
| Edição | Sempre | Sem janela de tempo |
| Fotos | Path no Storage | Cascade delete ao remover relatório |

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Ver todos os relatórios | Menu "Relatórios Diários" |
| Ver relatórios de um projeto | Filtrar "Por Projeto" OU ir na aba "Relatórios" do projeto |
| Ver relatórios de um funcionário | Filtrar "Por Usuário" (admin) |
| Criar um relatório | "Relatórios Diários" > "+ Novo Relatório" > preencher > Enviar |
| Editar um relatório | Clicar no card do relatório |
| Vincular modelo ao projeto | [Editar projeto](projetos.md) > dropdown "Modelo de relatório" |
