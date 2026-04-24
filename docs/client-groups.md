# Client Groups - User Guide

**Client Groups** are a way to organize projects by recurring customer, holding, business group, or any category that makes sense for your business.

---

## 1. What is a Client Group

A **Client Group** is a "label" that groups related projects. Useful when:

- You have **one large customer** with multiple projects (e.g., Pharmacy Chain with 50 stores to renovate)
- You work with **holdings** that have several companies
- You want to separate **real estate companies** or **partner construction firms**
- You want to categorize by **region** or **project type**

Each project can belong to **1 group** (or none - the field is optional).

---

## 2. Accessing

In the side menu, click **"Client Groups"**. Available to **administrators**.

<!-- TODO: screenshot of groups list. File: images/client-groups-list.png. Capture: list of group cards with description + New Group button -->
![Client Groups list](images/client-groups-list.png){ .placeholder-image }

---

## 3. Group structure

A group has simple fields:

| Field | Required | Description |
|-------|:---:|-----------|
| **groupName** | Yes | Group name (e.g., "ABC Chain", "XYZ Holding") |
| **description** | No | Optional description (e.g., "All ABC Chain stores in the state of SP") |

---

## 4. Creating a group

Click **"+ Novo Grupo"** (+ New Group) or similar.

<!-- TODO: screenshot of clientGroupDialog. File: images/client-groups-dialog.png. Capture: dialog with name and description fields -->
![Create/edit group dialog](images/client-groups-dialog.png){ .placeholder-image }

### Example

1. Click **"+ Novo Grupo"** (+ New Group)
2. In **Nome** (Name), type: `Prime Real Estate`
3. In **Descrição** (Description) (optional): `Apartment renovation projects from the Prime portfolio`
4. Click **"Criar"** (Create)

Done! The group appears in the list and can now be associated with projects.

---

## 5. Editing a group

Click the **edit** icon (pencil) on the group card.

You can change:

- Group name
- Description

Click **"Salvar"** (Save).

---

## 6. Deleting a group

Click the **trash** icon on the card.

!!! warning "Attention: impact on projects"
    Projects that were associated with the group **are not deleted**, but end up with the `clientGroupId` field pointing to a group that no longer exists. This may cause:

    - Projects appear "without group" in filters
    - Filters by group do not find the old projects

    **Recommendation:** before deleting a group, disassociate the projects (edit them and remove the group) or transfer them to another group.

---

## 7. Using groups in projects

### When creating the project

When **creating a project**, the form has a **"Grupo do Cliente"** (Client Group) dropdown field:

- **"Sem grupo"** (No group) (default) - project is standalone
- Or select an existing group

### When editing the project

You can change a project's group at any time:

1. Open the project
2. Click **"Editar"** (Edit)
3. Change the **"Grupo do Cliente"** (Client Group) dropdown
4. Save

### In the project list filters

On the **Projetos** (Projects) screen, click **"Filtros"** (Filters) and choose **"Grupo do Cliente"** (Client Group):

- **Todos os Grupos** (All Groups) (default) - shows everything
- **Sem Grupo** (No Group) - only standalone projects
- Specific groups - filters by selected

See the [Projects Guide](projects.md) for more about filters.

---

## 8. When to use groups

### Use groups when

- You have **multiple projects** from the same customer (recurring customer)
- You need to **report consolidated** by customer (e.g., "how much did we spend on Customer X this year?")
- You want to **facilitate the assignment** of specific employees to a portfolio
- You work with **recurring partners** (real estate companies, construction firms)

### No need for groups when

- One-off project from a **one-shot** customer (individual without continuity)
- Organization that already makes sense by **status** or **date**

!!! tip "Groups vs Customers"
    SGI **does not have customer registration** as a separate entity - the customer name is in the `clientName` field of the project itself. **Groups** are useful when you want to group *multiple* projects under a larger organization.

---

## Important Rules

### Required fields and limits

| Field | Required | Limit |
|-------|:---:|:---:|
| `groupName` | Yes | - |
| `description` | No | - |

### Required permissions

| Operation | Super Admin | Admin | Employee |
|----------|:---:|:---:|:---:|
| View "Client Groups" menu | Yes | Yes | **No** |
| Create group | Yes | Yes | No |
| Edit group | Yes | Yes | No |
| Delete group | Yes | Yes | No |
| Associate project with group | Yes | Yes | No (employee does not edit project) |

### Validations and behaviors

!!! warning "Deleting group leaves orphan references"
    Projects that had the deleted group end up with `clientGroupId` pointing to a non-existent group. Does not block anything, but filters by group may not find these projects.

!!! note "One project, one group"
    Each project belongs to **at most 1 group** (`clientGroupId` field is a unique string, not an array). If you need multiple categorization, use tags/skills instead.

### Defaults

| Setting | Value |
|---|---|
| `clientGroupId` when creating project | `null` (no group) |
| Soft delete | No - deleting is permanent |
| List order | By alphabetical name (default) |

---

## Quick summary

| You want to... | Do this... |
|-------------|-------------|
| View all groups | "Client Groups" menu |
| Create new group | "+ Novo Grupo" (+ New Group) > fill in name and description |
| Associate project with group | Edit project > "Grupo do Cliente" (Client Group) dropdown |
| Filter projects by group | Projects > Filters > "Grupo do Cliente" (Client Group) |
| Delete group | Trash on card (disassociate projects first) |
