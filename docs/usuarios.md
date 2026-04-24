# Usuarios e Habilidades - Guia do Usuario

Neste guia, voce vai aprender tudo sobre a tela de **Usuarios** e a tela de **Habilidades (Skills)** do SGI. Aqui e onde voce gerencia a equipe, convida novos usuarios, define permissoes e organiza as competencias dos funcionarios.

---

## 1. Acessando a tela de Usuarios

No menu lateral esquerdo, clique em **"Usuarios"**. Voce sera levado para a pagina com todos os usuarios cadastrados no sistema.

![Lista de usuarios](images/users-list.png)

---

## 2. Entendendo a tela principal

### Cards resumo

No topo da pagina, existem 4 cards com informacoes gerais:

| Card | O que mostra | Exemplo |
|------|-------------|---------|
| **Total de Usuarios** | Quantos usuarios estao cadastrados | 3 |
| **Usuarios Ativos** | Quantos usuarios estao com conta ativa | 3 |
| **Administradores** | Quantos usuarios tem cargo de Admin | 0 |
| **Funcionarios** | Quantos usuarios tem cargo de Funcionario | 2 |

### Campo de busca

Abaixo dos cards, existe um campo de busca com o texto "Pesquisar". Digite o nome ou email de um usuario para filtrar a lista.

### Card de cada usuario

Cada usuario aparece como um card com as seguintes informacoes:

- **Nome** - Nome completo do usuario (ex: "Joao Silva")
- **Email** - Email do usuario (ex: funcionario1@sgi.com)
- **Status** - Etiqueta verde "Ativo" ou vermelha "Inativo"
- **Cargo** - Icone + texto indicando o cargo (ex: Funcionario)
- **Skills** - Badges coloridos mostrando as habilidades do usuario (ex: Instalacao de Carpete, Pintura)

---

## 3. Hierarquia de cargos

O SGI tem 3 niveis de acesso. Cada cargo tem permissoes diferentes no sistema.

### Super Administrador

E o cargo mais alto. Tem controle total sobre o sistema:
- Pode convidar usuarios de qualquer cargo (superadmin, admin, funcionario)
- Pode gerenciar todos os usuarios
- Todas as permissoes estao habilitadas

### Administrador

Gerencia funcionarios e projetos:
- Pode convidar apenas Funcionarios
- Pode gerenciar apenas Funcionarios
- Tem todas as permissoes exceto gerenciar outros admins

### Funcionario

Acesso basico ao sistema:
- Nao pode convidar ninguem
- Nao pode gerenciar outros usuarios
- Permissoes granulares (configuradas individualmente pelo administrador)

### Tabela comparativa

| Permissao | Super Admin | Admin | Funcionario |
|-----------|:-----------:|:-----:|:-----------:|
| Criar projetos | Sim | Sim | Nao |
| Editar projetos | Sim | Sim | Nao |
| Deletar projetos | Sim | Sim | Nao |
| Ver todos os projetos | Sim | Sim | Nao |
| Adicionar custos | Sim | Sim | Sim |
| Aprovar custos | Sim | Sim | Nao |

> **Nota:** As permissoes de um funcionario podem ser ajustadas individualmente pelo administrador. Por exemplo, voce pode dar permissao para um funcionario especifico criar projetos.

### Quem pode convidar quem

| Seu cargo | Pode convidar |
|-----------|---------------|
| **Super Administrador** | Super Admin, Admin e Funcionario |
| **Administrador** | Apenas Funcionario |
| **Funcionario** | Ninguem |

### Diagrama de hierarquia

```mermaid
flowchart TB
    SA[Super Administrador] -->|Pode convidar| SA2[Super Admin]
    SA -->|Pode convidar| A[Administrador]
    SA -->|Pode convidar| E[Funcionario]
    A -->|Pode convidar| E
    E -.X.->|Nao pode convidar| NA[Ninguem]

    SA -->|Gerencia| A
    SA -->|Gerencia| E
    A -->|Gerencia| E

    classDef superClass fill:#4db8c7,stroke:#fff,color:#000
    classDef adminClass fill:#5ec4d4,stroke:#fff,color:#000
    classDef empClass fill:#1a9db8,stroke:#fff,color:#fff
    class SA superClass
    class A adminClass
    class E empClass
```

