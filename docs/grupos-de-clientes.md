# Grupos de Clientes - Guia do Usuário

Os **Grupos de Clientes** são uma forma de organizar projetos por cliente recorrente, holding, grupo empresarial ou qualquer categoria que faça sentido para o seu negócio.

---

## 1. O que é um Grupo de Clientes

Um **Client Group** é uma "etiqueta" que agrupa projetos relacionados. Útil quando:

- Você tem **um cliente grande** com múltiplos projetos (ex: Rede de Farmácias com 50 lojas para reformar)
- Você trabalha com **holdings** que têm várias empresas
- Quer separar **imobiliárias** ou **construtoras parceiras**
- Deseja categorizar por **região** ou **tipo de projeto**

Cada projeto pode pertencer a **1 grupo** (ou a nenhum - o campo é opcional).

---

## 2. Acessando

No menu lateral, clique em **"Client Groups"** (Grupos de Clientes). Disponível para **administradores**.

<!-- TODO: screenshot da lista de grupos. Arquivo: images/client-groups-list.png. Capturar: lista de cards de grupos com descricao + botao Novo Grupo -->
![Lista de Grupos de Clientes](images/client-groups-list.png){ .placeholder-image }

---

## 3. Estrutura de um grupo

Um grupo tem campos simples:

| Campo | Obrigatório | Descrição |
|-------|:---:|-----------|
| **groupName** | Sim | Nome do grupo (ex: "Rede ABC", "Holding XYZ") |
| **description** | Não | Descrição opcional (ex: "Todas as lojas da Rede ABC no estado de SP") |

---

## 4. Criando um grupo

Clique em **"+ Novo Grupo"** ou similar.

<!-- TODO: screenshot do clientGroupDialog. Arquivo: images/client-groups-dialog.png. Capturar: dialog com campos nome e descricao -->
![Dialog de criar/editar grupo](images/client-groups-dialog.png){ .placeholder-image }

### Exemplo

1. Clique em **"+ Novo Grupo"**
2. Em **Nome**, digite: `Imobiliária Prime`
3. Em **Descrição** (opcional): `Projetos de reforma de apartamentos da carteira Prime`
4. Clique em **"Criar"**

Pronto! O grupo aparece na lista e já pode ser associado a projetos.

---

## 5. Editando um grupo

Clique no ícone de **editar** (lápis) no card do grupo.

Você pode alterar:

- Nome do grupo
- Descrição

Clique em **"Salvar"**.

---

## 6. Deletando um grupo

Clique no ícone de **lixeira** no card.

!!! warning "Atenção: impacto em projetos"
    Projetos que estavam associados ao grupo **não são deletados**, mas ficam com o campo `clientGroupId` apontando para um grupo que não existe mais. Isso pode causar:

    - Projetos aparecem "sem grupo" nos filtros
    - Filtros por grupo não encontram os projetos antigos

    **Recomendação:** antes de deletar um grupo, desassocie os projetos (edite-os e retire o grupo) ou transfira para outro grupo.

---

## 7. Preços customizados por grupo (VIP pricing)

Cada grupo pode ter uma tabela de **preços customizados** por serviço — ideal para clientes VIP que negociaram valores especiais.

### Como configurar

1. Abra o dialog de edição do grupo (ícone lápis)
2. Clique na aba **"Preços customizados"**
3. A lista exibe todos os serviços ativos do catálogo, agrupados por categoria
4. Para cada serviço, defina o preço sobrescrito (deixe em branco para usar o padrão do catálogo)
5. Salve

### Como funciona na prática

- Os preços customizados ficam em `servicePriceOverrides` no documento do grupo
- Quando um projeto vinculado ao grupo tem uma Work Order, o sistema sugere automaticamente a fonte **`group_override`** nos items de WO
- Admin pode aceitar o preço do grupo ou escolher outra fonte (default, pdf, manual)
- Se o serviço não estiver no map de overrides → usa `defaultUnitPrice` do catálogo

