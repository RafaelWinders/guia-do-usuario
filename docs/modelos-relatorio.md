# Modelos de Relatório - Guia do Usuário

Os **Modelos de Relatório** permitem criar formulários personalizados para os Relatórios Diários. Cada projeto pode ter um modelo diferente, adaptado ao tipo de trabalho que a equipe realiza.

---

## 1. O que é um Modelo de Relatório

Um modelo define **quais campos aparecem no formulário** quando um funcionário cria ou edita um Relatório Diário para um projeto.

Sem modelo → o relatório tem apenas **notas gerais** e **fotos gerais**.
Com modelo → o relatório exibe os campos do modelo + notas e fotos gerais (sempre presentes).

---

## 2. Acessando

No menu lateral, vá em **Configurações** > **Modelos de Relatório** (`/settings/report-templates`). Disponível para **administradores**.

---

## 3. Interface do builder

O builder tem **3 painéis** lado a lado:

| Painel | O que mostra |
|--------|-------------|
| **Lista de modelos** | Todos os modelos criados + botão "Novo Modelo" |
| **Editor de fields** | Campos do modelo selecionado — adicionar, reordenar, editar, remover |
| **Preview live** | Visualização do formulário em tempo real conforme você edita |

---

## 4. Os 9 tipos de campo

Ao adicionar um campo ao modelo, você escolhe um dos 9 tipos disponíveis:

| Tipo | O que gera no formulário |
|------|--------------------------|
| **text** | Campo de texto curto (uma linha) |
| **textarea** | Área de texto longa (múltiplas linhas) |
| **number** | Campo numérico |
| **date** | Seletor de data |
| **radio** | Seleção única entre opções definidas |
| **checkbox** | Marcação múltipla entre opções definidas |
| **select** | Dropdown de seleção única |
| **service_checklist** | Checklist automático dos items da Work Order do projeto |
| **photo** | Campo de upload de foto(s) |

### Sobre o service_checklist

Este é o campo mais especial: ao incluí-lo no modelo, o formulário do relatório **busca automaticamente os items da Work Order do projeto** e exibe um checklist onde o funcionário marca quais itens foram concluídos no dia.

!!! note "O que acontece se a WO não existir?"
    Se o projeto não tiver Work Order, o campo `service_checklist` aparece vazio — sem erro, apenas sem itens para marcar.

!!! warning "Items removidos da WO"
    Se um item da WO for removido depois que relatórios já foram criados usando esse campo, o item continua aparecendo no histórico dos relatórios antigos com o badge **"Removido do WO"**. Isso preserva a integridade do histórico.

---

## 5. Criando um modelo

1. Vá em **Configurações** > **Modelos de Relatório**
2. Clique em **"+ Novo Modelo"**
3. Dê um nome ao modelo (ex: "Reforma de Apartamento", "Limpeza Pós-Obra")
4. No painel de fields, clique **"+ Adicionar campo"** e escolha o tipo
5. Para cada campo, configure:
   - **Rótulo** (o que aparece no formulário)
   - **Obrigatório** (sim/não)
   - **Opções** (apenas para radio, checkbox e select)
6. Reordene os campos arrastando
7. Acompanhe no **preview** como ficará o formulário
8. Salve

---

## 6. Vinculando o modelo a um projeto

Para que o modelo apareça nos relatórios de um projeto específico:

1. Abra o projeto
2. Clique em **"Editar"**
3. No campo **"Modelo de Relatório"**, selecione o modelo desejado (ou "Nenhum")
4. Salve

!!! note "Um projeto, um modelo"
    Cada projeto pode ter **no máximo 1 modelo** vinculado. Se quiser usar campos diferentes por tipo de projeto, crie modelos separados.

---

## 7. Editando um modelo já em uso

Você pode editar um modelo mesmo depois que relatórios foram criados com ele.

!!! warning "Edições não retroativas"
    Quando você edita o modelo (adiciona, remove ou muda campos), os relatórios **antigos não são afetados**. Eles continuam com os campos e respostas que tinham no momento da criação.

    Relatórios **novos** já usarão o modelo atualizado.

    Isso significa que campos obrigatórios removidos do modelo não invalidam relatórios antigos que não os tinham. E campos novos adicionados não aparecem em relatórios antigos.

---

## 8. Desativando um modelo (soft delete)

Clique em **"Desativar"** no card do modelo.

- O modelo desaparece do dropdown "Modelo de Relatório" nos projetos
- Projetos que já tinham o modelo vinculado **continuam usando** — o modelo desativado ainda aparece nos relatórios já criados
- Para remover o vínculo de um projeto, edite o projeto e selecione "Nenhum"

---

## 9. Boas práticas

### Nomeie modelos pelo tipo de obra

- "Reforma Residencial Completa"
- "Limpeza Pós-Obra"
- "Instalação de Piso"
- "Inspeção de Danos"

### Use service_checklist para acompanhar WO

Se o projeto tem uma Work Order aprovada, inclua o campo `service_checklist` no modelo. Isso permite que o funcionário marque exatamente quais itens da WO foram concluídos no dia — criando um rastreamento preciso do progresso.

### Evite modelos genéricos demais

Um modelo com apenas "Notas" e "Fotos" não agrega muito (isso já existe no relatório básico). Adicione campos específicos para o tipo de trabalho que tornam o relatório mais útil.

---

## Regras Importantes

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Ver lista de modelos | Sim | Sim | **Não** |
| Criar modelo | Sim | Sim | Não |
| Editar modelo | Sim | Sim | Não |
| Desativar modelo | Sim | Sim | Não |
| Vincular modelo a projeto | Sim | Sim | Não (funcionário não edita projeto) |
| Usar modelo (preencher relatório) | Sim | Sim | Sim |

### Validações e comportamentos

!!! note "Validação only na criação/edição do relatório"
    Campos marcados como `required` no modelo são validados quando o funcionário **cria ou edita** o relatório. Se o template for editado depois (campo `required` adicionado), relatórios antigos **não são invalidados**.

!!! warning "Modelos não podem ser excluídos permanentemente"
    Apenas soft delete (desativar). Isso preserva o histórico de quais campos existiam quando relatórios antigos foram criados.

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Ver modelos | Configurações > Modelos de Relatório |
| Criar modelo | + Novo Modelo > adicionar campos > salvar |
| Editar modelo | Clicar no modelo > editar fields |
| Vincular a projeto | Editar projeto > dropdown "Modelo de Relatório" |
| Desativar modelo | "Desativar" no card |
| Ver preview | Painel de preview ao lado do editor de fields |