---

## 4. Convidando um novo usuario

Para adicionar um novo membro a equipe, clique no botao **"Convidar Usuario"** no canto superior direito.

![Dialog de convite](images/users-invite-dialog.png)

Uma janela vai abrir com os seguintes campos:

| Campo | Obrigatorio? | Descricao |
|-------|:---:|-----------|
| **Nome Completo** | Sim | Nome completo do novo usuario |
| **Email** | Sim | Email para envio do convite |
| **Role (Funcao)** | Sim | Cargo do usuario: Funcionario, Administrador ou Super Administrador |
| **Idioma do Convite** | Nao | Idioma do email de convite (English US ou Portugues BR). Define o idioma do sistema no primeiro acesso, mas o funcionario pode alterar depois nas configuracoes |

### Exemplo passo a passo

Vamos convidar um novo funcionario:

1. Clique em **"Convidar Usuario"**
2. Em **Nome Completo**, digite: `Carlos Oliveira`
3. Em **Email**, digite: `carlos@exemplo.com`
4. Em **Role**, selecione: `Funcionario`
5. Em **Idioma do Convite**, selecione: `Portugues (BR)`
6. Clique em **"Enviar Convite"**

O sistema vai enviar um email com o link de convite para o endereco informado.

> **Nota:** O convite tem validade de **7 dias**. Apos esse prazo, o link expira e voce precisara enviar um novo convite.

---

## 5. Como o usuario aceita o convite

Apos voce enviar o convite, o novo usuario recebe um email com um link especial. O processo e o seguinte:

1. O usuario recebe o email e clica no link
2. E levado para uma pagina que mostra os dados do convite (nome, email, cargo, quem convidou)
3. O usuario cria uma senha (minimo 6 caracteres)
4. Clica em **"Completar Cadastro"**

Pronto! A conta e criada automaticamente com:
- As permissoes padrao do cargo selecionado
- Estatisticas zeradas (projetos e custos)
- Status "Ativo"

---

## 6. Detalhes do usuario

Para ver os detalhes de um usuario, clique no card dele na lista. Um painel lateral vai abrir com as informacoes completas.

### Cabecalho

No topo do painel, voce ve:
- **Avatar** - Circulo com a inicial do nome
- **Nome** - Nome completo
- **Email** - Email do usuario
- **Cargo** - Badge indicando o cargo (ex: Funcionario)
- **Status** - Badge indicando se esta Ativo ou Inativo
- **Botao "Editar"** - Abre o formulario de edicao

### Aba: Basico

![Aba Basico](images/users-detail-basic.png)

Mostra as informacoes pessoais do usuario:
- Nome
- Email
- Telefone
- Cargo (badge colorido)
- Status (badge colorido)
- Data de criacao da conta

### Aba: Permissoes

![Aba Permissoes](images/users-detail-permissions.png)

Mostra **10 permissoes granulares** do usuario com toggles (ligado/desligado). Estas sao as permissoes configuradas individualmente, independente do cargo padrao:

| Permissao | O que controla |
|-----------|---------------|
| **Pode criar projetos** (`canCreateProjects`) | Permite criar novos projetos no sistema |
| **Pode editar projetos** (`canEditProjects`) | Permite alterar dados de projetos existentes |
| **Pode deletar projetos** (`canDeleteProjects`) | Permite excluir projetos |
| **Pode ver todos os projetos** (`canViewAllProjects`) | Permite visualizar todos os projetos, nao apenas os atribuidos |
| **Pode adicionar custos** (`canAddCosts`) | Permite registrar custos em projetos (via app ou chat) |
| **Pode aprovar custos** (`canApproveCosts`) | Permite gerenciar o status dos custos registrados nos projetos |
| **Pode deletar tarefas** (`canDeleteTasks`) | Permite excluir tarefas/itens |
| **Pode criar agendamentos** (`canCreateSchedules`) | Permite criar e editar agendamentos (inclui sync com Google Calendar) |
| **Pode visualizar fotos de projeto** (`canViewProjectPhotos`) | Permite ver a aba "Fotos" com metadados |
| **Pode editar fotos de projeto** (`canEditProjectPhotos`) | Permite upload, edicao, deletar e comentar fotos |

