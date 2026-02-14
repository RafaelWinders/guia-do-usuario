# Agendamentos, Relatorios, Configuracoes e Emergencia - Guia do Usuario

Neste guia, voce vai aprender sobre os modulos de **Agendamentos**, **Relatorios Diarios**, **Configuracoes** e **Notificacao de Emergencia** do SGI.

---

## PARTE 1: AGENDAMENTOS

### 1. Acessando a tela de Agendamentos

No menu lateral esquerdo, clique em **"Agendamentos"**. Voce sera levado para a pagina de gerenciamento de visitas e compromissos.

![Agendamentos - Lista](images/scheduling-list.png)

---

### 2. Modos de visualizacao

Voce pode ver os agendamentos de 2 formas diferentes. Os botoes ficam no canto superior direito da tela.

#### Lista (padrao)

Mostra os agendamentos agrupados por data, do mais recente para o mais antigo. Cada agendamento aparece como um card com:

- **Horario** - Hora de inicio e fim (ex: 14:00 > 17:00)
- **Status** - Badge colorido indicando a situacao (Agendado, Em andamento, Concluido, Cancelado)
- **Projeto** - Nome do projeto vinculado (ex: "Instalacao Hidraulica - Rua Dr. Melo Alves, 700")
- **Funcionario** - Quem esta atribuido ao agendamento
- **Observacoes** - Notas adicionais sobre a visita
- **Botoes** - Editar e Cancelar

#### Calendario

Mostra uma grade semanal (segunda a domingo), com slots de horario das 08:00 as 18:00. Os agendamentos aparecem como blocos coloridos conforme o status.

![Agendamentos - Calendario](images/scheduling-calendar.png)

Use os botoes **"Anterior"**, **"Hoje"** e **"Proximo"** para navegar entre as semanas.

---

### 3. Criando um agendamento

Para criar um novo agendamento, clique no botao **"Novo Agendamento"** no canto superior direito.

![Novo Agendamento](images/scheduling-new-dialog.png)

Uma janela vai abrir com os seguintes campos:

| Campo | Obrigatorio? | Descricao |
|-------|:---:|-----------|
| **Projeto** | Sim | Selecione o projeto vinculado a esta visita |
| **Funcionario** | Sim | Selecione o funcionario que fara a visita |
| **Data** | Sim | Data da visita |
| **Horario de inicio** | Sim | Hora em que a visita comeca |
| **Duracao** | Sim | Quanto tempo vai durar (1 hora, 2 horas, 3 horas, 4 horas, etc.) |
| **Observacoes** | Nao | Notas adicionais sobre a visita |

#### Exemplo passo a passo

1. Clique em **"Novo Agendamento"**
2. Em **Projeto**, selecione: `Instalacao Hidraulica - Rua Dr. Melo Alves, 700`
3. Em **Funcionario**, selecione: `Joao Silva`
4. Em **Data**, selecione a data desejada
5. Em **Horario de inicio**, digite: `09:00`
6. Em **Duracao**, selecione: `2 horas`
7. Em **Observacoes**, digite: `Levar ferramentas para vistoria`
8. Clique em **"Criar Agendamento"**

---

### 4. Editando e cancelando agendamentos

#### Editar

Na visualizacao em lista, clique no botao **"Editar"** no card do agendamento. Uma janela vai abrir onde voce pode alterar:

![Editar Agendamento](images/scheduling-edit-dialog.png)

- **Data** - Mudar o dia da visita
- **Horario de inicio** - Mudar a hora
- **Duracao** - Mudar quanto tempo vai durar
- **Observacoes** - Alterar as notas

Apos fazer as alteracoes, clique em **"Salvar"**.

#### Cancelar

Na visualizacao em lista, clique no botao **"Cancelar"** no card do agendamento. O status mudara para "Cancelado".

---

### 5. Filtros de agendamentos

No topo da pagina, voce encontra filtros para refinar a lista:

| Filtro | O que faz |
|--------|----------|
| **Usuarios** | Filtra por funcionario especifico (padrao: "Todos os usuarios") |
| **Status** | Filtra por status do agendamento (padrao: "Todos os status") |
| **Data** | Filtra por intervalo de datas (campos de data inicio e fim) |

---

### 6. Status dos agendamentos

