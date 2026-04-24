# Notificação de Emergência - Guia do Usuário

Este guia explica a funcionalidade de **Notificações de Emergência** do SGI, usada por administradores para enviar alertas urgentes a funcionários.

!!! danger "Ferramenta de comunicação crítica"
    Use **apenas para situações que requerem atenção imediata**. Notificações de emergência:

    - Ignoram as preferências de notificação dos usuários
    - São enviadas em **todos os canais disponíveis** (App, Email, Push)
    - Geram log de auditoria no sistema
    - Contam para rate limit do admin (5 por minuto)

    **Não use para comunicação rotineira** - isso gera desconfiança e pode fazer usuários ignorarem alertas reais.

---

## 1. Acessando a tela

No menu lateral, clique em **"Emergência"** (apenas admins veem esta opção).

![Formulário de Emergência](images/emergency-form.png)

---

## 2. O formulário

### Campos disponíveis

| Campo | Descrição | Limite |
|-------|-----------|--------|
| **Destinatários** | Quem receberá (ver 3 modos abaixo) | Máximo 100 usuários |
| **Título** | Título curto da emergência | 100 caracteres |
| **Mensagem** | Descrição detalhada | 500 caracteres (contador visível) |
| **Pré-visualização** | Mostra em tempo real o que será enviado | - |

### 3 modos de selecionar destinatários

| Modo | O que faz |
|------|-----------|
| **Todos os funcionários** | Envia para todos os funcionários ativos (até 100) |
| **Por projeto** | Apenas os atribuídos a um projeto específico |
| **Seleção manual** | Checkboxes individuais |

---

## 3. Enviando a notificação

### Passo a passo

1. Selecione o **modo de destinatários**
2. Escolha quem vai receber
3. Preencha **Título** (max 100 chars) e **Mensagem** (max 500 chars)
4. Confira a **pré-visualização**
5. Clique em **"Enviar Notificação de Emergência"**

### Janela de confirmação

![Confirmação de envio](images/emergency-confirm.png)

A confirmação avisa:

> **"Esta notificação será enviada imediatamente para todos os destinatários selecionados em TODOS os canais (App, Email, Push). Deseja continuar?"**

Clique em **"Confirmar"** para enviar ou **"Cancelar"** para voltar.

!!! tip "Não há como desfazer"
    Uma vez enviada, a notificação **não pode ser recuperada**. Verifique destinatários, título e mensagem antes de confirmar.

---

## 4. O que acontece depois de enviar

1. **Sistema distribui** para todos os destinatários selecionados
2. Cada usuário recebe em **3 canais simultâneos** (mesmo que tenha desligado nas preferências):
   - **App:** aparece no ícone de sino (destaque vermelho)
   - **Email:** enviado ao email cadastrado
   - **Push:** pop-up do navegador (se tiver permissão)
3. **Log de auditoria** é gerado no sistema com: quem enviou, quando, quantos receberam, título
4. Admin que enviou **conta para o rate limit** (5 envios/minuto)

---

## Regras Importantes

### Limites

| Item | Limite | Consequência se ultrapassar |
|------|--------|----------------------------|
| **Caracteres no título** | 100 | Sistema impede envio (validação no form) |
| **Caracteres na mensagem** | 500 | Contador mostra quanto falta; bloqueia envio |
| **Destinatários por envio** | 100 | Sistema retorna erro |
| **Envios por minuto (rate limit)** | 5 por admin | Erro "Rate limit exceeded" - aguarde 1 min |

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Ver menu "Emergência" | Sim | Sim | Não |
| Enviar notificação de emergência | **Sim** | **Sim** | Não |
| Receber notificação de emergência | Sim | Sim | Sim |

### Validações que bloqueiam

!!! warning "Rate limit: 5 por minuto"
    Cada admin pode enviar **no máximo 5 notificações de emergência por minuto**. Além disso, o sistema bloqueia temporariamente e retorna erro. Isso protege contra abuso.

!!! warning "Máximo 100 destinatários"
    Se sua seleção tiver mais de 100 usuários, o sistema bloqueia o envio. Para atingir um grupo maior, divida em lotes separados.

### Diferenças das notificações normais

| Característica | Notificação Normal | Notificação de Emergência |
|---|:---:|:---:|
| Respeita preferências do usuário | Sim | **Não** (ignora) |
| Canais enviados | Configurável | **Todos** (In-App, Email, Push) |
| Rate limit do remetente | Não | **5/minuto** |
| Log de auditoria | Não | **Sim** |
| Prioridade | normal | **emergency** |
| TTL (expiração) | 30 dias | 30 dias |

### Defaults do sistema

| Configuração | Valor |
|---|---|
| Prioridade | `emergency` |
| Canais enviados | Todos disponíveis |
| Rate limit | 5/min por admin |
| Max destinatários | 100 por envio |
| Log de auditoria | Sempre |

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Enviar alerta de emergência | Menu "Emergência" |
| Enviar para todos os funcionários | Selecione "Todos os funcionários" |
| Enviar para equipe de um projeto | Selecione "Por projeto" e escolha o projeto |
| Enviar para pessoas específicas | Selecione "Seleção manual" + checkboxes |

---

## Boas práticas

!!! tip "Use com parcimônia"
    Emergências "desvalorizam" se forem muito frequentes. Reserve para:

    - Problemas de segurança no local de trabalho
    - Situações que afetam todo o time imediatamente
    - Mudanças de última hora em prazos críticos
    - Alertas do cliente que precisam de resposta rápida

!!! tip "Seja objetivo"
    Título curto e direto ("Evacuação prédio Paulista 1000"), mensagem com **o que fazer** e **quando**. Não use jargão corporativo em emergências.

!!! danger "Nunca use para comunicação rotineira"
    Se você está usando "Emergência" para:

    - Avisos gerais
    - Lembretes de reunião
    - Informações administrativas

    **Pare.** Use o Chat, email ou notificações normais. Emergência perde o valor se virar rotina.