!!! note "Funcionarios com `canApproveCosts`"
    Apesar do nome "Funcionario" sugerir permissoes limitadas, **um funcionario com a permissao `canApproveCosts` ativa tambem pode aprovar custos**, nao apenas admins. Util para delegar responsabilidades a gerentes de equipe.

!!! warning "Ultimo administrador nao pode ser desativado"
    O sistema **bloqueia** a desativacao do ultimo Super Administrador ou ultimo Administrador ativo. Se voce tentar desativar o unico admin restante, recebera o erro:
    `Cannot deactivate the last active admin/superadmin`

    Para resolver: primeiro promova outro usuario para admin, depois desative o antigo.

### Aba: Skills

![Aba Skills](images/users-detail-skills.png)

Mostra a contagem e os badges coloridos das habilidades atribuidas ao usuario.

**Exemplo:** Joao Silva tem 2 skills: "Instalacao de Carpete" e "Pintura".

### Aba: Historico

Mostra uma timeline com todas as atividades do usuario no sistema (auditoria). Cada evento mostra a data, hora e o que aconteceu.

### Aba: Estatisticas

![Aba Estatisticas](images/users-detail-stats.png)

Mostra numeros sobre a participacao do usuario:

**Projetos:**
- **Total** - Quantos projetos o usuario participa (ex: 22)
- **Ativos** - Quantos estao em andamento (ex: 20)
- **Concluidos** - Quantos ja foram finalizados (ex: 2)

**Custos Adicionados:**
- **Total** - Quantos custos o usuario registrou (ex: 3)
- **Pendentes** - Quantos ainda aguardam aprovacao (ex: 3)
- **Aprovados** - Quantos ja foram aprovados (ex: 0)

---

## 7. Editando um usuario

Para editar um usuario, clique no card dele na lista e depois clique no botao **"Editar"** no canto superior direito do painel.

![Dialog de edicao](images/users-edit-dialog.png)

O dialog de edicao tem 3 abas:

### Aba: Basico

- **Nome Completo** - Alterar o nome do usuario
- **Telefone** - Alterar o telefone
- **Email** - Campo desabilitado (email nao pode ser alterado)
- **Habilidades** - Selecionar ou remover skills do usuario (multi-select com tags)

### Aba: Status & Funcao

- **Status** - Alterar entre Ativo e Inativo
- **Funcao** - Alterar o cargo do usuario

> **Desativar um usuario:** Quando voce muda o status para "Inativo", o usuario perde acesso ao sistema mas seus dados sao mantidos. Voce pode reativar a qualquer momento.

### Aba: Permissoes

- Checkboxes para cada uma das 6 permissoes
- Permite ajustar permissoes individualmente, independente do cargo padrao

Apos fazer as alteracoes, clique em **"Salvar Alteracoes"**.

---

## 8. Filtrando usuarios

Clique no botao **"Filtros"** para abrir o painel de filtros.

![Painel de filtros](images/users-filters.png)

Os filtros disponiveis sao:

### Funcao
Filtre por cargo do usuario:
- **Todas** - Mostra todos (padrao)
- **Admin** - Apenas administradores
- **Funcionario** - Apenas funcionarios

### Status
Filtre pelo estado da conta:
- **Todos** - Mostra todos (padrao)
- **Ativos** - Apenas contas ativas
- **Inativos** - Apenas contas desativadas

### Skills
Filtre por habilidade especifica. Selecione uma ou mais skills no dropdown para ver apenas usuarios que possuem aquela competencia.

---

## 9. Permissoes em detalhe

### O que cada permissao controla

