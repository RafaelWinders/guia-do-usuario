# Catálogo de Serviços - Guia do Usuário

O **Catálogo de Serviços** é onde o admin gerencia as categorias e serviços que aparecem nas Work Orders. Substituiu as 16 categorias hardcoded antigas — agora o catálogo é dinâmico e totalmente configurável.

---

## 1. O que é o Catálogo de Serviços

O catálogo é a **fonte de verdade** de todos os serviços que sua empresa executa. Ele alimenta:

- **Work Orders** — ao adicionar um item, o funcionário/admin escolhe Categoria → Serviço
- **PDF Import** — o sistema usa as descrições dos serviços para mapear automaticamente items extraídos de PDFs externos
- **Preços** — cada serviço tem um preço padrão (`defaultUnitPrice`) que serve como base

---

## 2. Acessando

No menu lateral, vá em **Configurações** (ou diretamente em `/settings/services`). Disponível para **administradores**.

O catálogo tem **2 abas**:

| Aba | O que contém |
|-----|-------------|
| **Categorias** | Grupos de serviços (ex: PNT - Painting) |
| **Serviços** | Itens individuais dentro de cada categoria |

---

## 3. Categorias

### O que é uma categoria

Uma categoria agrupa serviços relacionados. Exemplos de categorias de fábrica:

| Código | Nome |
|--------|------|
| FRM | Framing |
| PNT | Painting |
| DRY | Drywall |
| TIL | Tile |
| PLM | Plumbing |

### Campos de uma categoria

| Campo | Obrigatório | Descrição |
|-------|:---:|-----------|
| **code** | Sim | Sigla única (ex: `PNT`). Usada nas WOs para identificar a categoria |
| **name** | Sim | Nome legível (ex: "Painting") |
| **description** | Não | Descrição do que a categoria cobre |
| **sortOrder** | Sim | Ordem de exibição nas WOs (execução da obra) |
| **color** | Não | Cor visual para identificação rápida |
| **icon** | Não | Ícone opcional |
| **active** | Sim | Se está ativa (visível nas WOs) |

### Criando uma categoria

1. Aba **"Categorias"** > clique **"+ Nova Categoria"**
2. Preencha código, nome, sort order
3. Salve

### Desativando uma categoria (soft delete)

!!! warning "Desativar, nunca excluir"
    Clique em **"Desativar"** — a categoria some das WOs novas, mas WOs antigas que já tinham items dessa categoria continuam íntegras (snapshot preserva o nome e código).

    Não existe "Excluir" permanente — isso protege o histórico de WOs antigas.

---

## 4. Serviços

### O que é um serviço

Um serviço é um item específico dentro de uma categoria. Exemplos:

- Categoria **PNT**: `Paint trim/casing`, `Paint walls`, `Paint ceiling`
- Categoria **DRY**: `Hang drywall`, `Tape and mud`, `Patch drywall`

### Campos de um serviço

| Campo | Obrigatório | Descrição |
|-------|:---:|-----------|
| **categoryId** | Sim | Qual categoria pertence |
| **name** | Sim | Nome do serviço (ex: "Paint trim/casing") |
| **description** | Não | Descrição rica — **ajuda a IA a classificar automaticamente** nos imports de PDF |
| **defaultAction** | Sim | Ação padrão: `Install`, `Remove` ou `Detach & Reset` |
| **defaultType** | Sim | Tipo padrão: `Labor`, `Material` ou `Equipment` |
| **defaultUnit** | Sim | Unidade padrão: `EA`, `SF`, `LF`, `SY` ou `HR` |
| **defaultUnitPrice** | Sim | Preço unitário padrão (≥ 0) — usado na fonte `default` das WOs |
| **active** | Sim | Se está ativo (visível nas WOs) |
| **sortOrder** | Não | Ordem dentro da categoria |

### Criando um serviço

1. Aba **"Serviços"** > clique **"+ Novo Serviço"**
2. Selecione a **categoria**
3. Preencha nome, descrição, action, type, unit, preço
4. Salve

