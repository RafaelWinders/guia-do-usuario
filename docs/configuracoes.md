# Configurações - Guia do Usuário

Este guia explica todas as configurações pessoais e organizacionais do SGI. No menu lateral, clique em **"Configurações"**.

A tela tem **6 abas** (desktop) ou **cards** (mobile). A aba **Integrações** só aparece para super administradores.

---

## 1. Perfil

![Aba Perfil](images/settings-profile.png)

Permite editar suas informações pessoais.

### Foto de Perfil

- **Avatar** - Exibe iniciais do seu nome até você subir uma foto
- **Carregar Foto** - Clique para enviar (PNG, JPG ou JPEG, máximo 5MB)

### Informações Pessoais

| Campo | Editável? | Descrição |
|-------|:---:|-----------|
| **Nome** | Sim | Clique "Editar" ao lado do campo |
| **Email** | **Não** | Email é imutável após o cadastro (segurança) |
| **Cargo** | Não | Somente leitura (apenas super admin pode alterar cargos) |

!!! warning "Email não pode ser alterado"
    Por segurança, o email do usuário é **imutável** após o convite ser aceito. Se precisar mudar o email, o super admin precisa desativar o usuário e enviar um novo convite.

---

## 2. Segurança

![Aba Segurança](images/settings-security.png)

Permite alterar sua senha.

### Como alterar a senha

1. Clique em **"Alterar Senha"**
2. Preencha os 3 campos:
   - **Senha atual**
   - **Nova senha** (mínimo **6 caracteres**)
   - **Confirmar nova senha**
3. Clique em **"Alterar Senha"**

!!! note "Requisitos da senha"
    - **Mínimo:** 6 caracteres
    - **Sem complexidade obrigatória** (maiúscula, número, símbolo não são exigidos)
    - **Reutilização:** não há bloqueio para usar senha antiga
    - Recomenda-se fortemente usar senha forte mesmo que o sistema não exija

!!! tip "Mostrar/ocultar senha"
    Use o ícone de olho ao lado dos campos para mostrar/ocultar a senha enquanto digita.

---

## 3. Notificações

![Aba Notificações](images/settings-notifications.png)

Configure como você recebe alertas do sistema.

### Permissão do Navegador

Clique em **"Ativar"** para receber notificações push do navegador (mesmo com a aba do SGI em segundo plano).

!!! warning "Push depende do navegador"
    Notificações push requerem **permissão do navegador**. Se você negar, push não funciona até reativar manualmente nas configurações do browser (ícone de cadeado ao lado da URL).

### Canais disponíveis

| Canal | O que é | Status |
|-------|---------|--------|
| **App (In-App)** | Sino no canto superior direito | ✅ Ativo |
| **Email** | Enviado ao seu email cadastrado | ✅ Ativo |
| **Push** | Pop-up do navegador | ✅ Ativo (requer permissão) |
| **WhatsApp** | Mensagem no WhatsApp | 🚧 Em desenvolvimento |

### Categorias e tipos de notificação

| Categoria | Tipos |
|-----------|-------|
| **Projetos** | Atribuição, desatribuição, mudança de status |
| **Orçamento** | Alerta de limite, orçamento ultrapassado |
| **Agendamentos** | Criado, atualizado, cancelado, lembrete |
| **Estoque** | Alerta de estoque baixo |
| **Escopo** | Escopo pronto para revisão |

Para cada tipo, você pode ativar/desativar **cada canal individualmente**.

### Botão "Restaurar padrões"

Reseta todas as preferências para o padrão original.

!!! danger "Emergência ignora preferências"
    Notificações de **emergência** são sempre enviadas em **todos os canais disponíveis**, independente das suas configurações. Não há como desabilitar alertas de emergência.

---

## 4. Aparência

![Aba Aparência](images/settings-appearance.png)

- **Modo Escuro** - Toggle para ligar/desligar (padrão: **ligado**)