!!! tip "Grupo VIP na Work Order"
    Para projetos vinculados a um grupo com preços customizados, ao adicionar um item na Work Order o sistema já sugere automaticamente o preço `group_override`. O admin só precisa confirmar.

---

## 8. Usando grupos em projetos

### Na criação do projeto

Ao **criar um projeto**, o formulário tem um campo dropdown **"Grupo do Cliente"**:

- **"Sem grupo"** (padrão) - projeto fica avulso
- Ou selecione um grupo existente

### Na edição do projeto

Você pode mudar o grupo de um projeto a qualquer momento:

1. Abra o projeto
2. Clique em **"Editar"**
3. Altere o dropdown **"Grupo do Cliente"**
4. Salve

### Nos filtros da lista de projetos

Na tela **Projetos**, clique em **"Filtros"** e escolha **"Grupo do Cliente"**:

- **Todos os Grupos** (padrão) - mostra tudo
- **Sem Grupo** - apenas projetos avulsos
- Grupos específicos - filtra pelos selecionados

📖 Veja o [Guia de Projetos](projetos.md) para mais sobre filtros.

---

## 9. Quando usar grupos

### Use grupos quando

- Tem **múltiplos projetos** do mesmo cliente (cliente recorrente)
- Precisa **reportar consolidado** por cliente (ex: "quanto gastamos com Cliente X este ano?")
- Quer **facilitar atribuição** de funcionários específicos a uma carteira
- Trabalha com **parceiros recorrentes** (imobiliárias, construtoras)
- Tem clientes que negociaram **tabela de preços diferenciada** (VIP pricing)

### Não precisa grupo para

- Projeto único de cliente **one-shot** (pessoa física sem continuidade)
- Organização que já faz sentido por **status** ou **data**

!!! tip "Grupos vs Clientes"
    O SGI **não tem cadastro de cliente** como entidade separada - o nome do cliente fica no campo `clientName` do próprio projeto. **Grupos** servem quando você quer agrupar *múltiplos* projetos sob uma organização maior.

---

## Regras Importantes

### Campos obrigatórios e limites

| Campo | Obrigatório | Limite |
|-------|:---:|:---:|
| `groupName` | Sim | - |
| `description` | Não | - |

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Ver menu "Client Groups" | Sim | Sim | **Não** |
| Criar grupo | Sim | Sim | Não |
| Editar grupo | Sim | Sim | Não |
| Configurar preços customizados | Sim | Sim | Não |
| Deletar grupo | Sim | Sim | Não |
| Associar projeto a grupo | Sim | Sim | Não (funcionário não edita projeto) |

### Validações e comportamentos

!!! warning "Deletar grupo deixa referências órfãs"
    Projetos que tinham o grupo deletado ficam com `clientGroupId` apontando para um grupo inexistente. Não bloqueia nada, mas filtros por grupo podem não encontrar esses projetos.

!!! note "Um projeto, um grupo"
    Cada projeto pertence a **no máximo 1 grupo** (campo `clientGroupId` é string única, não array). Se precisar de múltipla categorização, use tags/skills em vez.

### Defaults

| Configuração | Valor |
|---|---|
| `clientGroupId` ao criar projeto | `null` (sem grupo) |
| Soft delete | Não - deletar é permanente |
| Ordem na lista | Por nome alfabético (padrão) |
| `servicePriceOverrides` | `{}` (vazio — usa preços do catálogo) |

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Ver todos os grupos | Menu "Client Groups" |
| Criar grupo novo | "+ Novo Grupo" > preencher nome e descrição |
| Configurar preços VIP | Editar grupo > aba "Preços customizados" |
| Associar projeto a grupo | Editar projeto > dropdown "Grupo do Cliente" |
| Filtrar projetos por grupo | Projetos > Filtros > "Grupo do Cliente" |
| Deletar grupo | Lixeira no card (desassocie projetos primeiro) |