!!! tip "Invista na descrição"
    Uma boa descrição aumenta muito a precisão do mapeamento automático de PDFs. A IA usa o campo `description` para entender o que o serviço cobre e fazer correspondência com items de WOs externas.

    Exemplo ruim: `Paint trim`
    Exemplo bom: `Paint door frames, window casings, baseboards and trim elements. Includes prep and 2 coats.`

### Desativando um serviço (soft delete)

Clique em **"Desativar"** no card do serviço.

- O serviço some do dropdown "Adicionar item" nas WOs novas
- Items já existentes em WOs antigas ficam preservados (snapshot congela nome, categoria, action, type, unit)
- Se um item de Daily Report usava esse serviço via service_checklist, aparece com badge **"Removido do WO"**

---

## 5. Como o catálogo alimenta as Work Orders

### Adicionando item via catálogo

Ao clicar **"+ Adicionar item"** em uma WO:

1. Usuário seleciona **Categoria** (dropdown)
2. Usuário seleciona **Serviço** dentro da categoria
3. Sistema preenche automaticamente:
   - `action` = `defaultAction` do serviço
   - `type` = `defaultType` do serviço
   - `unit` = `defaultUnit` do serviço
   - `unitPrice` = `defaultUnitPrice` do serviço (fonte `default`)
4. Usuário ajusta quantity, room, notes e pode mudar a fonte do preço

### Import de PDF

Quando você importa um PDF de WO externa, a IA usa as **descrições** dos serviços cadastrados para mapear automaticamente cada item extraído do PDF.

Items não reconhecidos aparecem com badge **"Classificar"** — o admin escolhe manualmente o serviço correto.

---

## 6. Seed inicial

O sistema vem com um **seed de fábrica** com 17 categorias e ~46 serviços de exemplo cobrindo:

- Framing, Electrical, Insulation, Drywall, Mud/Taping
- Finish Carpentry, Painting, Floor Covering, Tile
- Plumbing, Details/Hardware, Glass
- Cleaning, Touch Ups, Contents, Demolition
- E mais...

Você pode usar o seed como ponto de partida e personalizar conforme os serviços que sua empresa oferece.

---

## Regras Importantes

### Permissões necessárias

| Operação | Super Admin | Admin | Funcionário |
|----------|:---:|:---:|:---:|
| Ver catálogo | Sim | Sim | **Não** (apenas read via WO) |
| Criar categoria | Sim | Sim | Não |
| Editar categoria | Sim | Sim | Não |
| Desativar categoria | Sim | Sim | Não |
| Criar serviço | Sim | Sim | Não |
| Editar serviço | Sim | Sim | Não |
| Desativar serviço | Sim | Sim | Não |

### Validações e comportamentos

!!! warning "Código de categoria é único"
    O campo `code` (ex: `PNT`) deve ser único em todo o catálogo. O sistema bloqueia duplicatas.

!!! note "Soft delete protege o histórico"
    Desativar categoria/serviço **nunca afeta WOs existentes**. O snapshot de cada item de WO congela os dados no momento da criação.

!!! tip "Preço zero é válido"
    `defaultUnitPrice` pode ser `0` (ex: serviços inclusos em pacote). Mas o valor é obrigatório — não pode ser deixado em branco.

### Defaults

| Configuração | Valor |
|---|---|
| `active` ao criar | `true` |
| `defaultUnitPrice` mínimo | 0 |
| Seed inicial | 17 categorias + ~46 serviços |

---

## Resumo rápido

| Você quer... | Faça isso... |
|-------------|-------------|
| Ver categorias | Configurações > Catálogo de Serviços > aba Categorias |
| Ver serviços | Configurações > Catálogo de Serviços > aba Serviços |
| Criar categoria | + Nova Categoria > código, nome, sort order |
| Criar serviço | + Novo Serviço > categoria, nome, descrição, defaults de preço |
| Desativar categoria/serviço | Botão "Desativar" no card |
| Reativar | Botão "Ativar" no card |