!!! tip "Atalho global"
    Você também pode alternar tema clicando no ícone sol/lua no **cabeçalho** (canto superior direito), acessível de qualquer página.

O tema é salvo **por usuário** (cada pessoa tem sua preferência).

---

## 5. Idioma e Região

![Aba Idioma](images/settings-language.png)

### Idioma

Clique em um dos botões para trocar imediatamente:

- **Português (Brasil)** - Interface em português
- **English (US)** - Interface em inglês

!!! tip "Idioma é per-usuário"
    Cada pessoa escolhe seu idioma. Definido no primeiro acesso via convite, pode mudar aqui a qualquer momento.

### Fuso Horário

Padrão atual: **`America/New_York`**. Este campo é **somente leitura** pois é configuração **por organização**.

!!! note "Timezone per-organização"
    O fuso horário é definido para a organização inteira (não por usuário). Apenas super administradores podem alterar nas configurações de organização.

    Se sua empresa opera em outro fuso (ex: `America/Sao_Paulo`), peça ao super admin para alterar.

---

## 6. Integrações (apenas Super Admin)

![Aba Integrações](images/settings-integrations.png)

Conecta a conta Google à organização para habilitar recursos opcionais.

!!! warning "Apenas Super Admin pode conectar"
    A integração é feita pelo **super administrador** em nome da organização. Uma vez conectada, todos os funcionários têm suas visitas sincronizadas (se tiverem calendário criado).

### O que a integração habilita

| Recurso | O que faz |
|---------|----------|
| **Google Calendar** | Sincroniza agendamentos do SGI com Google Calendar. Cria calendários individuais por funcionário (ex: "SGI - João Silva"). Suporta two-way sync. |
| **Google Drive** | Backup automático de projetos no Drive da organização. Cria pasta por projeto. |

### Status da integração

| Status | Significado |
|--------|-------------|
| **"Não conectado"** | Conta Google não vinculada |
| **"Conectado"** | Conta Google ativa e sincronizando |

### Conectar

1. Clique em **"Conectar Google"**
2. Escolha a conta Google da organização
3. Autorize as permissões solicitadas
4. Status muda para **"Conectado"**

### Desconectar

1. Clique em **"Desconectar"**
2. Confirme na janela
3. Sincronização para imediatamente (dados já sincronizados ficam mantidos)

!!! note "Integração é opcional"
    O SGI funciona perfeitamente sem Google. A integração é apenas para **conveniência adicional** (calendário externo + backup).

---

## Regras Importantes

### Limites de campos

| Campo | Min | Max | Observação |
|-------|:---:|:---:|---|
| Nome (display name) | 3 | - | - |
| Senha | 6 | - | Sem complexidade obrigatória |
| Foto de perfil | - | 5 MB | PNG, JPG, JPEG |

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Editar próprio perfil | Sim | Sim | Sim |
| Alterar própria senha | Sim | Sim | Sim |
| Configurar próprias notificações | Sim | Sim | Sim |
| Ver aba Integrações | **Sim** | Não | Não |
| Conectar/desconectar Google | **Sim** | Não | Não |
| Alterar timezone da organização | **Sim** | Não | Não |

### Defaults do sistema

| Configuração | Valor |
|---|---|
| Tema | Escuro (dark mode) |
| Idioma inicial | Definido no convite |
| Timezone | `America/New_York` |
| Auto-save | Sim (toggles salvam imediatamente) |

---

## Resumo rápido

| Você quer... | Vá em... |
|-------------|----------|
| Alterar foto de perfil | Perfil > Carregar Foto |
| Alterar nome | Perfil > Editar |
| Alterar senha | Segurança > Alterar Senha |
| Configurar notificações | Notificações |
| Trocar tema claro/escuro | Aparência OU ícone sol/lua no cabeçalho |
| Trocar idioma | Idioma |
| Conectar Google Drive/Calendar | Integrações (super admin) |