| Status | Significado | Cor |
|--------|-------------|-----|
| **Agendado** | Visita programada para o futuro | Azul |
| **Em andamento** | Visita esta acontecendo agora | Verde |
| **Concluido** | Visita foi realizada | Cinza |
| **Cancelado** | Visita foi cancelada | Vermelho |

---

### 7. Integracao com Google Calendar (opcional)

Quando a conta Google esta conectada (via Configuracoes > Integracoes), os agendamentos do SGI sincronizam automaticamente com o Google Calendar.

**Como funciona:**
- O sistema cria calendarios individuais para cada funcionario (ex: "SGI - Joao Silva")
- Quando voce cria, edita ou cancela um agendamento no SGI, a alteracao aparece automaticamente no Google Calendar
- A sincronizacao e bidirecional

> **Nota:** A integracao com Google Calendar NAO e obrigatoria. O sistema funciona perfeitamente sem ela. Para conectar, veja a secao **Integracoes** mais adiante neste guia.

---

## PARTE 2: RELATORIOS DIARIOS

### 8. Acessando os Relatorios Diarios

No menu lateral esquerdo, clique em **"Relatorios Diarios"**. Voce vera a lista de todos os relatorios de progresso do trabalho.

![Relatorios Diarios](images/daily-reports-list.png)

---

### 9. Entendendo um relatorio

Cada relatorio aparece como um card com as seguintes informacoes:

- **Projeto** - Nome do projeto (titulo do card)
- **Status** - Badge "Enviado"
- **Data** - Quando o relatorio foi enviado
- **Funcionario** - Quem enviou o relatorio
- **Progresso** - Porcentagem de conclusao do trabalho (ex: 75%)
- **Tarefas concluidas** - Lista das atividades realizadas (ex: "Preparacao de superficie", "Aplicacao de primer")
- **Problemas** - Dificuldades encontradas durante o trabalho (se houver)
- **Notas** - Observacoes adicionais do funcionario

#### Como os relatorios sao criados

Os relatorios **nao sao criados nesta pagina**. Eles sao gerados pelos funcionarios atraves do **Chat** com a inteligencia artificial do sistema. Quando um funcionario envia um relatorio de progresso pelo Chat, ele aparece automaticamente nesta pagina.

> Este recurso sera explicado em detalhes no **Guia do Chat**.

#### Vinculo com projetos

Cada relatorio tambem aparece na aba **"Relatorios"** do projeto correspondente. Por exemplo, um relatorio do projeto "Troca de Carpete" aparece tanto nesta pagina quanto na aba Relatorios desse projeto.

---

### 10. Filtrando relatorios

No topo da pagina, voce pode filtrar os relatorios por:

| Filtro | O que faz |
|--------|----------|
| **Todos** | Mostra todos os relatorios (padrao) |
| **Por Projeto** | Mostra apenas relatorios de um projeto especifico |
| **Por Usuario** | Mostra apenas relatorios de um funcionario especifico |

Selecione o tipo de filtro no dropdown **"Tipo de Filtro"** e, se necessario, selecione o projeto ou usuario no dropdown secundario que aparece.

> **Visibilidade:** Administradores veem todos os relatorios. Funcionarios veem apenas os seus proprios.

---

## PARTE 3: CONFIGURACOES

### 11. Acessando as Configuracoes

No menu lateral esquerdo, clique em **"Configuracoes"**. Voce vera a pagina com 6 abas.

---

### 12. Perfil

![Aba Perfil](images/settings-profile.png)

A aba **Perfil** mostra e permite editar suas informacoes pessoais.

#### Foto de Perfil
- **Avatar** - Mostra as iniciais do seu nome
- **Carregar Foto** - Clique para enviar uma foto de perfil (PNG, JPG ou JPEG, maximo 5MB)

#### Informacoes Pessoais
- **Nome** - Seu nome completo. Clique em **"Editar"** para alterar
- **Email** - Seu email (somente leitura - nao pode ser alterado)
- **Cargo** - Seu cargo no sistema (somente leitura)

---

### 13. Seguranca

![Aba Seguranca](images/settings-security.png)

A aba **Seguranca** permite alterar sua senha.

Para alterar a senha:
1. Clique no botao **"Alterar Senha"**
2. Uma janela vai abrir com 3 campos:
   - **Senha atual** - Digite sua senha atual
   - **Nova senha** - Digite a nova senha (minimo 8 caracteres)
   - **Confirmar nova senha** - Repita a nova senha