| Permissao | O que o usuario PODE fazer com ela | O que NAO pode sem ela |
|-----------|-----------------------------------|------------------------|
| **Criar projetos** | Clicar em "+ Novo Projeto" e criar projetos | Nao ve o botao de criar projeto |
| **Editar projetos** | Alterar nome, endereco, orcamento, equipe | Nao ve o botao "Editar" no projeto |
| **Deletar projetos** | Excluir projetos permanentemente | Nao ve o botao "Excluir" no projeto |
| **Ver todos os projetos** | Visualizar todos os projetos do sistema | Ve apenas projetos onde esta atribuido |
| **Adicionar custos** | Registrar despesas nos projetos (inclui o Chat) | Nao pode adicionar custos (app ou chat) |
| **Aprovar custos** | Mudar status de custos para "aprovado" ou "rejeitado" | Nao pode alterar status dos custos |
| **Deletar tarefas** | Excluir itens de tarefa | Botao "Excluir" desabilitado em tarefas |
| **Criar agendamentos** | Criar/editar agendamentos, sincronizar com Google Calendar | Nao ve botao "Novo Agendamento" |
| **Visualizar fotos de projeto** | Ver aba "Fotos" no detalhe do projeto | Aba "Fotos" nao aparece |
| **Editar fotos de projeto** | Upload, deletar, editar metadados, comentar | Aba "Fotos" aparece mas e somente leitura |

### Permissoes padrao por cargo

Quando um usuario e criado, ele recebe as permissoes padrao do cargo:

- **Super Admin e Admin:** **Todas as 10 permissoes** habilitadas por padrao
- **Funcionario:** Todas as permissoes **desligadas** por padrao. O administrador configura granularmente conforme a necessidade.

### Como ajustar permissoes de um funcionario

Voce pode dar permissoes extras a um funcionario especifico:

1. Clique no card do funcionario na lista
2. Clique em **"Editar"**
3. Va para a aba **"Permissoes"**
4. Marque as permissoes desejadas
5. Clique em **"Salvar Alteracoes"**

**Exemplo:** Para permitir que o funcionario Joao Silva crie projetos:
1. Abra o painel do Joao Silva
2. Clique em "Editar" > aba "Permissoes"
3. Marque "Pode criar projetos"
4. Salve

---

## 10. Habilidades (Skills)

As habilidades (skills) sao tags de competencia que voce atribui aos funcionarios. Elas servem para dois propositos principais:

1. **Organizacao:** Identificar rapidamente o que cada funcionario sabe fazer
2. **Inteligencia Artificial:** A IA do Chat usa as skills para sugerir o funcionario certo para cada tipo de servico. Por exemplo, ao montar a equipe para um projeto eletrico, a IA sugere funcionarios com a skill "Eletrica"

### Acessando a tela de Habilidades

No menu lateral esquerdo, clique em **"Habilidades"**. Voce vera a lista de todas as skills cadastradas.

![Lista de habilidades](images/skills-list.png)

Cada skill aparece como um card com:
- **Icone** - Icone de ferramenta
- **Nome** - Nome da habilidade (ex: Eletrica, Pintura, Encanamento)
- **Cor** - Indicador visual da cor atribuida
- **Botoes** - Editar (lapis) e Excluir (lixeira)

### Criando uma nova skill

Clique no botao **"Nova Skill"** no canto superior direito.

![Dialog de nova skill](images/skills-new-dialog.png)