3. Clique em **"Alterar Senha"** para confirmar

> **Dica:** Use o botao de olho ao lado dos campos para mostrar/ocultar a senha enquanto digita.

---

### 14. Notificacoes

![Aba Notificacoes](images/settings-notifications.png)

A aba **Notificacoes** permite configurar como voce recebe alertas do sistema.

#### Notificacoes do Navegador

Clique no botao **"Ativar"** para receber alertas push mesmo quando a aba do SGI estiver em segundo plano.

#### 3 canais de notificacao

| Canal | O que e |
|-------|---------|
| **App** | Notificacoes dentro do SGI (icone de sino no canto superior direito) |
| **Email** | Notificacoes enviadas para seu email |
| **Push** | Notificacoes do navegador (pop-up na tela) |

#### 5 categorias de notificacao

Cada categoria pode ser expandida clicando nela:

| Categoria | Tipos de notificacao |
|-----------|---------------------|
| **Projetos** | Atribuicao a projeto, desatribuicao, mudanca de status |
| **Orcamento** | Alerta de orcamento proximo do limite, orcamento ultrapassado |
| **Agendamentos** | Agendamento criado, atualizado, cancelado, lembrete |
| **Estoque** | Alerta de estoque baixo |
| **Escopo** | Escopo pronto para revisao |

Para cada tipo de notificacao, voce pode ativar ou desativar cada canal individualmente.

**Botao "Restaurar padroes":** Volta todas as configuracoes de notificacao para o padrao original.

> **Importante:** Notificacoes de emergencia sao **sempre** enviadas em todos os canais disponiveis, independente das suas configuracoes.

---

### 15. Aparencia

![Aba Aparencia](images/settings-appearance.png)

A aba **Aparencia** permite alterar o tema visual do sistema.

- **Modo Escuro** - Toggle para ligar/desligar o tema escuro (padrao: ligado)

> **Dica:** Voce tambem pode alternar entre modo claro e escuro clicando no icone de sol/lua no canto superior direito do cabecalho, acessivel de qualquer pagina do sistema.

---

### 16. Idioma e Regiao

![Aba Idioma](images/settings-language.png)

A aba **Idioma** permite trocar o idioma da interface.

- **Idioma** - Clique em um dos botoes para trocar imediatamente:
  - **Portugues (Brasil)** - Interface em portugues
  - **English (US)** - Interface em ingles

- **Fuso Horario** - Atualmente fixo em "America/Sao_Paulo"

> **Nota:** O idioma e definido no primeiro acesso (via convite), mas voce pode alterar a qualquer momento aqui. No lancamento final do sistema, o fuso horario e moedas serao totalmente configuraveis. Atualmente estao limitados por estarmos em fase de testes.

---

### 17. Integracoes (opcional)

![Aba Integracoes](images/settings-integrations.png)

A aba **Integracoes** permite conectar sua conta Google ao SGI.

> **Importante:** A integracao com Google NAO e obrigatoria. O sistema funciona perfeitamente sem ela. E uma funcionalidade opcional para quem deseja sincronizar agendamentos e fazer backup de projetos.

#### Status da integracao

No topo, voce ve o status atual:
- **"Nao conectado"** - A conta Google nao esta vinculada
- **"Conectado"** - A conta Google esta vinculada e ativa

#### Como conectar

1. Clique no botao **"Conectar Google"**
2. Uma janela do Google vai abrir pedindo permissao
3. Selecione sua conta e autorize o acesso
4. Pronto! O status muda para "Conectado"

#### O que a integracao habilita

| Recurso | O que faz |
|---------|----------|
| **Google Calendar** | Sincroniza os agendamentos do SGI com o Google Calendar. Cria calendarios individuais por funcionario (ex: "SGI - Joao Silva") |
| **Google Drive** | Permite salvar backup dos projetos no Google Drive para controle interno da empresa |

> **Sobre o Google Drive:** O SGI usa seu proprio banco de dados para armazenar todos os dados dos projetos. O backup no Google Drive e **opcional** e serve apenas para gestao interna da empresa que deseja ter uma copia adicional.

#### Como desconectar

Se voce quiser remover a integracao:
1. Clique no botao **"Desconectar"**
2. Confirme a acao na janela de confirmacao
3. A sincronizacao sera interrompida

---

## PARTE 4: EMERGENCIA

### 18. Notificacao de Emergencia

A tela de **Notificacao de Emergencia** permite que administradores enviem alertas urgentes para funcionarios.

![Formulario de Emergencia](images/emergency-form.png)

> **Acesso:** Apenas administradores podem acessar esta funcionalidade.

#### Alerta de aviso

No topo da pagina, um alerta amarelo avisa: **"Esta e uma ferramenta de comunicacao critica. Use apenas para situacoes que requerem atencao imediata."**

#### Formulario

| Campo | Descricao |
|-------|-----------|
| **Selecionar destinatarios** | Escolha quem vai receber a notificacao (3 modos disponiveis - veja abaixo) |
| **Titulo** | Titulo curto da emergencia (max. 100 caracteres). Ex: "Alerta de Seguranca" |
| **Mensagem** | Descricao detalhada da situacao (max. 500 caracteres). Um contador mostra quantos caracteres restam |
| **Pre-visualizacao** | Mostra em tempo real quem vai receber, o titulo e a mensagem |

#### 3 modos de selecao de destinatarios

| Modo | O que faz |
|------|----------|
| **Todos os funcionarios** | Envia para todos os funcionarios ativos do sistema |
| **Por projeto** | Filtra apenas os funcionarios atribuidos a um projeto especifico |
| **Selecao manual** | Permite selecionar funcionarios individualmente com checkboxes |

#### Enviando a notificacao

1. Selecione os destinatarios
2. Preencha o titulo e a mensagem
3. Verifique a pre-visualizacao
4. Clique em **"Enviar Notificacao de Emergencia"**
5. Uma janela de confirmacao vai aparecer

![Confirmacao de envio](images/emergency-confirm.png)

A confirmacao avisa: **"Esta notificacao sera enviada imediatamente para todos os destinatarios selecionados em TODOS os canais (App, Email, Push). Deseja continuar?"**

6. Clique em **"Confirmar"** para enviar ou **"Cancelar"** para voltar

> **Importante:** Notificacoes de emergencia **ignoram** as preferencias de notificacao dos usuarios. Elas sao sempre enviadas em todos os canais disponiveis (App, Email e Push) para garantir que todos recebam o alerta.

---

## Resumo rapido

### Agendamentos

| Voce quer... | Faca isso... |
|-------------|-------------|
| Ver todos os agendamentos | Clique em "Agendamentos" no menu lateral |
| Ver no calendario | Clique no botao "Calendario" |
| Criar agendamento | Clique em "Novo Agendamento" |
| Editar agendamento | Botao "Editar" no card do agendamento |
| Cancelar agendamento | Botao "Cancelar" no card do agendamento |
| Filtrar por funcionario | Use o dropdown "Todos os usuarios" |

### Relatorios Diarios

| Voce quer... | Faca isso... |
|-------------|-------------|
| Ver todos os relatorios | Clique em "Relatorios Diarios" no menu lateral |
| Filtrar por projeto | Selecione "Por Projeto" no Tipo de Filtro |
| Filtrar por usuario | Selecione "Por Usuario" no Tipo de Filtro |

### Configuracoes

| Voce quer... | Faca isso... |
|-------------|-------------|
| Alterar foto | Configuracoes > Perfil > "Carregar Foto" |
| Alterar nome | Configuracoes > Perfil > "Editar" |
| Alterar senha | Configuracoes > Seguranca > "Alterar Senha" |
| Configurar notificacoes | Configuracoes > Notificacoes |
| Alternar tema claro/escuro | Configuracoes > Aparencia ou icone sol/lua no cabecalho |
| Trocar idioma | Configuracoes > Idioma |
| Conectar Google | Configuracoes > Integracoes > "Conectar Google" |

### Emergencia

| Voce quer... | Faca isso... |
|-------------|-------------|
| Enviar alerta de emergencia | Clique em "Emergencia" no menu lateral |
| Enviar para todos | Selecione "Todos os funcionarios" |
| Enviar para equipe de projeto | Selecione "Por projeto" e escolha o projeto |
| Enviar para pessoas especificas | Selecione "Selecao manual" |