| Campo | Obrigatorio? | Descricao |
|-------|:---:|-----------|
| **Nome** | Sim | Nome da habilidade. Ex: "Instalacao de Carpete" |
| **Descricao** | Nao | Descricao da habilidade (opcional) |
| **Cor** | Sim | Cor do badge da skill (seletor de cor, padrao: azul #3b82f6) |

Preencha os campos e clique em **"Criar"**.

### Editando uma skill

Clique no botao de editar (icone de lapis) no card da skill. O dialog vai abrir com os campos pre-preenchidos. Altere o que for necessario e clique em **"Salvar"**.

### Excluindo uma skill

Clique no botao de excluir (icone de lixeira) no card da skill.

![Dialog de excluir skill](images/skills-delete-dialog.png)

Uma janela de confirmacao vai aparecer mostrando:
- Nome e cor da skill
- Aviso: **"Esta acao nao pode ser desfeita. Funcionarios com esta skill perderao a atribuicao."**

Se tiver certeza, clique em **"Excluir"**. Caso contrario, clique em **"Cancelar"**.

> **Importante:** Ao excluir uma skill, todos os funcionarios que tinham essa skill perdem a atribuicao automaticamente.

### Como atribuir skills a um funcionario

As skills sao atribuidas ao editar um usuario:

1. Va para a tela de **Usuarios**
2. Clique no card do funcionario
3. Clique em **"Editar"**
4. Na aba **"Basico"**, use o campo **"Habilidades"** para selecionar as skills
5. Voce pode adicionar varias skills e remover clicando no "x" de cada badge
6. Clique em **"Salvar Alteracoes"**

---

## 11. Estatisticas do usuario

A aba **"Estatisticas"** no painel do usuario mostra numeros sobre a participacao dele no sistema.

### Projetos

| Indicador | O que significa |
|-----------|----------------|
| **Total** | Numero total de projetos em que o usuario participa |
| **Ativos** | Projetos que estao em andamento |
| **Concluidos** | Projetos que ja foram finalizados |

### Custos Adicionados

| Indicador | O que significa |
|-----------|----------------|
| **Total** | Numero total de custos que o usuario registrou |
| **Pendentes** | Custos que ainda aguardam aprovacao de um administrador |
| **Aprovados** | Custos que ja foram aprovados |

Esses numeros ajudam a acompanhar a produtividade e participacao de cada membro da equipe.

---

## Regras Importantes

### Campos obrigatórios e limites

| Campo | Obrigatório | Min | Max | Observação |
|-------|:---:|:---:|:---:|---|
| `displayName` | Sim | 3 chars | - | Nome completo |
| `email` | Sim | - | - | **Imutável** após cadastro |
| `role` | Sim | - | - | superadmin / admin / employee |
| `password` | Sim | **6 chars** | - | Sem complexidade obrigatória |
| `phoneNumber` | Não | - | - | Formato livre |

### Validade do convite

| Item | Valor |
|------|-------|
| **Duração** | 7 dias |
| **Ao expirar** | Status vira `expired`, link não funciona mais |
| **Reenviar** | Admin precisa criar novo convite |

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Ver usuários | Sim | Sim | Não |
| Convidar usuário | Sim (qualquer cargo) | Sim (só employees) | Não |
| Editar usuário | Sim (todos) | Sim (só employees) | Só próprio perfil |
| Mudar role | Sim | **Apenas promover/rebaixar employees** | Não |
| Promover a admin/superadmin | **Sim** | **Não** | Não |
| Desativar usuário | Sim | Sim | Não |
| Reativar usuário | Sim | Sim | Não |
| Gerenciar skills | Sim | Sim | Não |

### Validações que bloqueiam

!!! danger "Último admin não pode ser desativado"
    Sistema bloqueia desativação do último super admin OU último admin ativo. Retorna erro: `Cannot deactivate the last active {role}`. Promova outro usuário antes.

!!! warning "Email é imutável"
    Após o convite ser aceito, o email não pode mais ser alterado. Se precisar mudar, desative e recrie.

!!! note "Skills são soft-delete"
    Ao "deletar" uma skill, ela é marcada como `isActive: false` mas os registros históricos mantêm referência. Skills desativadas não aparecem em dropdowns de atribuição.

### Defaults do sistema

| Configuração | Padrão |
|---|---|
| Status inicial | `Ativo` |
| Locale inicial | Definido no convite |
| 10 permissões (employee) | Todas `false` |
| 10 permissões (admin/superadmin) | Todas `true` |
| Validade do convite | 7 dias |
| Tema inicial | `dark` |

---

## Resumo rapido

| Voce quer... | Faca isso... |
|-------------|-------------|
| Ver todos os usuarios | Clique em "Usuarios" no menu lateral |
| Buscar um usuario | Digite no campo "Pesquisar" |
| Convidar novo usuario | Clique em "Convidar Usuario" |
| Ver detalhes do usuario | Clique no card do usuario |
| Editar dados do usuario | Detalhes > botao "Editar" |
| Alterar permissoes | Editar > aba "Permissoes" |
| Desativar um usuario | Editar > aba "Status & Funcao" > Status: Inativo |
| Atribuir skills | Editar > aba "Basico" > campo "Habilidades" |
| Filtrar por cargo | Clique em "Filtros" > selecione a funcao |
| Ver estatisticas | Detalhes > aba "Estatisticas" |
| Gerenciar skills | Clique em "Habilidades" no menu lateral |
| Criar nova skill | Tela Habilidades > "Nova Skill" |
| Excluir uma skill | Tela Habilidades > botao lixeira no card |
